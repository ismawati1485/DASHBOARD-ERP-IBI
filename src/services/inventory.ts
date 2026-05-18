import axios from "axios";

export async function getStockList(
  page = 1,
  limit = 50,
  search = ""
) {
  const res = await axios.get(
    "http://localhost:3000/inventory",
    {
      params: {
        page,
        limit,
        search,
      },
    }
  );

  return res.data;
}