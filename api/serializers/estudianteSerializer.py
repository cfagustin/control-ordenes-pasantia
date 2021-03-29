
# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo Estudiante
from api.models import Estudiante
# Importar el serializer ProfileSerializer
from api.serializers import ProfileSerializer, ProfileRegistroSerializer




""" SERIALIZER Estudiante """
class EstudianteSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    profile = ProfileSerializer()

    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Estudiante
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Estudiante """
class EstudianteRegistroSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    profile = ProfileRegistroSerializer()

    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Estudiante
        # Especificar los atributos que se desea serializar 
        fields =(
            'profile',
            'carnet',
            'contacto',
            'telefono_contacto',
            'direccion_contacto',
        )

