# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo Asignacion
from api.models import Estudiante, Asignacion, AsignacionEstudiante 
# Importar los serializers
from api.serializers import EstudianteSerializer, AsignacionSerializer



""" SERIALIZER AsignacionEstudianteSerializer """
# llamada de los datos del backend al frontend
class AsignacionEstudianteSerializer(serializers.ModelSerializer):
    estudiante = EstudianteSerializer()
    asignacion = AsignacionSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = AsignacionEstudiante
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER AsignacionEstudianteRegistroSerializer """
# Valida los datos que envia el frontend al backend
class AsignacionEstudianteRegistroSerializer(serializers.ModelSerializer):
   
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = AsignacionEstudiante
        # Especificar los atributos que se desea serializar 
        fields =(
           'asignacion',
           'estudiante',
        )

