from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=30)
    # → CharField은 짧은 문자열에 사용 (max_length 같은 길이 제한 필수, 저는 최대 30자로 제한)
    description = models.TextField()
    # → TextField은 긴 문자열에 사용 (길이 제한 없음)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    # → DecimalField은 정확한 소숫점을 저장
    # → float 보다 정밀 float는 계산 식에 적합하지 않음
    # → max_digits 허용되는 최대 자릿수
    # → decimal_places는 소숫점 이하 자릿수
    discount_price = models.DecimalField(max_digits=10, decimal_places=0, null=True)
    # → DecimalField은 정확한 소숫점을 저장
    stock = models.PositiveIntegerField()
    # → PositiveIntegerField는 0 이상의 정수만 저장
    sold_count = models.PositiveIntegerField(default=0)
    # → PositiveIntegerField는 0 이상의 정수만 저장 (기본값는 0으로 명시)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    # → DecimalField은 정확한 소숫점을 저장
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    # → ForeignKey는 1 : N / 다른 모델과 관계 설정(Category 모델에 관계를 설정 했음)
    # → N : N / 관계를 설정할땐 ManyToManyField 사용 
    # → 연결된 Category모델이 삭제 될 경우 카테고리 필드를 null로 대체
    is_active = models.BooleanField(default=True)
    # → True 또는 False 값 (기본값은 진실!)
    created_at = models.DateTimeField(auto_now_add=True)
    # → DateTimeField는 날짜와 시간을 저장하는 필드
    # → 생성 시 자동으로 현재 시간 저장
    updated_at = models.DateTimeField(auto_now=True)
    # → DateTimeField는 날짜와 시간을 저장하는 필드
    # → 저장될 때마다 자동으로 시간 갱신
    admin_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True) 
    # → ForeignKey는 1 : N / 다른 모델과 관계 설정(settings에서 AUTH_USER_MODEL에 연결)
    # → 상품을 등록한 관리자가 누구인지 저장, 관리자가 삭제 되면 null로 대체

    def __str__(self):
        return self.name
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    # → ForeignKey는 1 : N / 다른 모델과 관계 설정(Product 모델에 관계를 설정 했음)
    # → on_delete=models.CASCADE : 열견 된 부모 모델이 삭제될 때 해망 모델도 삭제하게 연결
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"{self.Product.name} - 이미지"