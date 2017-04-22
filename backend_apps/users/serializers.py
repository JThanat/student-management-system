from backend_apps.commons.serializers import CRUDAutomaticFieldSerializer
from backend_apps.faculties.models import Faculty


class FacultySerializer(CRUDAutomaticFieldSerializer):
    class Meta:
        model = Faculty
        exclude = ()