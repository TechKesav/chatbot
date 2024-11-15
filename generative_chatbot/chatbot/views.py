# chatbot/views.py
import google.generativeai as ai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import json

# API Key for Gemini AI (replace with your actual key)
API_KEY = 'AIzaSyCjdyDhgzzb90DwvSFPTt2wlU5yNyyFmew'
ai.configure(api_key=API_KEY)

# Start the conversation with the Gemini model
model = ai.GenerativeModel("gemini-pro")
chat = model.start_chat()

@csrf_exempt  # To allow POST requests without CSRF tokens
def chatbot_view(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            message = body.get('message', '')

            if message.lower() == 'bye':
                return JsonResponse({'response': 'Goodbye!'})

            # Send message to Gemini model
            response = chat.send_message(message)
            return JsonResponse({'response': response.text})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST requests are allowed'}, status=400)

# View to render the chat page
def chat_page(request):
    return render(request, 'chat.html')
