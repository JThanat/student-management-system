from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db.models.query import QuerySet
from django.contrib.admin.utils import NestedObjects
from django.db import DEFAULT_DB_ALIAS
from django.db.models import signals

from config.settings import AUTH_USER_MODEL
User = AUTH_USER_MODEL

CONTROL_MODEL = ('alive', 'created_at', 'updated_at', 'created_user', 'updated_user')
CONTROL_TIME = ('alive', 'created_at', 'updated_at')


class SoftDeletionQuerySet(QuerySet):
    def delete(self):
        return super(SoftDeletionQuerySet, self).update(alive=None)

    # soft delete all related objects that also subclass SoftDeletionModel
    def cascade_delete(self, collection=None):
        if not collection:
            collector = NestedObjects(using=DEFAULT_DB_ALIAS)
            collector.collect(self)
            collection = collector.nested()
        try:
            collection.active = False
            collection.save()
        except AttributeError:
            try:
                for x in collection:
                    self.cascade_delete(x)
            except TypeError:
                pass

    def hard_delete(self):
        return super(SoftDeletionQuerySet, self).delete()

    def undelete(self):
        return super(SoftDeletionQuerySet, self).update(active=True)

    def alive(self):
        return self.filter(alive=True)

    def dead(self):
        return self.exclude(alive=True)

    def cascade_undelete(self, collection=None):
        if not collection:
            collector = NestedObjects(using=DEFAULT_DB_ALIAS)
            collector.collect(self)
            collection = collector.nested()
        try:
            collection.undelete()
        except AttributeError:
            try:
                for x in collection:
                    self.cascade_undelete(x)
            except TypeError:
                pass


class SoftDeletionManager(models.Manager):
    use_for_related_fields = True

    def __init__(self, *args, **kwargs):
        self.alive_only = kwargs.pop('alive_only', True)
        super(SoftDeletionManager, self).__init__(*args, **kwargs)

    def get_queryset(self):
        if self.alive_only:
            return SoftDeletionQuerySet(self.model).alive()
        return SoftDeletionQuerySet(self.model)

    def hard_delete(self):
        return self.get_queryset().hard_delete()

    def cascade_delete(self):
        return self.get_queryset().cascade_delete()

    def undelete(self):
        return self.get_queryset().undelete()

    def cascade_undelete(self):
        return self.get_queryset().cascade_undelete()


class SoftDeletionModel(models.Model):
    alive = models.NullBooleanField(default=True)

    objects = SoftDeletionManager()
    all_objects = SoftDeletionManager(alive_only=False)

    class Meta:
        abstract = True

    def delete(self, using=None):
        self.alive = None
        self.save()
        signals.post_delete.send(sender=self.__class__, instance=self)

    def hard_delete(self, using=None):
        super(SoftDeletionModel, self).delete(using=using)

    def undelete(self):
        self.alive = True
        self.save()


class ControlModel(SoftDeletionModel):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))
    created_user = models.ForeignKey(
        User,
        related_name="%(class)s_created_user",
        verbose_name=_('Created by')
    )
    updated_user = models.ForeignKey(
        User,
        related_name="%(class)s_updated_user",
        verbose_name=_('Updated by')
    )

    class Meta:
        abstract = True
