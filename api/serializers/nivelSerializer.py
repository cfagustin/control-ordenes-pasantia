# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo Nivel
from api.models import Nivel


""" SERIALIZER Nivel """
""" Enviar mis datos del backend al frontend (tipo JSON) """
class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Nivel
        # Especificar los atributos que se desea serializar 
        fields =('__all__')




""" SERIALIZER Nivel """
""" Para verificar la informacion que me envia el frontend """
class NivelRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el modelo con el que se va a trabajar
        model = Nivel
        # Especificar los atributos que se desea serializar 
        fields =(
            'nombre_nivel',
        )
