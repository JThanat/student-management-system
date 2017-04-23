from django.db import models


class Department(models.Model):
    faculty = models.ForeignKey('faculties.Faculty', verbose_name='Faculty')
    department_name = models.CharField(max_length=50, verbose_name='Department Name')

    class Meta:
        unique_together = (('faculty', 'department_name'),)

    def __str__(self):
        return '%s - %s' % (self.faculty.faculty_name, self.department_name)
