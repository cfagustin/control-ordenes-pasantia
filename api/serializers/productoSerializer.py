# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Producto
# Importar los serializer 
from api.serializers import VendedorSerializer, VendedorRegistroSerializer



""" SERIALIZER Producto """
""" Enviar mis datos del backend al frontend """
class ProductoSerializer(serializers.ModelSerializer):
    vendedor = VendedorSerializer()
    total_ventas =serializers.FloatField(default=0)
    cantidad_vendida = serializers.FloatField(default=0)
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Producto
        # Especificar los atributos que se desea serializar 
        fields =(
            'id',
            'nombre_producto',
            'precio_venta',
            'precio_compra',
            'vendedor',
            'total_ventas',
            'cantidad_vendida',
        )



""" SERIALIZER Producto """
""" Para verificar la informacion que me envia el frontend """
class ProductoRegistroSerializer(serializers.ModelSerializer):
    #vendedor = VendedorRegistroSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Producto
        # Especificar los atributos que se desea serializar 
        fields =(
            'nombre_producto',
            'precio_compra',
            'precio_venta',
            'vendedor',
        )