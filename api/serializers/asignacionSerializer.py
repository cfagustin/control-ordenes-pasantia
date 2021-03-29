# Importar el paquete serializers
from rest_framework import serializers
# Importar el modelo Asignacion
from api.models import Asignacion
# Importar el serializer Catedratico
from api.serializers import CatedraticoRegistroSerializer, CatedraticoSerializer
# Importar el serializer Curso
from api.serializers import CursoRegistroSerializer, CursoSerializer
# Importar el serializer Grado
from api.serializers import GradoRegistroSerializer, GradoSerializer
# Importar el serializer Ciclo
from api.serializers import CicloRegistroSerializer, CicloSerializer
# Importar el serializer Seccion
from api.serializers import SeccionRegistroSerializer, SeccionSerializer




""" SERIALIZER Asignacion """
class AsignacionSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    ciclo = CicloSerializer()
    grado = GradoSerializer()
    seccion = SeccionSerializer()
    curso = CursoSerializer()
    catedratico = CatedraticoSerializer()
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Asignacion
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Asignacion """
class AsignacionRegistroSerializer(serializers.ModelSerializer):
    # Redefinir con que serializer
    #ciclo = CicloRegistroSerializer()
    #grado = GradoRegistroSerializer()
    #seccion = SeccionRegistroSerializer()
    #curso = CursoRegistroSerializer()
    #catedratico = CatedraticoRegistroSerializer()

    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Asignacion
        # Especificar los atributos que se desea serializar 
        fields =(
            #'imagen',
            'descripcion',
            'ciclo',
            'grado',
            'seccion',
            'curso',
            'catedratico',
        )

