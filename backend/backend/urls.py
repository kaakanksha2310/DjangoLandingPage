from django.contrib import admin
from django.urls import path, include
from accounts import views 
from accounts.views import RegisterView, MyTokenObtainPairView, user_profile, ChangePasswordView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', MyTokenObtainPairView.as_view(), name='login'),  # Login endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh endpoint
    path('api/profile/', user_profile, name='user-profile'),  # Profile endpoint
     path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),  # Add this line
    path('api/forgot-password/', views.password_reset_request, name='forgot-password'),

]