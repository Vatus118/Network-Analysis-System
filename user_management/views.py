from django.shortcuts import render, redirect, get_object_or_404, HttpResponse, render
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import User, UserProfile
from .forms import UserRegistrationForm, UserLoginForm, UserProfileForm, UserUpdateForm

# Create your views here.
def introduction(request):
    if request.method == 'GET':
        return render(request, 'introduction.html')
    elif request.method == 'POST':
        return HttpResponse('Hello World')
    
def register_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "注册成功！")
            return redirect('dashboard')  # 重定向到urls.py中定义的名为“dashboard”的URL模式
    else:  # 若为GET请求，则展示空表单并渲染注册页面
        form = UserRegistrationForm()  # 空表单
    return render(request, 'user_management/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request, request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, "登录成功！")
                return redirect('dashboard')
        else:
            messages.error(request, "登录失败，请检查邮箱和密码。")
    else:
        form = UserLoginForm()
    return render(request, 'user_management/login.html', {'form': form})

@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "你已成功退出登录。")
    return redirect('login')

@login_required
def dashboard_view(request):
    return render(request, 'user_management/dashboard.html')

@login_required
def profile_view(request):
    if request.method == 'POST':
        user_form = UserUpdateForm(request.POST, request.FILES, instance=request.user)
        profile_form = UserProfileForm(request.POST, instance=request.user.profile)
        
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, "个人资料已更新！")
            return redirect('profile')
    else:
        user_form = UserUpdateForm(instance=request.user)
        profile_form = UserProfileForm(instance=request.user.profile)
    
    context = {
        'user_form': user_form,
        'profile_form': profile_form
    }
    return render(request, 'user_management/profile.html', context)

@login_required
def user_list_view(request):
    users = User.objects.all()
    return render(request, 'user_management/user_list.html', {'users': users})

@login_required
def user_detail_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'user_management/user_detail.html', {'user': user})


