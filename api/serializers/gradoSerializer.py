# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Grado
# Importar los serializers
from api.serializers import NivelSerializer, NivelRegistroSerializer



""" SERIALIZER Grado """
""" Enviar mis datos del backend al frontend """
class GradoSerializer(serializers.ModelSerializer):
    nivel =  NivelSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Grado
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Grado """
""" Para verificar la informacion que me envia el frontend """
class GradoRegistroSerializer(serializers.ModelSerializer):
    nivel = NivelRegistroSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Grado
        # Especificar los atributos que se desea serializar 
        fields =(
            'nombre_grado',
            'nivel',
        )