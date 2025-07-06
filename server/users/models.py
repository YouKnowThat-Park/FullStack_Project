from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from users.utils.normalize import (
    normalize_phone_number,
    normalize_name,
)

# 2. User의 설정 (생성/권한)
class UserManager(BaseUserManager):
    # A. 일반 사용자 계정
    def create_user(self, email, password=None, name=None, phone_number=None, birth_date=None, **extra_fields):
        # ** : 키워드 인자 모으기
        # self : 호출한 클래스 인스턴스
        is_superuser = extra_fields.get('is_superuser', False)
        required_fields = {
            'email': email,
            'password': password,
            'name' : name,
            'phone_number': phone_number,
        }

        if not is_superuser:
            required_fields['birth_date'] = birth_date


        for field_name, value in required_fields.items():
            if not value:
                raise ValueError(f'{field_name}은(는) 필수 항목입니다.')
            
        email = self.normalize_email(email)
        phone_number = normalize_phone_number(phone_number)
        name = normalize_name(name)
        # normalize_ : 데이터 정규화 시키기 email은 기본 지원, phone_number,name는 개별 확장
        # 클라이언트 뿐만 아니라 서버에서도 보안 강화
        # phone_number,name 은 인스턴스 속성 호출이 아닌 새로 만든 일반 함수이기 때문에 self 사용 X

        user = self.model(
            email = email,
            name = name,
            phone_number = phone_number,
            birth_date = birth_date,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    # B. 관리자 계정
    def create_superuser(self, email, password=None, name=None, phone_number=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(
            email=email,
            password=password,
            name=name,
            phone_number=phone_number,
            **extra_fields
        )


# 1. User 모델
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=20, blank=False)
    birth_date = models.DateField(null=True, blank=False)
    phone_number = models.CharField(max_length=20, blank=False)

    is_active = models.BooleanField(default=True)
    # is_active는 계정이 사용 가능한 상태인지 확인 / 비활성화 계정, 이메일 미인증 계정 등등
    is_staff = models.BooleanField(default=True)
    # is_staff = 일반 사용자를 제어할 수 있는 관리자
    is_superuser = models.BooleanField(default=True)
    #is_superuser는 전체 권한 여부를 갖고 있는 총 관리자

    objects = UserManager()

    # AbstractBaseUser에서 요구되는 필수 설정
    USERNAME_FIELD = 'email' 
    # → 로그인에 사용할 사용자 식별 필드 (즉 기본값인 username을 email로 변경)
    REQUIRED_FIELDS = ['name', 'password', 'phone_number']
    # → createsuperuser 명령어 실행 시 email 외에 추가로 필수 입력할 필드

    def __str__(self):
        return self.email
