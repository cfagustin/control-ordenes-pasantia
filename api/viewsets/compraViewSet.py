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
from api.models import Compra, Vendedor, Producto
# Importar los serializer
from api.serializers import CompraSerializer, CompraRegistroSerializer
# Importar los modulos de Count
from django.db.models import Count, Sum, Avg




""" VIEWSETS Compra """
class CompraViewSet(viewsets.ModelViewSet):
    # 
    queryset = Compra.objects.filter(activo=True)

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return CompraSerializer
        else:
            return CompraRegistroSerializer


     # FUNCION QUE VALIDA LOS PERMISOS
    def get_permissions(self):
        """" Define permisos para este recurso """
        # permission_clases
        # [IsAuthenticated] : Permite el acceso a cualquier usuario autenticado y denegar acceso a usuarios no autenticados         
        # [AllonAny] : Permite el acceso a cualquier usuario no autenticado
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]



    # REGISTRAR COMPRA 
    #################################################################################
   
    def create(self, request):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtenemos toda la informacion
                data = request.data
                
                # Validamos los datos que nos envia el frontend a traves del serializers CatedraticoRegistroSerializer
                validarSerializer = CompraRegistroSerializer(data=data)  
              
                # Verificamos si los datos enviado son validos
                if validarSerializer.is_valid():    
                    # Obtener el producto
                    producto = Producto.objects.get(pk=data.get("producto"))
                    # Obtener el vendedor
                    vendedor = Vendedor.objects.get(pk=data.get("vendedor"))
                    # Obtener el precio del producto
                    precio = float(data.get("precio"))
                    # Obtener la cantidad del producto
                    cantidad = float(data.get("cantidad"))
                   
                    # Calculamos el total de cada producto
                    totalProducto = float(cantidad * precio)  

                    # Registrar Compra
                    compra = Compra.objects.create(
                        cantidad = data.get("cantidad"),
                        total = float(totalProducto), 
                        producto = producto,
                        vendedor = vendedor,
                    )
                    # 
                    return Response(validarSerializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail":str(validarSerializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("entro a exception: ",e)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    



    


    
     
