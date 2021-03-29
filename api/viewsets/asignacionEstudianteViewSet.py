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
from api.models import Estudiante, Asignacion, AsignacionEstudiante
# Importar los serializer
from api.serializers import AsignacionEstudianteSerializer, AsignacionEstudianteRegistroSerializer, AsignacionSerializer
# Importar IsCatedratico
from api.permissions import IsCatedratico





""" VIEWSETS Asignacion """
class AsignacionEstudianteViewSet(viewsets.ModelViewSet):
    queryset = AsignacionEstudiante.objects.filter(activo=True)

    # Permiso 
    #permission_classes = (IsCatedratico,)

    
    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("asignacion",)
    search_fields = ("asignacion",)
    ordering_fields = ("asignacion",)
    


    # SOBREESCRIBIR FUNCION
    # Listar cursos asignados ya sea del catedratico o estudiante
    @action(detail=False, methods=['get'])
    def listarCursos(self, request):
        try:
            # Filtrar informacion del usuario autenticado
            queryset = Asignacion.objects.filter(catedratico__profile__user=self.request.user).order_by('grado__nombre_grado', 'seccion__nombre_seccion')
            serializer = AsignacionSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    

    #
    @action(detail=False, methods=['get'])
    def listado(self, request):
        try:
            id_asignacion = request.query_params.get("id_asignacion")
            datos = AsignacionEstudiante.objects.filter(asignacion=id_asignacion)
            serializer = AsignacionEstudianteSerializer(datos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



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
                validarSerializer = AsignacionEstudianteRegistroSerializer(data=data)  
                
                # Verificamos si los datos enviado son validos
                if validarSerializer.is_valid():
                    
                    # Obtenemos el objeto
                    idAsignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    idEstudiante = Estudiante.objects.get(pk=data.get("estudiante"))

                    # Registrar 
                    asignar = AsignacionEstudiante.objects.create(
                       asignacion = idAsignacion,
                       estudiante = idEstudiante
                    )
                    asignar.save()
                    
                    return Response(validarSerializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

       
       

