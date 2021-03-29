# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Seccion



""" SERIALIZER Seccion """
""" Enviar mis datos del backend al frontend """
class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Seccion
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Seccion """
""" Para verificar la informacion que me envia el frontend """
class SeccionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Seccion
        # Especificar los atributos que se desea serializar 
        fields =(
            'nombre_seccion',
        )