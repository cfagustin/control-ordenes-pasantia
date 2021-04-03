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
from api.models import Producto, Vendedor
from api.serializers import ProductoSerializer, ProductoRegistroSerializer
# Importar los modulos de Count
from django.db.models import Count, Sum, Avg
#
from django.db.models import Func




""" VIEWSETS Producto """
class ProductoViewSet(viewsets.ModelViewSet):
    # 
    queryset = Producto.objects.filter(activo=True)

    # FILTROS DE BUSQUEDA Y ORDENAMIENTO
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # ESPECIFICA A QUE CAMPO SE LE ASIGNARA LOS FILTROS
    filter_fields = ("nombre_producto",)
    search_fields = ("nombre_producto",)
    ordering_fields = ("nombre_producto",)
    

    # FUNCION QUE VALIDA QUE SERIALIZADOR A UTILIZAR (list / retrieve)
    def get_serializer_class(self):
        """Define serializer for API"""
        # 
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoSerializer
        else:
            return ProductoRegistroSerializer


     # FUNCION QUE VALIDA LOS PERMISOS
    def get_permissions(self):
        """" Define permisos para este recurso """
        # permission_clases
        # [IsAuthenticated] : Permite el acceso a cualquier usuario autenticado y denegar acceso a usuarios no autenticados         
        # [AllonAny] : Permite el acceso a cualquier usuario no autorizado
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]



    # REGISTRAR PRODUCTO
    ##########################################################################
    
    def create(self, request):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtenemos toda la informacion
                data = request.data
               
                # Obtenemos el vendedor
                idVendedor = request.user.profile.vendedor_profile
                
                # Registrar Producto
                producto = Producto.objects.create(
                    nombre_producto = data.get("nombre_producto"),
                    precio_compra = data.get("precio_compra"),
                    precio_venta = data.get("precio_venta"),
                    vendedor = idVendedor,
                )
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)




    # ACTUALIZAR PRODUCTO
    ###################################################################################

    def update(self, request, pk):               
        try:
            # En caso que se suscite un error no ejecutar las demas peticiones
            with transaction.atomic():
                # Obtenemos toda la informacion
                data = request.data

                # Obtener el id de Catedratico
                producto = Producto.objects.get(pk=pk)
               
                #idVendedor = Vendedor.objects.get(pk=data.get("vendedor").get("id"))
                #print("idd: ", idVendedor)
                producto.nombre_producto = data.get("nombre_producto")
                producto.precio_compra = data.get("precio_compra")
                producto.precio_venta = data.get("precio_venta")
                producto.save()
                return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)




    # LISTAR TODOS LOS PRODUCTOS SEGUN EL USUARIO AUTENTICADO
    ###################################################################################

    # Listado de producto del vendedor
    @action(detail=False, methods=['get'])
    def listadoProductos(self, request):
        try:
            # Obtenemos el vendedor
            idVendedor = request.user.profile.vendedor_profile
            # Obtenemos todos los productos de los otros vendedores exculyendo los productos 
            # del usuario autenticado
            datos = Producto.objects.filter(vendedor=idVendedor, activo=True)
            # Especificamos que datos nos va a devolver el serializer
            serializer = ProductoSerializer(datos, many=True)
            #
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)




    # LISTAR EL CATALOGO DE LOS VENDEDORES EXCLUYENDO EL DEL USUARIO AUTENTICADO
    ###################################################################################

    @action(detail=False, methods=['get'])
    def listadoCatalogoVendedores (self, request):
        try:
            # Obtener el usuario no registrado
            usuarioNoRegistrado = request.user.is_anonymous
            print("anonimo: ", usuarioNoRegistrado)

            if (usuarioNoRegistrado != True):
                # Obtenemos el vendedor
                idVendedor = request.user.profile.vendedor_profile
            else:
                idVendedor = 0
            
            
            # Obtenemos todos los productos de los otros vendedores excluyendo los productos 
            # del usuario autenticado
            datos = Producto.objects.filter(activo=True).exclude(
                vendedor=idVendedor,
            )
            # Especificamos que datos nos va a devolver el serializer
            serializer = ProductoSerializer(datos, many=True)
            page = request.GET.get("page")
            try:
                page =self.paginate_queryset(datos)
            except Exception as e:
                page = []
                data = page
            #
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
    # TOTAL DE VENTAS POR PRODUCTO SEGUN EL USUARIO AUTENTICADO
    ###################################################################################
    @action(detail=False, methods=['get'])
    def totalVentasPorProducto(self, request):
        try:
            # Obtenemos el vendedor
            idVendedor = request.user.profile.vendedor_profile

            queryset = Producto.objects.filter(
                vendedor=idVendedor, activo=True
            ).annotate(
                total_ventas = Sum('compra_producto__total'),
                cantidad_vendida = Sum('compra_producto__cantidad')
            )
            # Especificamos que datos nos va a devolver el serializer
            serializer = ProductoSerializer(queryset, many=True)
            #
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)

    

    # TOTAL DE VENTAS SEGUN EL USUARIO AUTENTICADO
    ###################################################################################
    @action(detail=False, methods=['get'])
    def totalVentas(self, request):
        try:
            # Obtenemos el vendedor
            idVendedor = request.user.profile.vendedor_profile

            queryset = Producto.objects.filter(
                vendedor=idVendedor, activo=True
            ).aggregate(
                totales = Sum("compra_producto__total")  
            )

            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)



    # PROMEDIO DE PRECIOS DE LOS PRODUCTOS DEL USUARIO AUTENTICADO
    ###################################################################################
    @action(detail=False, methods=['get'])
    def promedioPrecios(self, request):
        try:
            # Obtenemos el vendedor
            idVendedor = request.user.profile.vendedor_profile

            queryset = Producto.objects.filter(
                vendedor=idVendedor, activo=True
            ).aggregate(
                promedio = Round(Avg("precio_venta"), 2)  
            )

            return Response(queryset, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail', str(e)}, status=status.HTTP_400_BAD_REQUEST)



class Round(Func):
    function = "ROUND"
    arity = 2

    


