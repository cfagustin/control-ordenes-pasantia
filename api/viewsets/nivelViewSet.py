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
from api.models import Nivel
# Importar los serializer
from api.serializers import NivelSerializer, NivelRegistroSerializer
# Importar IsDirector
from api.permissions import IsDirector




""" VIEWSETS Nivel """
class NivelViewSet(viewsets.ModelViewSet):
    # En caso de que el modelo no tengo un activo solo se coloca esto
    # queryset = Nivel.objects.filter() 
    queryset = Nivel.objects.filter(activo=True)
    #
    permission_classes = (IsDirector,)

    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("nombre_nivel",)
    search_fields = ("nombre_nivel",)
    ordering_fields = ("nombre_nivel",)
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # Valida la accion que esta solicitando 
        if self.action == 'list' or self.action == 'retrieve':
            return NivelSerializer
        else:
            return NivelRegistroSerializer

    
    # FUNCION QUE VALIDA LOS PERMISOS
    """
    def get_permissions(self):
        #Define permisos para este recurso
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    """

    
    # create
    # list
    # retrieve
    # update
    # delete