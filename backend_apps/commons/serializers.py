from rest_framework import serializers


class AutomaticFieldMixin(object):
    def automatic_fields(self, request, instance, validated_data):
        pass
        # if instance is None:
            # validated_data['created_user'] = request.user
        # validated_data['updated_user'] = request.user


class CRUDSerializer(serializers.ModelSerializer):
    """
        CRUD(Create-Read-Update-Delete)
        CASE Create:
            step:
                - set field with validate data
                - pre-create
                - setup automatic fields
                - save instance
                - post-create
                - return instance
        CASE Update:
            step:
                - pre-update
                - update field with validate data
                - setup automatic fields
                - save instance
                - post-update
                - return instance
        Create and Update are override default function
        Delete and Read aren't override default function
    """

    def automatic_fields(self, request, instance, validated_data):
        pass

    def pre_create(self, validated_data):
        pass

    def post_create(self, instance, validated_data):
        pass

    def pre_update(self, instance, validated_data):
        pass

    def post_update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        # pre-create instance
        self.pre_create(validated_data)
        # Automatic assign data fields
        if self.context.get('request', None):
            self.automatic_fields(self.context['request'], None, validated_data)
        # Save
        instance = super(CRUDSerializer, self).create(validated_data)
        # post-create instance
        self.post_create(instance, validated_data)
        return instance

    def update(self, instance, validated_data):
        # pre-update instance
        self.pre_update(instance, validated_data)
        # Automatic assign data fields
        if self.context.get('request', None):
            self.automatic_fields(self.context['request'], instance, validated_data)
        # Save
        instance = super(CRUDSerializer, self).update(instance, validated_data)
        # post-update instance
        self.post_update(instance, validated_data)
        return instance


class CRUDAutomaticFieldSerializer(AutomaticFieldMixin, CRUDSerializer):
    pass
