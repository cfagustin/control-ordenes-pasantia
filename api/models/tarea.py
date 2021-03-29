# Importar el paquete models
from django.db import models
# Importar el modelo Asignacion
from .asignacion import Asignacion





""" MODELO Tarea """
class Tarea(models.Model):
    # Atributos del modelo
    titulo_tarea = models.CharField(max_length=45)
    descripcion = models.TextField()
    documento_adjuntar = models.FileField(upload_to='tarea', null=True, blank=True)
    fecha_entrega = models.DateField()
    hora_entrega = models.TimeField()
    nota = models.FloatField()
    
    # Relacion de uno a muchos (modelo Asignacion)
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name='tarea_asignacion')

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.titulo_tarea


    def delete(self, *args):
        self.activo = False
        self.save()
        return True