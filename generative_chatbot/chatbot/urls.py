# chatbot/urls.py
from django.urls import path
from .views import chatbot_view,chat_page

urlpatterns = [
    path('chatbot/', chatbot_view, name='chatbot'),
    path('', chat_page),  # Renders the chat page
]

