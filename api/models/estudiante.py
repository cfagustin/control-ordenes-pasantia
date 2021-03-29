
# Importar el paquete models
from django.db import models
# Importar el modelo Profile
from .profile import Profile



""" MODELO Estudiante """
class Estudiante(models.Model):
    #Atributos del modelo
    carnet = models.CharField(max_length=25)
    contacto = models.CharField(max_length=45, null=True, blank=True)
    telefono_contacto = models.CharField(max_length=45, null=True, blank=True)
    direccion_contacto = models.CharField(max_length=255, null=True, blank=True)

    # Relacion uno a uno (modelo Profile)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='estudiante_profile')


    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    # 
    def __unicode__(self):
        return self.carnet


    def delete(self, *args):
        self.activo = False
        self.save()
        return True