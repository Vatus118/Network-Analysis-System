from django.shortcuts import render, HttpResponse, render

# Create your views here.
def index(request):
    return HttpResponse('Hello World')

def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        need = request.POST.get('need')
        print(name, email, need)
        return HttpResponse('Hello World')
    
def introduction(request):
    if request.method == 'GET':
        return render(request, 'introduction.html')
    elif request.method == 'POST':
        return HttpResponse('Hello World')
