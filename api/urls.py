from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets
from django.conf import settings
from django.conf.urls.static import static


# Crear el objeto
router = DefaultRouter()
# Registrar la url User a traves de un enrutador
router.register(r'user', viewsets.UserViewset)
# Registrar la url Rol a traves de un enrutador
router.register(r'rol', viewsets.RolViewSet)
# Registrar la url Vendedor a traves de un enrutador
router.register(r'vendedor', viewsets.VendedorViewSet)
# Registrar la url Producto a traves de un enrutador
router.register(r'producto', viewsets.ProductoViewSet)
# Registrar la url Compra a traves de un enrutador
router.register(r'compra', viewsets.CompraViewSet)



urlpatterns = [
    # ESTE PATH LLAMA AL router (a las urls)
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    