from django.urls import path
from ttt_app import views

urlpatterns = [
    path('single/', views.single, name='single'),
    path('multi/', views.multi, name='multi'),
    path('<int:id>/cell/', views.cell, name='cell'),
]
