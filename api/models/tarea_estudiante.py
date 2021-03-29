# Importar el paquete models
from django.db import models
# Importar el modelo Tarea
from .tarea import Tarea
# Importar el modelo Estudiante
from .estudiante import Estudiante





""" MODELO TareaEstudiante """
class TareaEstudiante(models.Model):
    # Atributos del modelo
    fecha_entrega = models.DateField(auto_now_add=True)
    documento_adjuntar = models.FileField(upload_to='tareaestudiante', null=True, blank=True)
    descripcion = models.TextField()
    calificacion = models.FloatField(default=0)
    
    # Relacion de uno a muchos (modelo Tarea)
    tarea = models.ForeignKey(Tarea, on_delete=models.CASCADE, related_name='tareaestudiante_tarea')

    # Relacion de uno a muchos (modelo Estudiante)
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name='tareaestudiante_estudiante')

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.descripcion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True