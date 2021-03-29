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
from api.models import Ciclo, Grado, Seccion, Curso, Catedratico, Asignacion
# Importar los serializer
from api.serializers import AsignacionSerializer, AsignacionRegistroSerializer
# Importar IsDirector
from api.permissions import  IsCatedratico, IsDirector





""" VIEWSETS Asignacion """
class AsignacionViewSet(viewsets.ModelViewSet):
    queryset = Asignacion.objects.filter(activo=True)

    # Permiso 
    #permission_classes = (IsDirector,)


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
            return AsignacionSerializer
        else:
            return AsignacionRegistroSerializer

   
  

    # SOBREESCRIBIR LA FUNCION CREAR
    def create(self, request):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializer = AsignacionRegistroSerializer(data=data)  
                               
                # Verificamos si los datos enviado son validos
                if validarSerializer.is_valid():
                    
                    ciclo = Ciclo.objects.get(pk=data.get("ciclo"))
                    grado = Grado.objects.get(pk=data.get("grado"))
                    seccion = Seccion.objects.get(pk=data.get("seccion"))
                    curso = Curso.objects.get(pk=data.get("curso"))
                    catedratico = Catedratico.objects.get(pk=data.get("catedratico"))

                    # Registrar Catedratico
                    asignacion = Asignacion.objects.create(
                        descripcion = data.get("descripcion"),
                        ciclo = ciclo,
                        grado = grado,
                        seccion = seccion,
                        curso = curso,
                        catedratico = catedratico
                    )
                    return Response(validarSerializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    # SOBREESCRIBIR LA FUNCION CREAR
    def update(self, request, pk):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtenemos toda la informacion
                data = request.data

                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializer = AsignacionRegistroSerializer(data=data)  
                
                # Verificamos si los datos enviado son validos
                if validarSerializer.is_valid():

                    ciclo = Ciclo.objects.get(pk=data.get("ciclo"))
                    grado = Grado.objects.get(pk=data.get("grado"))
                    seccion = Seccion.objects.get(pk=data.get("seccion"))
                    curso = Curso.objects.get(pk=data.get("curso"))
                    catedratico = Catedratico.objects.get(pk=data.get("catedratico"))
                    
                    # Obtener el id de asignacion
                    asignacion = Asignacion.objects.get(pk=pk)
                    
                    asignacion.descripcion = data.get("descripcion")
                    asignacion.ciclo = ciclo
                    asignacion.grado = grado
                    asignacion.seccion = seccion
                    asignacion.curso = curso
                    asignacion.catedratico = catedratico
                    asignacion.save()
                    return Response(validarSerializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


    