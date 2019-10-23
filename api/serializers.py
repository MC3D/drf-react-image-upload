from rest_framework import serializers

from boards.models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        depth = 1
        fields = ('id', 'image', 'caption', 'created_by')
