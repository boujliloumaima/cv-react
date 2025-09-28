type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  customErrorMessages?: {
    [status: number]: string;
    default?: string;
  };
};

export async function handleApiRequest<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    customErrorMessages = {},
  } = options;

  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const config: RequestInit = {
      method,
      headers: defaultHeaders,
      credentials: 'include' as const,
    };

    if (body && method !== 'GET' && method !== 'HEAD') {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    let responseData;

    // Try to parse JSON, but handle cases where response might not be JSON
    try {
      responseData = await response.text();
      responseData = responseData ? JSON.parse(responseData) : {};
    } catch (e) {
      // If JSON parsing fails, use an empty object
      responseData = {};
    }

    if (!response.ok) {
      const status = response.status;
      let errorMessage = customErrorMessages[status] || 
                        getDefaultErrorMessage(status) ||
                        responseData?.error ||
                        'An unexpected error occurred';

      return { error: errorMessage };
    }

    return responseData;
  } catch (error: any) {
    console.error('API request failed:', error);
    
    let errorMessage = 'An unexpected error occurred';
    
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }
}

function getDefaultErrorMessage(status: number): string {
  const errorMessages: { [key: number]: string } = {
    400: 'Invalid request data',
    401: 'Please log in to continue',
    403: 'You do not have permission to perform this action',
    404: 'The requested resource was not found',
    409: 'A conflict occurred with the current state of the resource',
    422: 'Validation failed for the request',
    429: 'Too many requests. Please try again later',
    500: 'An internal server error occurred',
    502: 'Bad gateway',
    503: 'Service unavailable',
    504: 'Gateway timeout',
  };

  return errorMessages[status] || 'An unexpected error occurred';
}

export const withApiErrorHandling = <T extends any[], R>(
  fn: (...args: T) => Promise<ApiResponse<R>>,
  customErrorMessages: { [key: string]: string } = {}
) => {
  return async (...args: T): Promise<ApiResponse<R>> => {
    try {
      return await fn(...args);
    } catch (error: any) {
      console.error('API operation failed:', error);
      
      let errorMessage = 'An unexpected error occurred';
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        errorMessage = customErrorMessages.network || 'Unable to connect to the server';
      } else if (error.status && customErrorMessages[error.status]) {
        errorMessage = customErrorMessages[error.status];
      } else if (error.message) {
        errorMessage = error.message;
      }

      return { error: errorMessage };
    }
  };
};
