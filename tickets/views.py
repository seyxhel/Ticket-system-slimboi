from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Ticket, Comment 
from .serializers import TicketSerializer, CommentSerializer

from rest_framework.views import APIView

from rest_framework import status, permissions


class TicketStatusUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, *args, **kwargs):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response({"detail": "Ticket not found."}, status=status.HTTP_404_NOT_FOUND)

        if 'status' in request.data:
            ticket.status = request.data['status']
            ticket.save()
            return Response({"detail": "Status updated."}, status=status.HTTP_200_OK)

        return Response({"detail": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST)

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

# Update a comment
class CommentUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(created_by=self.request.user)

# Delete a comment
class CommentDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(created_by=self.request.user)
    
    


class Ticket_Assign_To_UpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, *args, **kwargs):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response({"detail": "Ticket not found."}, status=status.HTTP_404_NOT_FOUND)

        if 'assigned_to' in request.data:
            ticket.assigned_to = request.data['assigned_to']
            ticket.save()
            return Response({"detail": "Assigned to updated."}, status=status.HTTP_200_OK)

        return Response({"detail": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST)