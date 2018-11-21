from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return render(request, 'ttt_app/index.html')

def single(request):
    return render(request, 'ttt_app/single.html')

def multi(request):
    return render(request, 'ttt_app/multi.html')

def cell(request, id):
    return HttpResponse(id)
