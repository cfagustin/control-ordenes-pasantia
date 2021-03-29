# Importar el paquete models
from django.db import models
# Importar el modelo Curso
from .curso import Curso
# Importar el modelo Ciclo
from .ciclo import Ciclo
# Importar el modelo Seccion
from .seccion import Seccion
# Importar el modelo Grado
from .grado import Grado
# Importar el modelo Catedratico
from .catedratico import Catedratico
# Importar el modelo Estudiante
from .estudiante import Estudiante




""" MODELO Asignacion """
class Asignacion(models.Model):
    # Atributos del modelo
    imagen_portada = models.ImageField(upload_to='Portada')
    descripcion = models.CharField(max_length=255)

    # Relacion uno a muchos (modelo Ciclo)
    ciclo = models.ForeignKey(Ciclo, on_delete=models.CASCADE, related_name='asignacion_ciclo')
    # Relacion uno a muchos (modelo Grado)
    grado = models.ForeignKey(Grado, on_delete=models.CASCADE, related_name='asignacion_grado')
    # Relacion uno a muchos (modelo Seccion)
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE, related_name='asignacion_seccion')
    # Relacion uno a muchos (modelo Curso)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='asignacion_curso')
    # Relacion uno a muchos (modelo Catedratico)
    catedratico = models.ForeignKey(Catedratico, on_delete=models.CASCADE, related_name='asignacion_catedratico')

    # Relacion muchos a muchos (modelo Estudiante)
    estudiantes = models.ManyToManyField(Estudiante, through='AsignacionEstudiante')


    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)

    def __unicode__(self):
        return self.descripcion


    def delete(self, *args):
        self.activo = False
        self.save()
        return True