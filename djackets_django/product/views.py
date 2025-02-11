from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


class LatestProductsList(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class ProductDetail(APIView):
    def get_object(self, category_slug, product_slug):
        return get_object_or_404(Product, category__slug=category_slug, slug=product_slug)

    def get(self, request, category_slug, product_slug, format=None):
        product = self.get_object(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
