from backend_apps.commons.serializers import CRUDAutomaticFieldSerializer
from backend_apps.departments.models import Department


class DepartmentSerializer(CRUDAutomaticFieldSerializer):
    class Meta:
        model = Department
        exclude = ()
