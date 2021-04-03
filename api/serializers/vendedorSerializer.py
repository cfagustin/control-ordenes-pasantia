# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Vendedor
# Importar los serializers
from api.serializers import ProfileSerializer, ProfileRegistroSerializer



""" SERIALIZER Vendedor """
""" Enviar mis datos del backend al frontend """
class VendedorSerializer(serializers.ModelSerializer):
    profile =  ProfileSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Vendedor
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Vendedor """
""" Para verificar la informacion que me envia el frontend """
class VendedorRegistroSerializer(serializers.ModelSerializer):
    profile = ProfileRegistroSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Vendedor
        # Especificar los atributos que se desea serializar 
        fields = (
            'profile',
        )