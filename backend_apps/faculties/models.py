from django.db import models


class Faculty(models.Model):
    faculty_id = models.IntegerField(verbose_name='Faculty ID', primary_key=True)
    faculty_name = models.CharField(max_length=50, verbose_name='Faculty Name')

    def __str__(self):
        return '%s - %s' % (self.faculty_id, self.faculty_name)
