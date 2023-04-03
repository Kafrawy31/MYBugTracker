from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response 
from .models import *
from .serializers import *
from rest_framework import generics,filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List' : '/ticket-list/',
        'TicketDetails' : '/ticket-details/<str:pk>',
        'TicketCreate' : '/ticket-create/',
        'TicketUpdate' : '/ticket-update/<str:pk>',
        'TicketDelete' : '/ticket-delete/<str:pk>',
        'ProjectList' : '/project-list',
        'ProjectDetails' : '/project-details/<str:pk>',
        'ProjectCreate' : '/project-create',
        'ProjectUpdate' : '/project-update/<str:pk>',
        'Token' : '/token',
        'TokenRefresh' : '/token/refresh',
    }
    
    
    return Response(api_urls)



class ticketList(generics.ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['TicketProject__ProjectName',
                     'TicketId',
                     'TicketDescription',
                     'TicketPriority',
                     'TicketPoints',
                     'TicketStatus',
                     'TicketSubmittedBy__username',
                     'TicketAssignedTo__username'
                     ]
    ordering = ['TicketDateOpened']
    


@api_view(['GET'])
def ticketDetails(request,pk):
    Tickets = Ticket.objects.get(TicketId=pk)
    serializer = TicketSerializer(Tickets, many=False)
    return Response(serializer.data)


# class userList(generics.ListAPIView):
#     queryset
    
    

@api_view(['POST'])
def ticketCreate(request):
    serializer = TicketSerializerPost(data=request.data)
    
    if serializer.is_valid(): 
        serializer.save()
    
    return Response(serializer.data)

@api_view(['PATCH'])
def ticketUpdate(request,pk):
    ticket = Ticket.objects.get(TicketId=pk)
    serializer = TicketSerializerPost(instance=ticket, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['DELETE'])
def ticketDelete(request,pk):
    ticket = Ticket.objects.get(TicketId=pk)
    ticket.delete()
    
    return Response("ITEM DELETED SUCCESSFULY")


class projectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['ProjectId',
                     'ProjectName',
                     'ProjectDescription',
                     'ProjectStatus'
                     ]


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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def DevUserDetails(request,pk):
    devUser = DevUser.objects.get(user=pk)
    serializer = DevUserSerializer(devUser, many = False)
    return Response(serializer.data)
    