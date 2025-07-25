from django.urls import path
from .views import (
    ProductListCreateView,
    ProductRetrieveUpdateDestroyView,
    ProductImageCreateView,
    CategoryListView
)

urlpatterns = [
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),
    path('products/images/', ProductImageCreateView.as_view(), name='product-image-create'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
]
