# Importar el paquete serailizer
from rest_framework import serializers
# Importar los modelos
from api.models import Profile
# Importar los serializer 
from api.serializers import RolSerializer, UserSerializer



""" SERIALIZER Profile """
""" Enviar mis datos del backend al frontend """
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    rol = RolSerializer()
    
    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Profile
        # Especificar los atributos que se desea serializar 
        fields =('__all__')



""" SERIALIZER Profile """
""" Para verificar la informacion que me envia el frontend """
class ProfileRegistroSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    #rol = RolSerializer()

    class Meta:
        # Especificar el model con el que se va a trabajar
        model = Profile
        # Especificar los atributos que se desea serializar 
        fields =(
            'user',
            'avatar',
            'nombre',
            'apellidos',
            'telefono',
            'direccion',
            'gender',
            'rol',
        )