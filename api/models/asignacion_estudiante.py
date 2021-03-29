# Importar el modulo de models
from django.db import models
# Importar el modelo Asignacion
from .asignacion import Asignacion
# Importar el modelo Estudiante
from .estudiante import Estudiante



""" MODELO AsignacionEstudiante """
class AsignacionEstudiante(models.Model):
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name='asignacionestudiante_asignacion')
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='asignacionestudiante_estudiante')
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.asignacion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True