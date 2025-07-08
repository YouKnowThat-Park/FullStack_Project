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

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("이메일과 비밀번호는 필수입니다.")

        user = authenticate(request=self.context.get("request"), username=email, password=password)

        if not user:
            raise serializers.ValidationError("이메일 또는 비밀번호가 올바르지 않습니다.")

        refresh: RefreshToken = self.get_token(user)  # ✅ 타입 명시

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

    def to_internal_value(self, data):
        return {
            'email': data.get('email', ''),
            'password': data.get('password', ''),
        }