from rest_framework import filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# from backend_apps.faculties.permissions import FacultyAccess
from backend_apps.faculties.models import Faculty
from backend_apps.faculties.serializers import FacultySerializer


class FacultyViewSet(viewsets.ModelViewSet):
    """
        `/api/faculty`: return faculty list ordered fid\n
        `/api/faculty/<pk>`: return Faculty detail of the given primary key\n
        `/api/faculty/?page=[page_no]`: return Faculty list of the given page_no\n
        `/api/faculty/?search=[search_string]`: search by **```fid/name```** and return faculty list which
                                                match search_string\n
        ### *Fields*\n
        **Require**: ALL\n
        **Unique**: name\n
    """

    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer
    # permission_classes = (IsAuthenticated, FacultyAccess)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('fid', 'name',)
