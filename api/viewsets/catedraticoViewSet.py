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
from api.models import Catedratico, Profile, Profesion, Rol
# Importar los serializer
from api.serializers import CatedraticoSerializer, CatedraticoRegistroSerializer
# Importar IsDirector
from api.permissions import IsDirector
# Importar el modulo de Count
from django.db.models import Count



""" VIEWSETS Catedratico """
class CatedraticoViewSet(viewsets.ModelViewSet):
    queryset = Catedratico.objects.all()

    # Permiso 
    permission_classes = (IsDirector,)


    """
    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("carnet",)
    search_fields = ("carnet",)
    ordering_fields = ("carnet",)
    """


    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CatedraticoSerializer
        else:
            return CatedraticoRegistroSerializer



    # SOBREESCRIBIR LA FUNCION CREAR
    def create(self, request):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtener el User
                user = request.user
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializer = CatedraticoRegistroSerializer(data=data)  
                
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
                
                    # Obtenemos el objeto de nuestro select (Profesion)
                    profesion = Profesion.objects.get(pk=data.get("profesion").get("value"))

                    # Registrar Catedratico
                    catedratico = Catedratico.objects.create(
                        profesion = profesion,
                        profile = profile
                    )
                    return Response(validarSerializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    # SOBREESCRIBIR LA FUNCION UPDATE
    def update(self, request, pk):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtener el User
                #user = request.user
                   
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializerEditar = CatedraticoRegistroSerializer(data=data)  

                # Verificamos si los datos enviado son validos
                if validarSerializerEditar.is_valid():                
                    # Obtener el id de Catedratico
                    catedratico = Catedratico.objects.get(pk=pk)

                    # Obtenemos el objeto de nuestro select (Profesion)
                    profesion = Profesion.objects.get(pk=data.get("profesion").get("value"))
                    # Obtenemos el objecto del select (Rol)
                    rol = Rol.objects.get(pk=data.get("profile").get("rol"))
                    

                    # Accedemos al profile a traves de (catedratico.profile)
                    profile = catedratico.profile
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
                    
                    catedratico.profesion = profesion
                    catedratico.profile = profile
                    catedratico.save()
                    return Response(validarSerializerEditar.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializerEditar.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def totalCatedraticos (self, request):
        try:
            queryset = Catedratico.objects.filter(
               
                ).aggregate(
                    total_catedratico =Count(
                        'id'
                    )
                )
            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def totalUsuarios (self, request):
        try:
            queryset = User.objects.filter(
                ).aggregate(
                    total_usuario =Count(
                        'id'
                    )
                )
            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)
