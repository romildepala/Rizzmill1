import { useState } from 'react';
import { GenerationResult, generateImage } from '../lib/model-service';
import { Spinner } from '../components/ui/spinner';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateImage(prompt);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Generate Images</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-24 px-3 py-2 border rounded-md"
            placeholder="Describe what you want to generate..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Spinner className="text-white" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Result</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.images.map((url, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={url}
                  alt={`Generated image ${index + 1}`}
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-600">Seed: {result.seed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 