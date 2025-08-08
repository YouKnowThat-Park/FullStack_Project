from django.urls import path
from .views import (
    ProductListCreateView,
    ProductRetrieveUpdateDestroyView,
    ProductImageCreateView,
    CategoryListView,
    PublicProductListView
)

urlpatterns = [
    path('', PublicProductListView.as_view(), name='product-public-list'),
    path('<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),
    path('images/', ProductImageCreateView.as_view(), name='product-image-create'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('admin/', ProductListCreateView.as_view(), name='product-admin-list')
]
