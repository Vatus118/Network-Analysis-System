from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('introduction/', views.introduction, name='introduction'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('profile/', views.profile_view, name='profile'),
    path('users/', views.user_list_view, name='user_list'),
    path('users/<int:user_id>/', views.user_detail_view, name='user_detail'),
]