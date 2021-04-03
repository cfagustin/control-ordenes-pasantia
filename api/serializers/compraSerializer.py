# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Compra
# Importar los serializer 
from api.serializers import ProductoSerializer, ProductoRegistroSerializer, VendedorSerializer, VendedorRegistroSerializer



""" SERIALIZER Compra """
""" Enviar mis datos del backend al frontend """
class CompraSerializer(serializers.ModelSerializer):

    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Compra
        # Especificar los atributos que se desea serializar 
        fields =('__all__')
        depth = 2



""" SERIALIZER Compra """
""" Para verificar la informacion que me envia el frontend """
class CompraRegistroSerializer(serializers.ModelSerializer):
    
    #producto = ProductoRegistroSerializer()
    #vendedor = VendedorRegistroSerializer()
    
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Compra
        # Especificar los atributos que se desea serializar 
        fields =(
            'cantidad', 
            'producto',
            'vendedor',
        )
    