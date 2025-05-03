const API_URL = "https://api.escuelajs.co/api/v1";

export const fetchProducts = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}/products?limit=12`);

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};
