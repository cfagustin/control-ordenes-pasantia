# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo TareaEstudiante
from api.models import TareaEstudiante
# Importar el serializer TareaSerializer
from api.serializers import TareaSerializer
# Importar el serializer EstudianteSerializer
from api.serializers import EstudianteSerializer




""" SERIALIZER TareaEstudiante """
class TareaEstudianteSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    tarea = TareaSerializer()
    estudiante = EstudianteSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = TareaEstudiante
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER TareaEstudiante """
class TareaEstudianteRegistroSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    #tarea = TareaSerializer()
    #estudiante = EstudianteSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = TareaEstudiante
        # Especificar los atributos que se desea serializar 
        fields =(
           'documento_adjuntar',
           'descripcion',
           'tarea',
           'estudiante',
        )
