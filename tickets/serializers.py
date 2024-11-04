from rest_framework import serializers
from .models import Ticket, Comment

# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'comment', 'created_by', 'created_at']

# Ticket Serializer
class TicketSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    assigned_to = serializers.StringRelatedField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'status', 'created_by', 'assigned_to', 'created_at', 'updated_at', 'comments']