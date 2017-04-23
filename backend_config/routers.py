from rest_framework import routers

from backend_apps.faculties import views as faculty_view
from backend_apps.users import views as user_view
from backend_apps.departments import views as department_view


router = routers.DefaultRouter()
router.register(r'faculty', faculty_view.FacultyViewSet)
router.register(r'user', user_view.UserViewSet)
router.register(r'department', department_view.DepartmentViewSet)