from django.db import models


class FacultyMember(models.Model):
    member_id = models.IntegerField(verbose_name='Member ID', primary_key=True)
    member_name = models.CharField(max_length=50, verbose_name='Department Name')
    department = models.ForeignKey(
      'departments.Department',
      verbose_name='Department',
      on_delete=models.PROTECT
    )

    def __str__(self):
        return '%s - %s' % (self.member_id, self.member_name)


class Advisor(models.Model):
    member = models.ForeignKey(
      'faculty_members.FacultyMember',
      verbose_name='Member',
      on_delete=models.CASCADE,
      primary_key=True
    )

    def __str__(self):
        return '%s - %s' % (self.member.member_id, self.member.member_name)


class Instructor(models.Model):
    member = models.ForeignKey(
      'faculty_members.FacultyMember',
      verbose_name='Member',
      on_delete=models.CASCADE,
      primary_key=True
    )

    def __str__(self):
        return '%s - %s' % (self.member.member_id, self.member.member_name)

