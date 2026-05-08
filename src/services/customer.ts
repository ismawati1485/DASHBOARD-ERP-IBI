import {
  topCustomers,
  customerSegments,
} from "@/data/customer";

export async function getCustomerDashboard() {
  return {
    topCustomers,
    customerSegments,
  };
}