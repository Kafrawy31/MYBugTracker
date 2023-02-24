from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name = 'api'),
    path('ticket-list/', views.ticketList, name = 'ticket-list'),
    path('ticket-details/<str:pk>', views.ticketDetails, name = 'ticket-details'),
    path('ticket-create/', views.ticketCreate, name = 'ticket-create'),
    path('ticket-update/<str:pk>', views.ticketUpdate, name = 'ticket-update'),
    path('ticket-delete/<str:pk>', views.ticketDelete, name = 'ticket-delete'),
    path('project-list', views.projectList, name = 'project-list'),
    path('project-details/<str:pk>', views.projectDetails, name = 'project-details'),
    path('project-create/', views.projectCreate, name = 'project-create'),
    path('project-update/<str:pk>', views.projectUpdate, name = 'project-update'),
]
