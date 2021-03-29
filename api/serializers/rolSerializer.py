# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Rol



""" SERIALIZER Rol """
""" Enviar mis datos del backend al frontend """
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Rol
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Rol """
""" Para verificar la informacion que me envia el frontend """
class RolRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Rol
        # Especificar los atributos que se desea serializar 
        fields = (
            'nombre_rol',
        )