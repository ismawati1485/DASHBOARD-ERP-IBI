const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export async function getSalesInvoices() {
  try {
    const response = await fetch(
      `${API_URL}/public/salesInvoice?pageSize=100&pageNumber=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed fetch sales invoice");
    }

    const result = await response.json();

    console.log("SALES INVOICE:", result);

    return result.list || [];
  } catch (error) {
    console.error("Sales Invoice Error:", error);
    return [];
  }
}