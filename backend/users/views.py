import os
import requests
from requests_oauthlib import OAuth2Session
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.conf import settings
from .models import UserProfile

GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_USER_URL = "https://api.github.com/user"

class GitHubLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        
        code = request.data.get("code")
        if not code:
            return Response({"error": "Code is required"}, status=400)

        github = OAuth2Session(client_id=GITHUB_CLIENT_ID)
        token_response = github.fetch_token(
            token_url=GITHUB_TOKEN_URL,
            code=code,
            client_secret=GITHUB_CLIENT_SECRET,
            headers={'Accept': 'application/json'}
        )

        access_token = token_response.get("access_token")

        if not access_token:
            return Response({"error": "Failed to obtain access token"}, status=400)

        user_data = requests.get(GITHUB_USER_URL, headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json"
        }).json()

        github_id = user_data.get("id")
        username = user_data.get("login")
        avatar_url = user_data.get("avatar_url")

        if not github_id or not username:
            return Response({"error": "Invalid GitHub response"}, status=400)

        user, created = UserProfile.objects.get_or_create(
            github_id=github_id,
            defaults={"username": username, "avatar_url": avatar_url}
        )

        token, _ = Token.objects.get_or_create(user=user)

        login(request, user)

        return Response({
            "token": token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "avatar_url": user.avatar_url
            }
        })

   