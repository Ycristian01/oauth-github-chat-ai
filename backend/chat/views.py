import os
import requests
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

class GeminiAIChatView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request):

    headers = {
      "Content-Type": "application/json",
    }

    data = {
      "contents": [{
          "parts": [{"text": request.data.get("message", "cuenta del 1 al 10")}]
      }]
    }

    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=data)
        response_json = response.json()

        return Response(response_json["candidates"][0]["content"]["parts"][0]["text"], status=response.status_code)
    
    except requests.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
