# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo Material
from api.models import Material
# Importar el serializer ProfileSerializer
from api.serializers import AsignacionSerializer, AsignacionRegistroSerializer




""" SERIALIZER Material """
class MaterialSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    asignacion = AsignacionSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Material
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Material """
class MaterialRegistroSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    #asignacion = AsignacionRegistroSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Material
        # Especificar los atributos que se desea serializar 
        fields =(
           'titulo_material',
           'descripcion',
           'documento_adjuntar',
           'asignacion',
        )

