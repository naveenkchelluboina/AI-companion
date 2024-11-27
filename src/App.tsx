import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const API_URL = 'https://chilakhbhaibackend.netlify.app'
      // || 'http://localhost:5001';
      console.log("test abc", newMessages )
      const response = await axios.post(`${API_URL}/api/chat`, {
        messages: newMessages,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.reply,
      };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split('\n').map((line, index) => {
      // Render code blocks
      if (line.includes('```')) {
        const codeStart = line.indexOf('```') + 3;
        const codeEnd = line.lastIndexOf('```');
        const code = line.substring(codeStart, codeEnd).trim();
        return (
          <pre
            key={index}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '8px',
              overflowX: 'auto',
            }}
          >
            <code>{code}</code>
          </pre>
        );
      }

      // Render bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index}>
            {parts.map((part, idx) =>
              idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
            )}
          </p>
        );
      }

      // Render links
      if (line.includes('http')) {
        const match = line.match(/$begin:math:display$(.*?)$end:math:display$$begin:math:text$(.*?)$end:math:text$/);
        if (match) {
          const [, text, url] = match;
          return (
            <p key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            </p>
          );
        }
      }

      // Render lists
      if (line.startsWith('*')) {
        return (
          <li key={index} style={{ marginLeft: '20px' }}>
            {line.replace(/^\*\s*/, '')}
          </li>
        );
      }

      // Default to paragraph
      return <p key={index}>{line}</p>;
    });

    return <div>{lines}</div>;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Chilakh Bhai AI</h1>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          maxHeight: '400px',
          overflowY: 'auto',
          marginBottom: '10px',
          backgroundColor: '#fafafa',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === 'user' ? 'right' : 'left',
              margin: '10px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: msg.role === 'user' ? '#d1e7dd' : '#f8d7da',
                color: '#000',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                textAlign: 'left',
              }}
            >
              {renderMessageContent(msg.content)}
            </span>
          </div>
        ))}
        {loading && <div style={{ textAlign: 'center' }}>Typing...</div>}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message..."
        style={{
          width: 'calc(100% - 100px)',
          padding: '10px',
          marginRight: '10px',
        }}
      />
      <button
        onClick={handleSendMessage}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
};

export default App;