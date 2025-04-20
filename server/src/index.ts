import express from 'express';
import cors from 'cors';
import * as fal from '@fal-ai/serverless-client';
import dotenv from 'dotenv';

dotenv.config();

// Type definitions
interface FalImage {
  url: string;
}

interface FalResponse {
  images: FalImage[];
  seed: number;
}

const app = express();
const port = process.env.PORT || 5001;

// Initialize Fal client
fal.config({
  credentials: process.env.FAL_AI_KEY,
});

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS ? 
  process.env.ALLOWED_ORIGINS.split(',') : 
  ['http://localhost:5175'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Your LoRA weights URL
const LORA_WEIGHTS_URL = "https://storage.googleapis.com/fal-flux-lora/825eff51241f4086bbf98e32e564c51d_pytorch_lora_weights.safetensors";

// Model info endpoint
app.get('/api/model-info', (req, res) => {
  res.json({
    name: "Stable Diffusion XL",
    description: "A state-of-the-art text-to-image model",
    parameters: [
      {
        name: "prompt",
        description: "Text prompt for image generation",
        type: "string",
        required: true
      },
      {
        name: "negativePrompt",
        description: "Text that the model should avoid",
        type: "string",
        required: false
      },
      {
        name: "numInferenceSteps",
        description: "Number of denoising steps",
        type: "number",
        default: 50,
        min: 1,
        max: 150
      },
      {
        name: "guidanceScale",
        description: "How closely to follow the prompt",
        type: "number",
        default: 7.5,
        min: 1,
        max: 20
      }
    ]
  });
});

// Generate image endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    if (!process.env.FAL_AI_KEY) {
      throw new Error('FAL_AI_KEY is not set');
    }

    const result: FalResponse = await fal.run('fal-ai/flux-lora', {
      input: {
        loras: [{
          path: "https://storage.googleapis.com/fal-flux-lora/825eff51241f4086bbf98e32e564c51d_pytorch_lora_weights.safetensors",
          scale: 1
        }],
        prompt: req.body.prompt,
        embeddings: [],
        model_name: null,
        num_images: 2,
        enable_safety_checker: true
      },
    });

    if (!result || !result.images || result.images.length === 0) {
      throw new Error("No image generated");
    }

    res.json({
      images: result.images.map((img: FalImage) => img.url),
      seed: result.seed
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      message: "Failed to generate image",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 