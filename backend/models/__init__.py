# Import order matters: links first (no dependencies), then skill/project (depend on links),
# then social, then profile (depends on social). This ensures SQLModel sees all tables.
from backend.models.links import ProjectSkillLink
from backend.models.skill import Skill
from backend.models.project import Project
from backend.models.social import Social
from backend.models.profile import Profile
