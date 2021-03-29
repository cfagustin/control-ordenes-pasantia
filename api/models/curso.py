# Importar el paquete models
from django.db import models




""" MODELO Curso """
class Curso(models.Model):
    # Atributos del modelo
    nombre_curso = models.CharField(max_length=45)
  
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.nombre_curso


    def delete(self, *args):
        self.activo = False
        self.save()
        return True