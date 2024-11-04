from rest_framework import serializers
from .models import Ticket, Comment



# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    ticket = serializers.PrimaryKeyRelatedField(queryset=Ticket.objects.all(), write_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'created_by', 'ticket', 'created_at']

    def create(self, validated_data):
        # Automatically associate the comment with the ticket and user from the view logic
        ticket = validated_data.pop('ticket')
        comment = Comment.objects.create(ticket=ticket, **validated_data)
        return comment
# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'comment', 'created_by', 'created_at']



class TicketSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    assigned_to = serializers.ChoiceField(choices=Ticket.ROLE_CHOICES, required=True, allow_null=False)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'status', 'created_by', 'assigned_to', 'created_at', 'updated_at', 'comments']

    def validate(self, data):
        print("Validating data:", data)  # Debug log
        return data