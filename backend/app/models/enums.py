from enum import Enum


class Role(str, Enum):
    """
    Placeholder for organizational roles.
    Will be expanded in the RBAC module.
    """

    OWNER = "OWNER"
    ADMIN = "ADMIN"
    MEMBER = "MEMBER"


class Permission(str, Enum):
    """
    Placeholder for granular permissions.
    Will be expanded in the RBAC module.
    """

    MANAGE_USERS = "MANAGE_USERS"
    VIEW_CANDIDATES = "VIEW_CANDIDATES"
