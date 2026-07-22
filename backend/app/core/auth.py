import jwt
from typing import Dict, Any, Optional
import httpx
from cryptography.hazmat.primitives.asymmetric.rsa import RSAPublicNumbers
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
import base64

from app.core.config import get_settings


class ClerkAuth:
    """
    Handles JWT verification utilizing Clerk's JWKS endpoint.
    """

    def __init__(self) -> None:
        self.settings = get_settings()
        self.jwks_url = f"{self.settings.CLERK_FRONTEND_API}/.well-known/jwks.json"
        self._jwks: Optional[Dict[str, Any]] = None

    async def get_jwks(self) -> Dict[str, Any]:
        """Fetch JWKS from Clerk."""
        if not self._jwks:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.jwks_url)
                response.raise_for_status()
                self._jwks = response.json()
        return self._jwks

    def get_public_key(self, jwks: Dict[str, Any], kid: str) -> Optional[str]:
        """Convert a JWK to a PEM public key string."""
        for key in jwks.get("keys", []):
            if key["kid"] == kid:
                n = int.from_bytes(base64.urlsafe_b64decode(key["n"] + "=="), "big")
                e = int.from_bytes(base64.urlsafe_b64decode(key["e"] + "=="), "big")
                public_key = RSAPublicNumbers(e, n).public_key(default_backend())
                pem = public_key.public_bytes(
                    encoding=serialization.Encoding.PEM,
                    format=serialization.PublicFormat.SubjectPublicKeyInfo,
                )
                return pem.decode("utf-8")
        return None

    async def verify_token(self, token: str) -> Dict[str, Any]:
        """Verify the Clerk JWT and return claims."""
        # Decode header to get kid
        try:
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get("kid")
        except jwt.PyJWTError:
            raise ValueError("Invalid token header")

        if not kid:
            raise ValueError("Token is missing kid")

        jwks = await self.get_jwks()
        public_key = self.get_public_key(jwks, kid)

        if not public_key:
            raise ValueError("Public key not found for token")

        try:
            claims = jwt.decode(
                token,
                public_key,
                algorithms=["RS256"],
                # Clerk doesn't explicitly enforce an audience on frontend-issued short lived JWTs sometimes, or it matches frontend api
                options={"verify_aud": False},
            )
            return dict(claims)
        except jwt.ExpiredSignatureError:
            raise ValueError("Token has expired")
        except jwt.PyJWTError as e:
            raise ValueError(f"Token validation failed: {str(e)}")


clerk_auth = ClerkAuth()
