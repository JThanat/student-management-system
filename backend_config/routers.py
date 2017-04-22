from rest_framework import routers

from backend_apps.faculties import views as faculty_view


router = routers.DefaultRouter()
router.register(r'faculty', faculty_view.FacultyViewSet)