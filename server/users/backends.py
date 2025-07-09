from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()

# Django 인증 시스템은 기본적으로 username 기반 하지만 프론트에서 email로 로그인을 하고 싶기에
# Django에 맞게 백엔드 인증 클래스를 커스텀 진행

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # → request, email, password를 받아 인증 시도

        email = username or kwargs.get('email')
        # → 전달 된 username을 email로 사용 또는 키워드에서 추출

        if email is None or password is None:
            return None
        # → 인증시 이메일 또는 비밀번호가 있는지 확인

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        # → 이메이로 유저를 조회

        # 비밀번호가 일치 하는지, is_active 상태 확인
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
