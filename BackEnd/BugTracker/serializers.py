from rest_framework import serializers
from .models import *

class TicketSerializer(serializers.ModelSerializer):
    TicketProject = serializers.StringRelatedField()
    ticketassignedto = serializers.StringRelatedField()
    TicketSubmittedBy = serializers.StringRelatedField()
    class Meta:
        model = Ticket
        fields = '__all__'
        
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
        