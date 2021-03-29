# Importar el paquete models
from django.db import models
# Importar el modelo User
from django.contrib.auth.models import User
# Importar el modelo Rol
from .rol import Rol




""" MODELO Profile """
class Profile(models.Model):

    MALE = 0
    FEMALE = 1

    GENDERS = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    nombre = models.CharField(max_length=45)
    apellidos = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15, null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDERS, null=True, blank=True)

    #  Relacion uno a muchos (modelo Rol)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, related_name='profile_rol')
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)


    # Metodo que renderiza un objeto y lo presenta en forma de cadena
    def __unicode__(self):
        return self.user.username


    # EL OBJETIVO DE ESTA FUNCION ES PARA NO ELIMINAR DATOS
    # AL CONTRARIO SOLO SE LE CAMBIA DE ESTADO POR ELLO AL MODELO
    # SE CREA UN CAMPO LLAMADO ACTIVO
    def delete(self, *args):
        user = self.user
        user.is_active = False
        user.save()
        self.active = False
        self.save()
        return True
