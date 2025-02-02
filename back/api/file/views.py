from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Blueprint
from .serializers import BlueprintSerializer
from rest_framework.decorators import api_view

class BlueprintUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = BlueprintSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlueprintListView(APIView):
    def get(self, request, *args, **kwargs):
        blueprints = Blueprint.objects.all()
        serializer = BlueprintSerializer(blueprints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['GET'])
def list_blueprints(request):
    blueprints = Blueprint.objects.all()
    response_data = []
    for blueprint in blueprints:
        data = BlueprintSerializer(blueprint).data
        if blueprint.file.name.endswith('.dxf'):
            data['preview'] = blueprint.file.url.replace('.dxf', '_preview.png')
        response_data.append(data)
    return Response(response_data)
