# Importar el paquete models
from django.db import models
# Importar el modelo Nivel
from .nivel import Nivel



""" MODELO Grado """
class Grado(models.Model):
    # Atributos del modelo
    nombre_grado =  models.CharField(max_length=45)

    #  Relacion uno a muchos
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name='grado_nivel')

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.nombre_grado


    def delete(self, *args):
        self.activo = False
        self.save()
        return True