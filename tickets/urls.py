from django.urls import path
from . import views

urlpatterns = [
    # List all tickets and create a new one
    path('tickets/', views.TicketListCreateView.as_view(), name='ticket-list'),
    
    # Retrieve, update, or delete a single ticket
    path('tickets/<int:pk>/', views.TicketDetailView.as_view(), name='ticket-detail'),
    
    # Create a comment for a specific ticket
    path('tickets/<int:ticket_id>/comment/', views.CommentCreateView.as_view(), name='ticket-comment'),
    
    # Update ticket status
    path('tickets/<int:pk>/status/', views.TicketStatusUpdateView.as_view(), name='ticket-status-update'),
    
    # Update a comment
    path('comments/<int:pk>/', views.CommentUpdateView.as_view(), name='comment-update'),
    
    # Delete a comment
    path('comments/<int:pk>/delete/', views.CommentDeleteView.as_view(), name='comment-delete'),
    


    path('tickets/<int:pk>/assigned_to/', views.Ticket_Assign_To_UpdateView.as_view(), name='assigned_to'),
    # path('tickets/<int:pk>/assign/', views.TicketAssignmentView.as_view(), name='ticket-assign'),
    
    
]