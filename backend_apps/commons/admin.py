from django.contrib import admin

from apps.commons.control import CONTROL_MODEL


class ControlAdmin(admin.ModelAdmin):
    readonly_fields = CONTROL_MODEL

    def pre_create_model(self, request, obj, form, change):
        pass

    def post_create_model(self, request, obj, form, change):
        pass

    def pre_update_model(self, request, obj, form, change):
        pass

    def post_update_model(self, request, obj, form, change):
        pass

    def save_model(self, request, obj, form, change):
        if obj.pk is None:
            self.pre_create_model(request, obj, form, change)
            obj.created_user = request.user
            obj.updated_user = request.user
            obj.save()
            self.post_create_model(request, obj, form, change)
        else:
            self.pre_update_model(request, obj, form, change)
            obj.updated_user = request.user
            obj.save()
            self.post_update_model(request, obj, form, change)
