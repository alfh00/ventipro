from django.db import models

class Blueprint(models.Model):
    project_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="blueprints/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.project_name
