# Importar el paquete models
from django.db import models



""" MODELO Profesion """
class Profesion(models.Model):
    # Atributos del modelo
    nombre_profesion = models.CharField(max_length=45, null=True, blank=True)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.nombre_profesion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True
