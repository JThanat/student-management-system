from rest_framework import permissions


class BaseAccessPermission(permissions.BasePermission):
    VIEW_METHODS = ['GET', 'OPTIONS', 'HEAD']
    EDIT_METHODS = ['POST', 'PUT', 'PATCH']

    MASTER_DATA = 1
    DOCUMENT = 2
    FUNCTION = 3

    permission_level = 0
    module_type = 1

    def has_permission(self, request, view):
        if self.module_type == self.MASTER_DATA or self.module_type == self.DOCUMENT:
            if request.method in self.VIEW_METHODS:
                return self.permission_level > 0
            elif request.method in self.EDIT_METHODS:
                return self.permission_level > 1
            elif request.method == 'DELETE':
                return self.permission_level > 2
