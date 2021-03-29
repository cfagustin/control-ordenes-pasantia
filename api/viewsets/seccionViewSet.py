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

# Importar los modelos
from api.models import Seccion
# Importar los serializer
from api.serializers import SeccionSerializer, SeccionRegistroSerializer
# Importar IsDirector
from api.permissions import IsDirector
#
from django.db.models import Count


""" VIEWSETS Seccion """
class SeccionViewSet(viewsets.ModelViewSet):
    # 
    queryset = Seccion.objects.filter(activo=True)
        
    # Permiso 
    permission_classes = (IsDirector,)

    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("nombre_seccion",)
    search_fields = ("nombre_seccion",)
    ordering_fields = ("nombre_seccion",)
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return SeccionSerializer
        else:
            return SeccionRegistroSerializer


    # Sobreescribir el metodo list
    @action(detail=False, methods=['get'])
    def totalSecciones (self, request):
        try:
            queryset = Seccion.objects.filter(
               activo=True
                ).aggregate(
                    total_seccion =Count(
                        'id'
                    )
                )
            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)