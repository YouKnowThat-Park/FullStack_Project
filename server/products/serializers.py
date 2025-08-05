from rest_framework import serializers
from .models import Product, ProductImage, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductImageSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        queryset = Product.objects.all(),
        source = "product",
        write_only = True,
        required = True
    )
    class Meta:
        model = ProductImage
        fields= ['id', 'image', 'product_id']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source = 'category',
        write_only=True
    )
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'discount_price',
            'stock', 'sold_count', 'rating', 'category', 'category_id',
            'is_active', 'created_at', 'updated_at', 'admin_user', 'images'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'sold_count']

class PublicProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        exclude = ['admin_user'] 