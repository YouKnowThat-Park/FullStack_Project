from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    # → 어드민 페이지
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # → 로그인
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # → 리프레시 토큰
    path('api/users/', include('users.urls'))
    # → 회원가입
]
