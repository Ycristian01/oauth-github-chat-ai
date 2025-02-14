from django.urls import path
from .views import GeminiAIChatView

urlpatterns = [
    path("chat/", GeminiAIChatView.as_view(), name="openai_chat"),
]