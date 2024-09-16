export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
  
    const response = await fetch(url, {
      ...options,
      headers: { ...headers },
    });
  
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.error || 'Network response was not ok.');
    }
  
    return response;
  };
  