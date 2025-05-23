const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error');
    throw new ApiError(response.status, error);
  }
  return response.json();
}

export async function post<T>(endpoint: string, data: any): Promise<T> {
  console.log('Making POST request to:', `${API_BASE_URL}${endpoint}`);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export async function get<T>(endpoint: string): Promise<T> {
  console.log('Making GET request to:', `${API_BASE_URL}${endpoint}`);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return handleResponse<T>(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 