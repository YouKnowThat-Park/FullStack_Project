from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer

#Django에서 기본 User 모델을 가져옴
User = get_user_model()

# 실제 POST 요청 회원가입 API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # → Django ORM 문법 파이썬 코드로 SQL을 추상화 한 것 // 쉽게 장고 버전 SQL
    serializer_class = RegisterSerializer
    # → 어떤 시리얼라이저(문법 변환기)를 사용할지 지정 
    permission_classes = [permissions.AllowAny]
    # → 인증 없이도 접근 가능 (회원정보가 없는 비회원이 가입해야 되니까)

# 🚨 로그인 API는 simplejwt 패키가 자동으로 제공, 즉 URL이 로그인 API 역할을 함!

# 실제 GET 요청, 로그인한 유저 정보 API
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    # → Django ORM 문법 파이썬 코드로 SQL을 추상화 한 것 // 쉽게 장고 버전 SQL
    serializer_class = RegisterSerializer
    # → 어떤 시리얼라이저(문법 변환기)를 사용할지 지정
    permission_classes = [permissions.IsAuthenticated]
    # → 로그인된 사용자만 조회 가능하게 설정

    def get_object(self):
        return self.request.user
    # → URL에 user_id를 입력하지 않아도 본인 정보만 조회 가능하게 만듬
    