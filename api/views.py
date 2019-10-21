from rest_framework import generics

from boards.models import Board
from .serializers import BoardSerializer


class BoardCreateAPIView(generics.ListCreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
