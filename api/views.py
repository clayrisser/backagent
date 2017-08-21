from django.contrib.auth.models import User, Group
from rest_framework import views, viewsets
from rest_framework.response import Response
from api.serializers import UserSerializer, GroupSerializer
from api.services import sync_service

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class SyncView(views.APIView):
    def get(self, request, system):
        return Response(sync_service.sync(system))

    def post(self, request, system):
        return Response(sync_service.sync(system))
