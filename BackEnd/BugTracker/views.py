from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response 
from .models import *
from .serializers import *

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List' : '/ticket-list/',
        'Details' : '/ticket-details/<str:pk>',
        'Create' : '/ticket-create/',
        'Update' : '/ticket-update/<str:pk>',
        'Delete' : '/ticket-delete/<str:pk>',
    }
    
    
    return Response(api_urls)


@api_view(['GET'])
def ticketList(request):
    Tickets = Ticket.objects.all()
    serializer = TicketSerializer(Tickets, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def ticketDetails(request,pk):
    Tickets = Ticket.objects.get(TicketId=pk)
    serializer = TicketSerializer(Tickets, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def ticketCreate(request):
    serializer = TicketSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def ticketUpdate(request,pk):
    ticket = Ticket.objects.get(TicketId=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def ticketDelete(request,pk):
    ticket = Ticket.objects.get(TicketId=pk)
    ticket.delete()
    
    return Response("ITEM DELETED SUCCESSFULY")


@api_view(['GET'])
def projectList(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def projectDetails(request,pk):
    projects = Project.objects.get(ProjectId=pk)
    serializer = ProjectSerializer(projects, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def projectCreate(request):
    serializer = ProjectSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)


@api_view(['POST'])
def projectUpdate(request,pk):
    project = Project.objects.get(ProjectId=pk)
    serializer = TicketSerializer(instance=project, data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)