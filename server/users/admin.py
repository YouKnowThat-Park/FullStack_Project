from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from users.models import User

# Django 관리자에 User 모델 등록
@admin.register(User)

# UserAdmin은 BaseUserAdmin을 커스터마이징한 클래스
class UserAdmin(BaseUserAdmin):
    model = User
    # → 어떤 모델을 관리할지 지정 여기선 User 모델을 관리
    list_display = ('email', 'name', 'phone_number', 'birth_date', 'is_active', 'is_staff', 'is_suspended', 'suspended_until')
    # → 사용자 정보 리스트? 칼럼 표시
    search_fields = ('email', 'name', 'phone_number')
    # → 관리자 페이지에서 검색 가능한 필드 // 언제까지 하나씩 찾아볼꺼야!?
    ordering = ('email',)
    # → 이메일 기준으로 오름차순!

    # 사용자 수정 화면에 어떤 필드를 놓을지, 어떤 그룹으로 나눌지
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('개인 정보', {'fields': ('name', 'phone_number', 'birth_date')}),
        ('정지 상태', {'fields': ('is_suspended', 'suspended_until')}), 
        ('권한', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    # DB, 관리자 페이지에서 계정을 만들때 어떤 폼을 보여줄지 설정 (프론트엔드 UI에서 가입하는게 아님!)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'phone_number', 'birth_date', 'password1', 'password2', 'is_suspended', 'suspended_until'),
        }),
    )
