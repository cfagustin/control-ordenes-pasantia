import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

# Importar el paquete de transaction
from django.db import transaction
# Importar los modelos
from api.models import Vendedor, Rol, Profile
# Importar los serializer
from api.serializers import VendedorSerializer, VendedorRegistroSerializer



""" VIEWSETS Vendedor """
class VendedorViewSet(viewsets.ModelViewSet):
    # 
    queryset = Vendedor.objects.filter(activo=True)
   
    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return VendedorSerializer
        else:
            return VendedorRegistroSerializer
    


    # REGISTRAR VENDEDOR
    #################################################################################
   
    def create(self, request):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtener el User
                user = request.user
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers VendedorRegistroSerializer
                validarSerializer = VendedorRegistroSerializer(data=data)  
                
                # Verificamos si los datos enviado son validos
                if validarSerializer.is_valid():

                    # Registrar user
                    user = User.objects.create(
                        email = data.get("profile").get("user").get("email"),
                        username = data.get("profile").get("user").get("username"),  
                    )
                    user.set_password(data.get("profile").get("user").get("password"))
                    user.save()
                    
                    # Obtenemos el objecto del select (Rol)
                    rol = Rol.objects.get(pk=data.get("profile").get("rol"))
                    
                    # Registrar profile
                    profile = Profile.objects.create(
                        user = user,
                        nombre = data.get("profile").get("nombre"),
                        apellidos = data.get("profile").get("apellidos"),
                        telefono = data.get("profile").get("telefono"),
                        direccion = data.get("profile").get("direccion"),
                        gender = data.get("profile").get("gender"),
                        rol = rol,
                    )
                
                    # Registrar Vendedor
                    vendedor = Vendedor.objects.create(
                        profile = profile
                    )
                    return Response(validarSerializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    

    # ACTUALIZAR VENDEDOR
    #################################################################################
   
    def update(self, request, pk):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtener el User
                #user = request.user
                   
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializerEditar = VendedorRegistroSerializer(data=data)  

                # Verificamos si los datos enviado son validos
                if validarSerializerEditar.is_valid():                
                    # Obtener el id de Catedratico
                    vendedor = Vendedor.objects.get(pk=pk)

                    # Obtenemos el objecto del select (Rol)
                    rol = Rol.objects.get(pk=data.get("profile").get("rol"))
                    
                    # Accedemos al profile a traves de (catedratico.profile)
                    profile = vendedor.profile
                    profile.nombre = data.get("profile").get("nombre")
                    profile.apellidos = data.get("profile").get("apellidos")
                    profile.telefono = data.get("profile").get("telefono")
                    profile.direccion = data.get("profile").get("direccion")
                    profile.gender = data.get("profile").get("gender")
                    profile.rol = rol
                    profile.save()
                      
                    # Accedemos al USER a traves de (profile.user)
                    user = profile.user
                    user.email = data.get("profile").get("user").get("email")
                    user.username = data.get("profile").get("user").get("username")
                    user.set_password(data.get("profile").get("user").get("password"))
                    user.save()
                    
                    vendedor.profile = profile
                    vendedor.save()
                    return Response(validarSerializerEditar.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializerEditar.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

