from django.urls import path
from . import views

urlpatterns = [
    # List all tickets and create a new one
    path('tickets/', views.TicketListCreateView.as_view(), name='ticket-list'),
    
    # Retrieve, update, or delete a single ticket
    path('tickets/<int:pk>/', views.TicketDetailView.as_view(), name='ticket-detail'),
    
    # Create a comment for a specific ticket
    path('tickets/<int:ticket_id>/comment/', views.CommentCreateView.as_view(), name='ticket-comment'),
]