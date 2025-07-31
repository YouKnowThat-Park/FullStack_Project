from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    
    TokenRefreshView
)
from users.views import EmailTokenObtainPairView,UserListView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # → 어드민 페이지
    path('api/token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # → 로그인
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # → 리프레시 토큰
    path('api/users/', include('users.urls')),
    # → 회원가입
    path('api/products/', include('products.urls'))
    # → 상품 관련 url
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
