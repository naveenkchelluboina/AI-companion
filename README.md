# AI Programming Assistant

A modern web application that provides access to various AI models for programming assistance and code generation. Built with React and TypeScript, featuring a sleek dark theme UI and real-time AI interactions.

![AI Programming Assistant Screenshot](![alt text](image-1.png))

## Features

- 🤖 Multiple AI Model Support
  - Mistral Nemo 12B Instruct
  - Llama 3.1 70B Saoirse
  - Mistral Nemo 12B Mahou
  - And more...

- 💻 Code-Focused Features
  - Syntax highlighted code blocks
  - One-click code copying
  - Multi-language support
  - Smart code formatting

- 🎨 Modern UI/UX
  - Responsive dark theme design
  - Real-time typing indicators
  - Model-specific capabilities display
  - Intuitive model selection

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A backend server running (see [Backend Setup](#backend-setup))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-programming-assistant.git
cd ai-programming-assistant
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_backend_url
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

### Backend Setup

The application requires a backend server that interfaces with the Arli AI API. The backend repository can be found [here](https://github.com/naveenkchelluboina/arli-chat-backend).

## Usage

1. Select an AI model from the sidebar based on your needs:
   - Each model displays its capabilities and best use cases
   - Models are organized by parameter size and specialization

2. Type your programming question or request in the input field
   - Support for natural language queries
   - Code-specific questions
   - Algorithm explanations

3. Receive AI-generated responses with:
   - Syntax-highlighted code
   - Detailed explanations
   - Best practices and suggestions

## Technologies Used

- React
- TypeScript
- Axios for API calls
- CSS3 with custom properties
- Arli AI API integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Arli AI for providing the AI models
- The React community for excellent tools and libraries
- Contributors and testers who helped improve the application

## Contact

Your Name - Naveen Kchelluboina

Project Link: https://github.com/naveenkchelluboina/arli-chat
