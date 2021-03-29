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
from api.models import Estudiante, Profile, Rol
# Importar los serializer
from api.serializers.estudianteSerializer import EstudianteSerializer, EstudianteRegistroSerializer
# Importar IsDirector
from api.permissions import IsCatedratico, IsDirector
#
from django.db.models import Count




""" VIEWSETS Estudiante """
class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True)

    # Permiso 
    #permission_classes = (IsDirector,)

    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("carnet",)
    search_fields = ("carnet",)
    ordering_fields = ("carnet",)
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteSerializer
        else:
            return EstudianteRegistroSerializer




    
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
                validarSerializer = EstudianteRegistroSerializer(data=data)  
                
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
        
                    # Registrar Estudiante
                    estudiante = Estudiante.objects.create(
                        profile = profile,
                        carnet = data.get("carnet"),
                        contacto = data.get("contacto"),
                        telefono_contacto = data.get("telefono_contacto"),
                        direccion_contacto = data.get("direccion_contacto"),         
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
                validarSerializerEditar = EstudianteRegistroSerializer(data=data)  

                # Verificamos si los datos enviado son validos
                if validarSerializerEditar.is_valid():                
                    # Obtener el id de Catedratico
                    estudiante = Estudiante.objects.get(pk=pk)

                    # Obtenemos el objecto del select (Rol)
                    rol = Rol.objects.get(pk=data.get("profile").get("rol"))
                

                    # Accedemos al profile a traves de (catedratico.profile)
                    profile = estudiante.profile
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

                    estudiante.profile = profile
                    estudiante.carnet = data.get("carnet")
                    estudiante.contacto = data.get("contacto")
                    estudiante.telefono_contacto = data.get("telefono_contacto")
                    estudiante.direccion_contacto = data.get("direccion_contacto")
                    estudiante.save()
                    
                    return Response(validarSerializerEditar.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializerEditar.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def totalEstudiantes (self, request):
        try:
            queryset = Estudiante.objects.filter(
               activo=True
                ).aggregate(
                    total_estudiante =Count(
                        'id'
                    )
                )
            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)

