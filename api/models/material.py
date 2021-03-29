# Importar el paquete models
from django.db import models
# Importar el modelo Asignacion
from .asignacion import Asignacion



""" MODELO Material """
class Material(models.Model):
    # Atributos del modelo
    titulo_material = models.CharField(max_length=45)
    descripcion = models.TextField()
    documento_adjuntar = models.FileField(upload_to='material', null=True, blank=True)
   
    # Relacion de uno a muchos (modelo Asignacion)
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, related_name='material_asignacion')

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.titulo_material


    def delete(self, *args):
        self.activo = False
        self.save()
        return True