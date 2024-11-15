// Function to toggle chat window visibility
function toggleChat() {
    console.log("Chat icon clicked"); // Check if this logs to the console
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'block'; // Show chat window
    } else {
        chatWindow.style.display = 'none'; // Hide chat window
    }
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('message');
    const messageText = messageInput.value.trim(); // Get message and trim whitespace

    if (messageText === '') return; // Prevent sending empty messages

    // Display user's message
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML += `<div class="user-message"><p><strong>You:</strong> ${messageText}</p></div>`;
    messageInput.value = ''; // Clear input field

    // Send message to the server for chatbot response
    fetch('/chatbot/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: messageText }) // Send the message as JSON
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.response) {
            // Split response into lines and display each line separately
            const responseLines = data.response.split('\n');
            responseLines.forEach(line => {
                chatMessages.innerHTML += `<div class="bot-message"><p><strong>Chatbot:</strong> ${line}</p></div>`;
            });
        } 
        //else {
            // Handle error response
        //    chatMessages.innerHTML += `<div class="bot-message"><p><strong>Chatbot:</strong> An error occurred. Please try again.</p></div>`;
       // }
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom of the chat
    })
    .catch(error => {
        console.error('Error:', error);
        chatMessages.innerHTML += `<div class="bot-message"><p><strong>Chatbot:</strong> An error occurred. Please try again.</p></div>`;
    });
}
