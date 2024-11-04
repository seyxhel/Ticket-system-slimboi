from django.db import models
from django.contrib.auth.models import User

class Ticket(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('closed', 'Closed'),
    ]
    
    ROLE_CHOICES = [
        ('commercial', 'Commercial'),
        ('technical_support', 'Technical Support'),
        ('legal_support', 'Legal Support'),
        ('second_line_support', '2nd Line Support'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_by = models.ForeignKey(User, related_name='tickets', on_delete=models.CASCADE)
    assigned_to = models.CharField(max_length=50, choices=ROLE_CHOICES, null=True, blank=True)  # Use CharField for assigned roles
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    ticket = models.ForeignKey(Ticket, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField()
    created_by = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.created_by.username} on {self.ticket.title}'