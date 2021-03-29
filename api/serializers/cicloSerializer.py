# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Ciclo



""" SERIALIZER Ciclo """
""" Enviar mis datos del backend al frontend """
class CicloSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Ciclo
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Ciclo """
""" Para verificar la informacion que me envia el frontend """
class CicloRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Ciclo
        # Especificar los atributos que se desea serializar 
        fields =(
            'ciclo_escolar',
        )