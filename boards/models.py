from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Board(models.Model):
    caption = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.caption[:20]
