export async function getInventories() {
  try {

    const response = await fetch(
      "http://localhost:3000/inventory?page=1&limit=20"
    );

    const data = await response.json();

    return data.data || [];

  } catch (err) {
    console.error(err);
    return [];
  }
}