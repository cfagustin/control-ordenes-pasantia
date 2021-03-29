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
from api.models import TareaEstudiante, AsignacionEstudiante, Tarea, Estudiante
# Importar los serializer
from api.serializers import TareaEstudianteSerializer, TareaEstudianteRegistroSerializer, AsignacionEstudianteSerializer, TareaSerializer
# Importar IsEstudiante
from api.permissions import IsEstudiante
# Importar el modulo de Count
from django.db.models import Count, Q




""" CREAR EL VIEWSET tareaestudiante """
class TareaEstudianteViewSet(viewsets.ModelViewSet):
    # Devuelve una lista de registro coincidentes
    queryset = TareaEstudiante.objects.filter(activo=True)

    # Permiso 
    #permission_classes = (IsEstudiante,)


    # Devuelve un registro único con coincidencia en el valor de la clase principal
    #tarea_estudiante.objects.get(pk='12')
    
    # Metodo que devuelve la clase que debe usarse para el serializador 
    # Metodo que devuelve el serializador adecuado a utilizar
    def get_serializer_class(self):
        # Validamos el tipo de accion a ejecutar
        if self.action == 'list' or self.action == 'retrieve':
            return TareaEstudianteSerializer
        else:
            return TareaEstudianteRegistroSerializer


   

    # SOBREESCRIBIR FUNCION
    @action(detail=False, methods=['get'])
    def listarMisCursos(self, request):
        # Filtrar informacion del usuario autenticado
        queryset = AsignacionEstudiante.objects.filter(estudiante__profile__user=self.request.user)
        serializer = AsignacionEstudianteSerializer(queryset, many=True)
        return Response(serializer.data)


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def listarTareas(self, request):
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
    


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def listarTareasCalificadas(self, request):
        try:
             # Obtenemos el idTarea
            idTarea = request.query_params.get("tarea")
            estudiante = request.user.profile.estudiante_profile
            #idEstudiante = request.query_params.get("estudiante") 
            # Obtenemos todos los datos filtrado segun el idAsignacion
            datos = TareaEstudiante.objects.filter(tarea=idTarea, estudiante=estudiante, activo=True)
            # Especificamos que datos nos va a devolver el serializer
            serializer = TareaEstudianteSerializer(datos, many=True)
            #
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def listarTareasPorCalificar(self, request):
        try:
            # Obtenemos el idTarea
            idTarea = request.query_params.get("tarea")          
            # Obtenemos todos los datos filtrado 
            datos = TareaEstudiante.objects.filter(tarea=idTarea, activo=True)
            # Especificamos que datos nos va a devolver el serializer
            serializer = TareaEstudianteSerializer(datos, many=True)
            #
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def proximasTareasEntregar(self, request):
        try:
            # Obtenemos el idTarea
            #idTarea = request.query_params.get("tarea")  
            estudiante = request.user.profile.estudiante_profile        
            # Obtenemos todos los datos filtrado 
            datos = Tarea.objects.filter(estudiante=estudiante, activo=True)
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
                serializer = TareaEstudianteRegistroSerializer(data=data)
    
                if serializer.is_valid():
                    # Obtenemos el idTarea
                    idTarea = Tarea.objects.get(pk=data.get("tarea"))
                    # Obtenemos el idEstudiante
                    idEstudiante = Estudiante.objects.get(pk=data.get("estudiante"))

                    # Registrar
                    tareaestudiante = TareaEstudiante.objects.create(
                        descripcion = data.get("descripcion"),
                        documento_adjuntar = File(archivo),
                        tarea = idTarea,
                        estudiante = idEstudiante,
                    )
                    # Guardar
                    tareaestudiante.save()
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
                #serializer = TareaEstudianteRegistroSerializer(data=data)
                #if serializer.is_valid():
                # Obtener el id Material
                tareaestudiante = TareaEstudiante.objects.get(pk=pk)
                # Porque se utiliza (File) para guardar un archivo 
                # Con File se crea un archivo nuevo (Vuelve a crear el archivo sin permisos)
                tareaestudiante.calificacion = data.get("calificacion")
                tareaestudiante.save()

                return Response(data, status=status.HTTP_200_OK)
                
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    # Total de tareas pendientes por calificar de un catedratico
    @action (detail=False, methods=['get'])
    def totalTareasPendientesCalificar(self, request):
        try:
            # Obtenemos el usuario autenticado
            miCatedratico = self.request.user

            queryset = TareaEstudiante.objects.filter(
                tarea__asignacion__catedratico__profile__user= miCatedratico,
                calificacion__lte = 0,
                activo=True
            ).aggregate(
                total_por_calificar = Count('calificacion')
            )
            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)



    # Total de tareas pendientes por calificar por curso de un catedratico
    @action(detail=False, methods=['get'])
    def totalTareasPendientesCalificarPorCurso(self, request):
        try:
            # Obtener el usuario autenticado
            miCatedratico = self.request.user.profile.catedratico_profile

            # Obtenemos las asignaciones(cursos) del catedratico
            queryset = miCatedratico.asignacion_catedratico.prefetch_related(
                # Obtenemos todas las tareas que tiene este catedratico
                'tarea_asignacion'
            ).annotate(
                total_tareas=Count('tarea_asignacion'),
                total_pendientes=Count(
                    'tarea_asignacion__tareaestudiante_tarea',
                    filter=(
                        Q(tarea_asignacion__tareaestudiante_tarea__calificacion=0)
                    )
                )
            )
            # Crear un arreglo
            asignaciones = []
            #Iteramos
            for asignacion in queryset:
                subconsulta = asignacion.tarea_asignacion.filter(activo=True)
                serializer = TareaSerializer(subconsulta, many=True)

                datos = {
                    # Listado de las asignaciones(cursos)
                    'asignacion': asignacion.curso.nombre_curso,
                    # Total de tareas que tiene cada asignacion (curso)
                    'total_tareas': asignacion.total_tareas,
                    # total de tareas pendientes que tiene cada asignacion (curso)
                    'total_pendiente': asignacion.total_pendientes,
                }
                asignaciones.append(datos)

            return Response(asignaciones, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)


