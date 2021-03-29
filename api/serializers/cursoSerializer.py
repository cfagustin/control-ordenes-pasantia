# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Curso



""" SERIALIZER Curso """
""" Enviar mis datos del backend al frontend """
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Curso
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Curso """
""" Para verificar la informacion que me envia el frontend """
class CursoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Curso
        # Especificar los atributos que se desea serializar 
        fields =(
            'nombre_curso',
        )