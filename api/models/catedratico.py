# Importar el paquete models
from django.db import models
# Importar el modelo Profile
from .profile import Profile
# Importar el modelo Profesion
from .profesion import Profesion



""" MODELO Catedratico """
class Catedratico(models.Model):
    # Relacion uno a uno (modelo Profile)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='catedratico_profile')
    # Relacion uno a muchos (modelo Profesion)
    profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE, related_name='catedratico_profesion')

    


   

