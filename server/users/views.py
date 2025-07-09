from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer
from .serializers import EmailTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
from typing import cast, Dict

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
    


# JWT 로그인 시 이메일 기반 인증 수행하고 access, refresh token을 HttpOnly 쿠키에 저장해주는 뷰
class EmailTokenObtainPairView(TokenObtainPairView):

    # 이메일 인증용 시리얼라이저 지정
    serializer_class = EmailTokenObtainPairSerializer

    # 로그인 POST 요청 시 실해오디는 메서드
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # 시리얼라이저에서 발급된 access, refresh 토큰 추출
        validated_data = serializer.validated_data
        access = validated_data["access"]
        refresh = validated_data["refresh"]

        # 기본 응답 구조, 바디에 메시지만 전달
        res = Response({"message": "로그인 성공"}, status=status.HTTP_200_OK)

        # access_token을 HttpOnly 쿠키로 저장
        res.set_cookie(
            key='access_token',
            value=access,
            httponly=True,
            secure=True,
            samesite='Strict',
            path='/',
        )
        res.set_cookie(
            key='refresh_token',
            value=refresh,
            httponly=True,
            secure=True,
            samesite='Strict',
            path='/',
        )

        # httponly: JS에서 접근 불가, secure: https 환경에서만 전송, samesite: 교차 사이트 요청 차단, path: 어떤 경로에서 처리 할건지 "/" 는 전체 경로에서 유효

        return res