from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Ticket, Comment
from .serializers import TicketSerializer, CommentSerializer

# List all tickets and create new ones
class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Automatically associate the logged-in user with the ticket creation
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Retrieve, Update, and Delete a single ticket
class TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Only allow users to update tickets they created
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.created_by != request.user:
            return Response({"detail": "You do not have permission to edit this ticket."}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    # Only allow users to delete tickets they created
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.created_by != request.user:
            return Response({"detail": "You do not have permission to delete this ticket."}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

# Create a comment for a specific ticket
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            ticket = Ticket.objects.get(pk=self.kwargs['ticket_id'])
        except Ticket.DoesNotExist:
            raise NotFound(detail="Ticket not found.")
        serializer.save(created_by=self.request.user, ticket=ticket)