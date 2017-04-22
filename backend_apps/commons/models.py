from django.db import models
from django.utils.translation import ugettext_lazy as _


CONTACT_MODEL_SHOW = ('phone', 'address')


class PersonContactModel(models.Model):
    email = models.EmailField(max_length=255, blank=True, verbose_name=_("Email"))
    phone = models.CharField(max_length=25, blank=True, verbose_name=_("Phone"))

    class Meta:
        abstract = True


class PartnerContactModel(PersonContactModel):
    address = models.CharField(max_length=255, blank=True, verbose_name=_("Address"))

    class Meta:
        abstract = True


class ContactModel(PartnerContactModel):
    mobile = models.CharField(max_length=25, blank=True, verbose_name=_("Mobile"))

    class Meta:
        abstract = True
