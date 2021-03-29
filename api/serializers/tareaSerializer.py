# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo Tarea
from api.models import Tarea
# Importar el serializer ProfileSerializer
from api.serializers import AsignacionSerializer, AsignacionRegistroSerializer




""" SERIALIZER Tarea """
class TareaSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    asignacion = AsignacionSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Tarea
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Tarea """
class TareaRegistroSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    #asginacion = AsignacionRegistroSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Tarea
        # Especificar los atributos que se desea serializar 
        fields =(
           'titulo_tarea',
           'descripcion',
           'documento_adjuntar',
           'fecha_entrega',
           'hora_entrega',
           'nota',
           'asignacion',
        )
