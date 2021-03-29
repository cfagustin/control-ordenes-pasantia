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
from api.models import Grado, Nivel
# Importar los serializer
from api.serializers import GradoSerializer, GradoRegistroSerializer
# Importar IsDirector
from api.permissions import IsDirector
#
from django.db.models import Count




""" VIEWSETS Grado"""
class GradoViewSet(viewsets.ModelViewSet):
    # 
    queryset = Grado.objects.filter(activo=True)
    
    # Permiso 
    permission_classes = (IsDirector,)

    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("nombre_grado",)
    search_fields = ("nombre_grado",)
    ordering_fields = ("nombre_grado",)
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return GradoSerializer
        else:
            return GradoRegistroSerializer




    # SOBREESCRIBIR LA FUNCION CREATE
    def create(self, request):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializer = GradoRegistroSerializer(data=data)  
                               
                # Verificamos si los datos enviado son validos
                if validarSerializer.is_valid():
                
                    # Obtenemos el objeto de nuestro select (Nivel)
                    nivel = Nivel.objects.get(pk=data.get("nivel").get("value"))

                    # Registrar Grado
                    grado = Grado.objects.create(
                        nombre_grado = data.get("nombre_grado"),
                        nivel = nivel, 
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
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializer = GradoRegistroSerializer(data=data)  
                               
                # Verificamos si los datos enviado son validos
                if validarSerializer.is_valid():
                    # Obtenemos el id de grado
                    grado = Grado.objects.get(pk=pk)

                    # Obtenemos el objeto de nuestro select (Nivel)
                    nivel = Nivel.objects.get(pk=data.get("nivel").get("value"))
                    
                    grado.nivel = nivel
                    grado.nombre_grado = data.get("nombre_grado")
                    grado.save()
                    
                    return Response(validarSerializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def totalGrados (self, request):
        try:
            queryset = Grado.objects.filter(
               activo=True
                ).aggregate(
                    total_grado =Count(
                        'id'
                    )
                )
            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)

