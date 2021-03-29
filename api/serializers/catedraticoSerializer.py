# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo Catedratico
from api.models import Catedratico, Profesion
# Importar el serializer ProfileSerializer
from api.serializers import ProfileSerializer, ProfileRegistroSerializer, ProfesionSerializer, ProfesionRegistroSerializer




""" SERIALIZER Catedratico """
class CatedraticoSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    profile = ProfileSerializer()
    profesion = ProfesionSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Catedratico
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Catedratico """
class CatedraticoRegistroSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    profile = ProfileRegistroSerializer()
    profesion = ProfesionRegistroSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Catedratico
        # Especificar los atributos que se desea serializar 
        fields =(
            'profile',
            'profesion',
        )

