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
# Registrar la url Profesion a traves de un enrutador
router.register(r'profesion', viewsets.ProfesionViewSet)
# Registrar la url Curso a traves de un enrutador
router.register(r'curso', viewsets.CursoViewSet)
# Registrar la url Nivel a traves de un enrutador
router.register(r'nivel', viewsets.NivelViewSet)
# Registrar la url Grado a traves de un enrutador
router.register(r'grado', viewsets.GradoViewSet)
# Registrar la url Ciclo a traves de un enrutador
router.register(r'ciclo', viewsets.CicloViewSet)
# Registrar la url Seccion a traves de un enrutador
router.register(r'seccion', viewsets.SeccionViewSet)
# Registrar la url Catedratico a traves de un enrutador
router.register(r'catedratico', viewsets.CatedraticoViewSet)
# Registrar la url Estudiante a traves de un enrutador
router.register(r'estudiantes', viewsets.EstudianteViewSet)
# Registrar la url Asignacion a traves de un enrutador
router.register(r'asignacion', viewsets.AsignacionViewSet)
# Registrar la url Asignacion a traves de un enrutador
router.register(r'asignacionestudiante', viewsets.AsignacionEstudianteViewSet)
# Registrar la url Asignacion a traves de un enrutador
router.register(r'material', viewsets.MaterialViewSet)
# Registrar la url Asignacion a traves de un enrutador
router.register(r'tarea', viewsets.TareaViewSet)
# Registrar la url tareaestudiante a traves de un enrutador
router.register(r'tareaestudiante', viewsets.TareaEstudianteViewSet)


urlpatterns = [
    # ESTE PATH LLAMA AL router (a las urls)
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    