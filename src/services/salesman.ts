const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export async function getSalesman() {
  try {
    const response = await fetch(
      `${API_URL}/public/salesman?pageSize=100&pageNumber=1`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const data = await response.json();

    return data.list || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}