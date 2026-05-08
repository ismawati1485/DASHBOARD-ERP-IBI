import {
  productionByItem,
  realizationData,
  wastePercentage,
  productionAnalysis,
} from "@/data/production";

export async function getProductionByItem() {
  return productionByItem;
}

export async function getRealizationData() {
  return realizationData;
}

export async function getWastePercentage() {
  return wastePercentage;
}

export async function getProductionAnalysis() {
  return productionAnalysis;
}