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
from api.models import Ciclo
# Importar los serializer
from api.serializers import CicloSerializer, CicloRegistroSerializer
# Importar IsDirector
from api.permissions import IsDirector




""" VIEWSETS Ciclo"""
class CicloViewSet(viewsets.ModelViewSet):
    # 
    queryset = Ciclo.objects.filter(activo=True)

    # Permiso 
    permission_classes = (IsDirector,)

    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("ciclo_escolar",)
    search_fields = ("ciclo_escolar",)
    ordering_fields = ("ciclo_escolar",)
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return CicloSerializer
        else:
            return CicloRegistroSerializer


