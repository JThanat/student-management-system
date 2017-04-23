from django.db import models


class Curriculum(models.Model):
  curriculum_id = models.IntegerField(verbose_name='Curricula ID', primary_key=True)
  department = models.ForeignKey(
    'departments.Department', 
    verbose_name='Department'
  )
  SEMESTER_SYSTEM_TYPE_CHOICES = (
    ('S', 'Semester'),
    ('T', 'Trimester')
  )
  semester_system_type = models.CharField(
    max_length=1,
    choices=SEMESTER_SYSTEM_TYPE_CHOICES,
    verbose_name='Semester System Type'
  )

  def __str__(self):
    return '%s - %s' % (self.curriculum_id, self.faculty.faculty_name)