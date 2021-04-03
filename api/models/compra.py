# Importar el paquete models
from django.db import models
from .producto import Producto, Vendedor


""" MODELO Compra """
class Compra(models.Model):
    # Atributos del modelo
    cantidad =  models.IntegerField()
    total = models.FloatField()

    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE, related_name='compra_vendedor')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='compra_producto')
    
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    

    def delete(self, *args):
        self.activo = False
        self.save()
        return True