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
from api.models import Tarea, Asignacion
# Importar los serializer
from api.serializers import TareaSerializer, TareaRegistroSerializer



""" VIEWSET material """
class TareaViewSet(viewsets.ModelViewSet):

    queryset = Tarea.objects.filter(activo=True)

     # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("titulo_tarea",)
    search_fields = ("titulo_tarea",)
    ordering_fields = ("titulo_tarea",)
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return TareaSerializer
        else:
            return TareaRegistroSerializer


    # FUNCION QUE VALIDA LOS PERMISOS
    def get_permissions(self):
        """" Define permisos para este recurso """
        # permission_clases
        # [IsAuthenticated] : Permite el acceso a cualquier usuario autenticado y denegar acceso a usuarios no autenticados         
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]



    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def listado (self, request):
        try:
            # Obtenemos el idAsignacion
            idAsignacion = request.query_params.get("id_asignacion")
            # Obtenemos todos los datos filtrado segun el idAsignacion
            datos = Tarea.objects.filter(asignacion=idAsignacion, activo=True)
            # Especificamos que datos nos va a devolver el serializer
            serializer = TareaSerializer(datos, many=True)
            #
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)


    # Sobreescribir el metodo create
    def create(self, request):
        try:
            with transaction.atomic():
                # Obtenemos la data
                data = request.data
                # Obtenemos el archivo
                archivo = data.get('archivo')
                # 
                data = json.loads(data["data"])

                # Validamos la data en el serializer 
                serializer = TareaRegistroSerializer(data=data)
                print("fecha entregra: ",data.get('fecha_entrega'))
                # 
                if serializer.is_valid():
                    # Obtenemos el idAsignacion
                    idAsignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    print("id asignacion: ", idAsignacion) 
                    # Registrar Tarea
                    tarea = Tarea.objects.create(
                        titulo_tarea = data.get("titulo_tarea"),
                        descripcion = data.get("descripcion"),
                        documento_adjuntar = File(archivo),
                        fecha_entrega = data.get("fecha_entrega"),
                        hora_entrega = data.get("hora_entrega"),
                        nota = data.get("nota"),
                        asignacion = idAsignacion,
                    )
                    # Guardar
                    tarea.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail: ',str(e)}, status=status.HTTP_400_BAD_REQUEST)
        print("datos: ",request.data)
    


    def update(self, request, pk):
        try:
            with transaction.atomic():
                # Obtener la data
                data = request.data
                # Obtenemos el archivo
                archivo = data.get("archivo")
                # Sobreescribimos la variable data para obtener la data
                data = json.loads(data["data"])
                
                serializer = TareaRegistroSerializer(data=data)
                if serializer.is_valid():

                    print("entro a update")
                    # Obtener el id Material
                    tarea = Tarea.objects.get(pk=pk)
                    
                    if tarea.documento_adjuntar is not None:
                        tarea.documento_adjuntar.delete()
                    # Porque se utiliza (File) para guardar un archivo 
                    # Con File se crea un archivo nuevo (Vuelve a crear el archivo sin permisos)
                    tarea.titulo_tarea = data.get("titulo_tarea")
                    tarea.descripcion = data.get("descripcion")
                    tarea.fecha_entrega = data.get("fecha_entrega")
                    tarea.hora_entrega = data.get("hora_entrega")
                    tarea.nota = data.get("nota")
                    tarea.documento_adjuntar = File(archivo)
                    tarea.asignacion_id = data.get("asignacion")
                    tarea.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def destroy(self, request, pk):
        try:
            # Obtenemos el objeto del modelo Material
            tarea = Tarea.objects.get(pk=pk)

            # Validamos y eliminamos el archivo
            if tarea.documento_adjuntar is not None:
                tarea.documento_adjuntar.delete()
            
            # Eliminar el registro
            tarea.delete()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
             return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

