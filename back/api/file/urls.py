from django.urls import path
from .views import BlueprintUploadView, BlueprintListView

urlpatterns = [
    path('upload/', BlueprintUploadView.as_view(), name='blueprint-upload'),
    path('list/', BlueprintListView.as_view(), name='blueprint-list'),
]
