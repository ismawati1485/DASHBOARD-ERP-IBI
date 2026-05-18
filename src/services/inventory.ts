const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

// GET INVENTORY LIST
export async function getStockList() {
  try {
    const response = await fetch(
      `${API_URL}/public/inventory?pageSize=100&pageNumber=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch inventory");
    }

    const data = await response.json();

    console.log("Inventory API:", data);

    // sesuaikan kalau response API berbeda
    return data.list || [];
  } catch (error) {
    console.error("Inventory fetch error:", error);
    return [];
  }
}
