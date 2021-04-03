# Importar el paquete models
from django.db import models
from .vendedor import Vendedor


""" MODELO Producto """
class Producto(models.Model):
    # Atributos del modelo
    nombre_producto = models.CharField(max_length=45)
    precio_compra = models.FloatField(default=0.00)
    precio_venta = models.FloatField(default=0.00)

    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE, related_name='producto_vendedor')
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
   
    # 
    def __unicode__(self):
        return self.nombre_producto


    def delete(self, *args):
        self.activo = False
        self.save()
        return True