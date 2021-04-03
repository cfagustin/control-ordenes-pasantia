# Importar el paquete models
from django.db import models
# Importar el modelo Profile
from .profile import Profile



""" MODELO Vendedor """
class Vendedor(models.Model):
    # Atributos del modelo
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='vendedor_profile')
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True