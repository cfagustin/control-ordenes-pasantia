# Importar el paquete models
from django.db import models




""" MODELO Ciclo """
class Ciclo(models.Model):
    # Atributos del modelo
    ciclo_escolar = models.PositiveIntegerField()

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return str(self.ciclo_escolar)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True
