from typing import List, Dict, Any
from app.models.enums import Role, Permission

# Base permissions for specific domains
CANDIDATE_PERMISSIONS = [
    Permission.CANDIDATE_READ,
    Permission.CANDIDATE_CREATE,
    Permission.CANDIDATE_UPDATE,
    Permission.CANDIDATE_DELETE,
]

JOB_PERMISSIONS = [
    Permission.JOB_READ,
    Permission.JOB_CREATE,
    Permission.JOB_UPDATE,
    Permission.JOB_DELETE,
]

APPLICATION_PERMISSIONS = [
    Permission.APPLICATION_READ,
    Permission.APPLICATION_CREATE,
    Permission.APPLICATION_UPDATE,
    Permission.APPLICATION_DELETE,
]

INTERVIEW_PERMISSIONS = [
    Permission.INTERVIEW_READ,
    Permission.INTERVIEW_CREATE,
    Permission.INTERVIEW_UPDATE,
    Permission.INTERVIEW_DELETE,
]

READ_ONLY_PERMISSIONS = [
    Permission.ORGANIZATION_READ,
    Permission.CANDIDATE_READ,
    Permission.JOB_READ,
    Permission.APPLICATION_READ,
    Permission.INTERVIEW_READ,
]

# Role to permissions mapping
ROLE_PERMISSIONS: Dict[Role, List[Permission]] = {
    Role.OWNER: list(Permission),  # All permissions
    Role.ADMIN: [
        p
        for p in list(Permission)
        if p not in (Permission.ORGANIZATION_DELETE, Permission.FUTURE_BILLING_MANAGE)
    ],
    Role.RECRUITER: [
        *READ_ONLY_PERMISSIONS,
        *CANDIDATE_PERMISSIONS,
        *JOB_PERMISSIONS,
        *APPLICATION_PERMISSIONS,
        *INTERVIEW_PERMISSIONS,
        Permission.ORGANIZATION_UPDATE,
        Permission.FUTURE_AI_USE,
    ],
    Role.HIRING_MANAGER: [
        *READ_ONLY_PERMISSIONS,
        Permission.CANDIDATE_READ,
        *JOB_PERMISSIONS,
        *APPLICATION_PERMISSIONS,
        *INTERVIEW_PERMISSIONS,
        Permission.FUTURE_AI_USE,
    ],
    Role.INTERVIEWER: [
        *READ_ONLY_PERMISSIONS,
        Permission.CANDIDATE_READ,
        *INTERVIEW_PERMISSIONS,
    ],
    Role.VIEWER: READ_ONLY_PERMISSIONS,
    Role.MEMBER: READ_ONLY_PERMISSIONS,
}
