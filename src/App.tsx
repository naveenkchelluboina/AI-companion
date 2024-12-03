import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Model {
  id: string;
  name: string;
  description: string;
  bestFor: string[];
}

const AVAILABLE_MODELS: Model[] = [
  { 
    id: 'Mistral-Nemo-12B-Instruct-2407', 
    name: 'Mistral Nemo 12B Instruct',
    description: 'A powerful 12B parameter model optimized for instruction following and complex reasoning tasks.',
    bestFor: ['Complex instructions', 'Reasoning tasks', 'Detailed explanations']
  },
  { 
    id: 'Llama-3.1-70B-Saoirse', 
    name: 'Llama 3.1 70B Saoirse',
    description: 'Large 70B parameter model with enhanced capabilities for diverse tasks and multilingual support.',
    bestFor: ['Advanced reasoning', 'Multilingual tasks', 'Creative writing']
  },
  { 
    id: 'Mistral-Nemo-12B-Mahou-1.3', 
    name: 'Mistral Nemo 12B Mahou',
    description: 'Specialized 12B parameter model with improved context understanding and response generation.',
    bestFor: ['Context-aware responses', 'Technical discussions', 'Problem solving']
  },
  { 
    id: 'Meta-Llama-3.1-8B-Instruct', 
    name: 'Llama 3.1 8B Instruct',
    description: 'Efficient 8B parameter model optimized for quick responses and general-purpose tasks.',
    bestFor: ['Quick responses', 'General chat', 'Basic instructions']
  },
  { 
    id: 'Meta-Llama-2-13B-Chat', 
    name: 'Llama 2 13B Chat',
    description: 'Well-balanced 13B parameter model designed for natural conversations and task completion.',
    bestFor: ['Natural dialogue', 'Task assistance', 'Knowledge queries']
  },
  { 
    id: 'Mistral-7B-Instruct-v0.2', 
    name: 'Mistral 7B Instruct v0.2',
    description: 'Compact yet powerful 7B parameter model specialized in following precise instructions.',
    bestFor: ['Structured output', 'Code assistance', 'Precise instructions']
  }
];

const ModelInfo: React.FC<{ model: Model }> = ({ model }) => (
  <div className="model-info-card">
    <h3>{model.name}</h3>
    <p>{model.description}</p>
    <div>
      <strong>Best For:</strong>
      <div className="tag-container">
        {model.bestFor.map((use, index) => (
          <span key={index} className="tag">
            {use}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>(AVAILABLE_MODELS[0].id);

  const selectedModelInfo = AVAILABLE_MODELS.find(model => model.id === selectedModel);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const API_URL = 'https://arli-chat-backend.onrender.com'
      const response = await axios.post(`${API_URL}/api/chat`, {
        messages: newMessages,
        model: selectedModel,
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
    // Split content into blocks (code and text)
    const blocks = content.split('```');
    
    return (
      <div className="message-blocks">
        {blocks.map((block, index) => {
          // Even indices are normal text, odd indices are code blocks
          if (index % 2 === 0) {
            // Handle normal text with markdown-like formatting
            return (
              <div key={index} className="text-block">
                {block.split('\n').map((line, lineIndex) => {
                  // Handle bullet points
                  if (line.trim().startsWith('*')) {
                    return (
                      <div key={lineIndex} className="bullet-point">
                        {line.trim().substring(1)}
                      </div>
                    );
                  }
                  // Handle headers
                  if (line.trim().startsWith('#')) {
                    const matches = line.match(/^#+/);
                    if (matches) {
                      const level = matches[0].length;
                      const text = line.substring(level).trim();
                      return (
                        <div key={lineIndex} className={`header-${level}`}>
                          {text}
                        </div>
                      );
                    }
                  }
                  // Regular text - only render if there's content
                  return line.trim() ? (
                    <div key={lineIndex} className="text-line">{line}</div>
                  ) : null;
                })}
              </div>
            );
          } else {
            // Handle code blocks
            const [language, ...codeLines] = block.trim().split('\n');
            return (
              <div key={index} className="code-block-wrapper">
                <div className="code-header">
                  <span className="code-language">{language || 'text'}</span>
                  <button 
                    className="copy-button"
                    onClick={() => {
                      navigator.clipboard.writeText(codeLines.join('\n'));
                      // Could add a copied confirmation here
                    }}
                  >
                    Copy
                  </button>
                </div>
                <pre className="code-block">
                  <code>{codeLines.join('\n')}</code>
                </pre>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>AI Models</h2>
          <p className="sidebar-subtitle">Choose your AI companion</p>
        </div>
        
        {AVAILABLE_MODELS.map((model) => (
          <div 
            key={model.id}
            className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
            onClick={() => setSelectedModel(model.id)}
          >
            <div className="model-card-header">
              <h3>{model.name}</h3>
              <div className="model-size">
                {model.id.includes('70B') ? '70B' : 
                 model.id.includes('12B') ? '12B' : 
                 model.id.includes('8B') ? '8B' : '7B'}
              </div>
            </div>
            <p className="model-description">{model.description}</p>
            <div className="tag-container">
              {model.bestFor.map((use, index) => (
                <span key={index} className="tag">
                  {use}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        <header className="main-header">
          <h1>AI Programming Assistant</h1>
          <div className="selected-model-info">
            Using: <span>{selectedModelInfo?.name}</span>
          </div>
        </header>

        <div className="chat-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="typing-indicator">
              <div className="typing-animation">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about programming..."
            className="message-input"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className={`send-button ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'Processing...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;