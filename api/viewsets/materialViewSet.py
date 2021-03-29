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
from api.models import Material, Asignacion
# Importar los serializer
from api.serializers import MaterialSerializer, MaterialRegistroSerializer



""" VIEWSET material """
class MaterialViewSet(viewsets.ModelViewSet):

    queryset = Material.objects.filter(activo=True)

     # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("titulo_material",)
    search_fields = ("titulo_material",)
    ordering_fields = ("titulo_material",)
    
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return MaterialSerializer
        else:
            return MaterialRegistroSerializer


    # FUNCION QUE VALIDA LOS PERMISOS
    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]



    #
    @action(detail=False, methods=['get'])
    def listado(self, request):
        try:
            id_asignacion = request.query_params.get("id_asignacion")
            datos = Material.objects.filter(asignacion=id_asignacion, activo=True)
            serializer = MaterialSerializer(datos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def create(self, request):
        try:
            with transaction.atomic():
                # Obtener la data
                data = request.data
                # Obtenemos el archivo
                archivo = data.get("archivo")
                # Sobreescribimos la variable data para obtener la data
                data = json.loads(data["data"])

                serializer = MaterialRegistroSerializer(data=data)
                if serializer.is_valid():
                    # Obtener id_asignacion
                    idAsignacion = Asignacion.objects.get(pk=data.get("asignacion"))

                    # Porque se utiliza (File) para guardar un archivo 
                    # Con File se crea un archivo nuevo (Vuelve a crear el archivo sin permisos)

                    #Registrar
                    material = Material.objects.create(
                        titulo_material = data.get("titulo_material"),
                        descripcion = data.get("descripcion"),
                        documento_adjuntar = File(archivo),
                        asignacion = idAsignacion,
                    )
                    material.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    

    def update(self, request, pk):
        try:
            with transaction.atomic():
                # Obtener la data
                data = request.data
                # Obtenemos el archivo
                archivo = data.get("archivo")
                # Sobreescribimos la variable data para obtener la data
                data = json.loads(data["data"])
                
                serializer = MaterialRegistroSerializer(data=data)
                if serializer.is_valid():

                    print("entro a update")
                    # Obtener el id Material
                    material = Material.objects.get(pk=pk)
                    
                    if material.documento_adjuntar is not None:
                        material.documento_adjuntar.delete()
                    # Porque se utiliza (File) para guardar un archivo 
                    # Con File se crea un archivo nuevo (Vuelve a crear el archivo sin permisos)
                    material.titulo_material = data.get("titulo_material")
                    material.descripcion = data.get("descripcion")
                    material.documento_adjuntar = File(archivo)
                    material.asignacion_id = data.get("asignacion")
                    material.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def destroy(self, request, pk):
        try:
            # Obtenemos el objeto del modelo Material
            material = Material.objects.get(pk=pk)
            print("destroy")
            # Validamos y eliminamos el archivo
            if material.documento_adjuntar is not None:
                material.documento_adjuntar.delete()
            
            # Eliminar el registro
            material.delete()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
             return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)