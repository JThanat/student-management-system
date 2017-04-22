from django.db import models


class Faculty(models.Model):
    fid = models.IntegerField(verbose_name='Faculty ID', primary_key=True)
    name = models.CharField(max_length=50, verbose_name='Faculty Name')

    def __str__(self):
        return '%s - %s' % (self.fid, self.name)
