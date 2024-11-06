import React, { useState } from 'react';
import { Avatar, Button, TextField, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import '../css/messaging.css';

export default function MessagingPage() {
    // Mock data for contacts and messages
    const contacts = [
        { id: 1, name: 'Prince Chaudhari', avatar: '/path/to/avatar1.jpg', lastMessage: 'Hey, how are you?' },
        { id: 2, name: 'Bhavik Soni', avatar: '/path/to/avatar2.jpg', lastMessage: 'Can you send me the details?' },
        { id: 3, name: 'Nikhilesh Varma', avatar: '/path/to/avatar3.jpg', lastMessage: 'Let’s catch up tomorrow!' }
    ];

    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [messages, setMessages] = useState([
        { from: 'Prince Chaudhari', content: 'Hey, how are you?' },
        { from: 'You', content: 'I am good, what about you?' }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { from: 'You', content: newMessage }]);
            setNewMessage('');
        }
    };

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        setMessages([ // Update the messages for the selected contact
            { from: contact.name, content: contact.lastMessage },
            { from: 'You', content: 'This is a mock chat with ' + contact.name }
        ]);
    };

    return (
        <div className='messaging-page'>
            {/* Left Column - Contact List */}
            <div className='messaging-page__contact-list'>
                <h3>Messaging</h3>
                {contacts.map(contact => (
                    <div 
                        key={contact.id} 
                        className={`contact ${selectedContact.id === contact.id ? 'active' : ''}`}
                        onClick={() => handleSelectContact(contact)}
                    >
                        <Avatar src={contact.avatar} className='contact__avatar' />
                        <div className='contact__details'>
                            <h4 className='contact__name'>{contact.name}</h4>
                            <p className='contact__last-message'>{contact.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column - Chat Window */}
            <div className='messaging-page__chat-window'>
                <div className='chat-header'>
                    <Avatar src={selectedContact.avatar} className='chat-header__avatar' />
                    <h4 className='chat-header__name'>{selectedContact.name}</h4>
                </div>

                <div className='chat-body'>
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`chat-message ${message.from === 'You' ? 'chat-message--sent' : 'chat-message--received'}`}
                        >
                            <p>{message.content}</p>
                        </div>
                    ))}
                </div>

                <div className='chat-input'>
                    <TextField 
                        fullWidth 
                        placeholder='Type a message...' 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <IconButton color='primary' onClick={handleSendMessage}>
                        <Send />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
