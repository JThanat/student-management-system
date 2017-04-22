from django.db import models


class Student(models.Model):
    sid = models.IntegerField(verbose_name='Student ID', primary_key=True)
    student_id = models.CharField(max_length=10, verbose_name='Student ID')
    curid = models.ForeignKey('curricula.Curriculum', verbose_name='Curricula', on_delete=models.SET_NULL)
    memid = models.ForeignKey('faculty_members.Advisor', verbose_name='Advisor', null=True, on_delete=models.DO_NOTHING),
    title = models.CharField(max_length=20, verbose_name='Title')
    firstname = models.CharField(max_length=50, verbose_name='Firstname')
    lastname = models.CharField(max_length=50, verbose_name='Lastname')
    email = models.CharField(max_length=30, verbose_name='Email', blank=True),
    nationality = models.CharField(max_length=30, verbose_name='Nationality', blank=True),
    birthdate = model.DateField(varbose_name='Birthdate'),
    gender = models.CharField(max_length=10, verbose_name='Gender')
    citizen_id = models.CharField(max_length=15, verbose_name='Citizen ID')
    religion = models.CharField(max_length=20, verbose_name='Religion', blank=True),
    mobile = models.CharField(max_length=15, verbose_name='Mobile', blank=True),
    img = models.CharField(max_length=40, verbose_name='Image Url', blank=True),
    addr = models.CharField(max_length=50, verbose_name='Address', blank=True),
    zipcode = models.CharField(max_length=10, verbose_name='Zipcode', blank=True),
    country = models.CharField(max_length=20, verbose_name='Country', blank=True),
    emer_name = models.CharField(max_length=20, verbose_name='[Emergency Contact] Name', blank=True),
    emer_mobile = models.CharField(max_length=15, verbose_name='[Emergency Contact] Mobile', blank=True),
    emer_addr = models.CharField(max_length=50, verbose_name='[Emergency Contact] Address', blank=True),
    emer_zipcode = models.CharField(max_length=10, verbose_name='[Emergency Contact] Zipcode', blank=True),
    emer_country = models.CharField(max_length=20, verbose_name='[Emergency Contact] Country', blank=True),
    highschool_name = models.CharField(max_length=50, verbose_name='Highschool Name', blank=True),
    highschool_grade = models.CharField(max_length=5, verbose_name='Highschool Grade', blank=True),
    gpax = models.FloatField(verbose_name='GPAX', null=True)
    semester_count = models.IntegerField(default=0, verbose_name='Semester Count')
    summer_count = models.IntegerField(default=0, verbose_name='Summer Count')
    STATUS_CHOICES = (
      ('C', 'Current'),
      ('G', 'Graduated'),
      ('D', 'Dropped'),
    )
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, verbose_name='Status')
    behavioral_score = models.IntegerField(verbose_name='Behavioral Score')
);

    def __str__(self):
        return '%s - %s' % (self.fid, self.name)
