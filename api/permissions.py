# Importar el modulo BasePermissions
from rest_framework.permissions import BasePermission
from api.models.profile import Profile


class IsDirector(BasePermission):
   def has_permission(self, request, view):
      if request.user:
         if request.user.is_superuser:
            return True
         else:
            return False
      else:
         return False

"""
class IsCatedratico(BasePermission):
   def has_permission(self, request, view):
      if request.user:
         if request.user.profile.rol.nombre_rol == 'Catedratico':
            return True
         else:
            return False
      else:
         return False


class IsEstudiante(BasePermission):
   def has_permission(self, request, view):
      if request.user:
         if request.user.profile.rol.nombre_rol == 'Estudiante':
            return True
         else:
            return False
      else:
         return False

"""
 
    

