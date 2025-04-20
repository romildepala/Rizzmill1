# RizzMill

A web application that generates images using the Fal AI API with a custom LoRA model.

## Features

- Text-to-image generation using Stable Diffusion XL
- Custom LoRA model integration
- Real-time image preview
- Modern React frontend with Tailwind CSS
- Express.js backend with TypeScript

## Project Structure

- `/client` - React frontend built with Vite
- `/server` - Express.js backend with TypeScript

## Setup

### Prerequisites

- Node.js 16+ and npm
- A Fal AI API key

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your Fal AI API key to the `.env` file

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- Frontend runs on `http://localhost:5175`
- Backend runs on `http://localhost:5001`

## License

MIT 