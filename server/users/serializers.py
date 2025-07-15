from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model



#Django에서 기본 User 모델을 가져옴
User = get_user_model()

# 파이썬을 JSON으로 , JSON을 파이썬으로 바꿔주는 작업 // 파이썬은 JSON을 이해하지 못함

# 쉽게 POST , 사용자가 회원가입 폼에 입력한 데이터를 DB에 옮겨주는 회원가입 역할
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'phone_number', 'birth_date']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        #  extra_kwargs: password를 쓰기 전용(write_only)로 만들어서 입력은 받지만, 응답에는 출력되지 않도록 설정

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
            # create_user를 사용하면 password 자동 해싱
        
# 쉽게 GET , 프론트에서 유저 정보를 요청하거나 보낼 때
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone_number', 'birth_date']

# Meta는 시리얼라이저의 내부 설정을 한 곳에서 지정하는 설정창? 같은 기능...?
# Meta를 쓰지 않을 경우 email = serializers.EmailField() password = serializers.CharField(write_only) 이런식으로 하드코딩 해야 됨


# username을 email로 바꿔서 JWT 인증을 처리하는 커스텀 시리얼라이저
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Django에서 기본 User 모델을 가져옴
User = get_user_model()


# username을 email로 바꿔서 JWT 인증을 처리하는 커스텀 시리얼라이저
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):

    # username_field를 username 대신 email로 변경
    username_field = 'email'

    @classmethod
    def get_token(cls, user):
        # 기본 토큰 생성
        token = super().get_token(user)

        # ✅ access token payload에 관리자 여부를 포함시킴
        token["is_staff"] = user.is_staff
        token["is_superuser"] = user.is_superuser
        token["email"] = user.email  # (선택) 프론트에서 사용할 수 있음

        return token

    # 사용자 인증 및 토큰 생성
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        # 누락된 경우 예외 발생
        if not email or not password:
            raise serializers.ValidationError("이메일과 비밀번호는 필수입니다.")

        # Django 내장 인증 함수 사용 (백엔드에서 EmailBackend가 username=email로 처리)
        user = authenticate(
            request=self.context.get("request"),
            username=email,
            password=password
        )

        if not user:
            raise serializers.ValidationError("이메일 또는 비밀번호가 올바르지 않습니다.")

        # refresh/access 토큰 발급
        refresh = self.get_token(user)

        # 문자열 형태로 바꿔서 프론트엔드에서 쿠키 저장하거나 처리
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "is_staff": user.is_staff,         # 프론트에서 직접 사용 가능 (선택)
            "is_superuser": user.is_superuser, # 프론트에서 직접 사용 가능 (선택)
        }

    # 클라이언트에서 전달받은 JSON 데이터를 내부에서 사용할 수 있게 dict로 정리
    def to_internal_value(self, data):
        return {
            'email': data.get('email', ''),
            'password': data.get('password', ''),
        }
