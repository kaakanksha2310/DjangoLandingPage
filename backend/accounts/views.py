from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from django.contrib.auth.hashers import check_password
from rest_framework.views import APIView

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import ssl
import certifi
from smtplib import SMTP
# User Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)  # Log the incoming request data for debugging
        return super().create(request, *args, **kwargs)
# Login view using JWT tokens
class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)  # Allow anyone to login
    # You don't need to write any serializer here, TokenObtainPairView handles it

# Profile view to retrieve user data after authentication
@csrf_exempt 
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # User must be logged in
def user_profile(request):
    user = request.user
    return Response({
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'date_joined': user.date_joined,
        'last_login': user.last_login,
    })
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can change passwords

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not check_password(old_password, user.password):
            return Response({"error": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "New passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@permission_classes([AllowAny]) 
def password_reset_request(request):
    email = request.data.get('email')
    print(f"Received email: {email}")
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'No user with this email address.'}, status=status.HTTP_400_BAD_REQUEST)

    # Generate password reset token
    token = default_token_generator.make_token(user)
    reset_url = f"http://localhost:3000/reset-password?token={token}"

   
    
    # context = ssl.create_default_context(cafile=certifi.where())
    ssl_context = ssl._create_unverified_context()

    # Send email with the custom SSL context
 # Send the email with SSL context using Django's send_mail function
    # send_mail(
    #     'Password Reset Request',
    #     f'Click the link to reset your password: {reset_url}',
    #     settings.DEFAULT_FROM_EMAIL,
    #     [email],
    #     fail_silently=False,
    # )
    # return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)
   # Manually send the email using the SMTP module with SSL verification disabled
    with SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as smtp:
        smtp.starttls(context=ssl_context)  # Start TLS with the unverified SSL context
        smtp.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
        smtp.sendmail(
            settings.DEFAULT_FROM_EMAIL,
            email,
            f'Subject: Password Reset Request\n\nClick the link to reset your password: {reset_url}'
        )

    return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)