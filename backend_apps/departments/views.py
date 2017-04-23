from rest_framework import filters
from rest_framework import viewsets

from backend_apps.departments.models import Department
from backend_apps.departments.serializers import DepartmentSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    """
        `/api/department`: return department list ordered fid\n
        `/api/department/<pk>`: return department detail of the given primary key\n
        `/api/department/?page=[page_no]`: return department list of the given page_no\n
        `/api/department/?search=[search_string]`: search by **```faculty/department_name```** and return department 
                                                list which match search_string\n
        ### *Fields*\n
        **Require**: ALL\n
        **Unique together**: faculty, department_name\n
    """

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend)
    search_fields = ('faculty', 'department_name',)
