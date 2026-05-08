export type CompanyId =
  | "ibi1"
  | "ibi2"
  | "sak"
  | "msg"
  | "abm"
  | "bkj"
  | "ttet"
  | "sapt"
  | "alp"
  | "k710"
  | "k410"
  | "bck"
  | "tritan"
  | "mkm"
  | "palopo"
  | "kendari"
  | "tania"
  | "all";

export type Company = {
  id: CompanyId;
  name: string;
};

export const companies: Company[] = [
  { id: "all", name: "All Company" },
  { id: "ibi1", name: "IBI 1 (Margomulyo)" },
  { id: "ibi2", name: "IBI 2 (Bringkang)" },
  { id: "sak", name: "PT Setia Adi Kencana" },
  { id: "msg", name: "PT Manna Sejahtera Galvalum" },
  { id: "abm", name: "PT Anugrah Bajatama Manunggal" },
  { id: "bkj", name: "PT Berkat Karunia Jaya" },
  { id: "ttet", name: "PT Tri Tunggal Eka Tania" },
  { id: "sapt", name: "PT Sukses Asa Perkasa Timur" },
  { id: "alp", name: "PT Adhikari Limas Paraduta" },
  { id: "k710", name: "PT Kania Pilar Kokoh Sejahtera" },
  { id: "k410", name: "PT ABM K410" },
  { id: "bck", name: "PT Bina Cakra Kencana" },
  { id: "tritan", name: "CV Tritan" },
  { id: "mkm", name: "PT Maju Karya Menggala" },
  { id: "palopo", name: "PT BKJ Palopo" },
  { id: "kendari", name: "PT BKJ Kendari" },
  { id: "tania", name: "Tania Diyorejo" },
];