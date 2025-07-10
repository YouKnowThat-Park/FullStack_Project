from django.urls import path
from .views import RegisterView, UserDetailView, UserUpdateView 

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('profile/', UserDetailView.as_view(), name='user-profile'),
    path('change/', UserUpdateView.as_view(), name='user-update')
]
