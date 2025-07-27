import type { GroceryItem } from "../models/GroceryItem";

export const getExpirationStatusText = (expirationDate: Date) => {
    const today = new Date();
 
    const parsedDate = parseDate(expirationDate);
    if(parsedDate){
        const daysUntilExpiration = Math.ceil((parsedDate.getTime() - today.getTime()) / (1000 * 60 * 60* 24));
         
        if(daysUntilExpiration < 0){
            return `Expired ${Math.abs(daysUntilExpiration)} days ago`;
        }else if(daysUntilExpiration === 0){
            return "Expires Today";
        }else if(daysUntilExpiration === 1){
            return "Expires Tomorrow";
        }else{
            return `Expires in ${Math.abs(daysUntilExpiration)} days`;
        }
    }
    return "";
}

export const getBackgroundColorClass = (item: GroceryItem): string => {
     const today = new Date();
     const parsedDate = parseDate(item.expirationDate);
     if(parsedDate) {
        const daysUntilExpiration = Math.ceil((parsedDate.getTime() - today.getTime()) / (1000 * 60 * 60* 24));
     
        if(daysUntilExpiration <= 1){
            return "bg-red-50 border-red-200";
        }else if(daysUntilExpiration <= 7){
            return "bg-yellow-50 border-yellow-200";
        }else{
            return "border-gray-200";
        }
     }

     const {quantity, unit } = item;

     const CRITICAL_LOW_THRESHOLD_DEFAULT = 1;
     const LOW_THRESHOLD_DEFAULT = 3;
     const CRITICAL_LOW_WEIGHT_THRESHOLD_GRAMS = 100;
     const LOW_WEIGHT_THRESHOLD_GRAMS = 500;

     let criticalLow = CRITICAL_LOW_THRESHOLD_DEFAULT;
     let low = LOW_THRESHOLD_DEFAULT;

     if (unit === 'grams' || unit === 'kg' || unit === 'ml' || unit === 'liters') {
        criticalLow = CRITICAL_LOW_WEIGHT_THRESHOLD_GRAMS;
        low = LOW_WEIGHT_THRESHOLD_GRAMS;

        criticalLow /= 1000;
        low /= 1000;
     }

    if (quantity <= criticalLow) {
        return "bg-red-50 border-red-200"; 
    } else if (quantity <= low) {
        return "bg-yellow-50 border-yellow-200"; 
    }else{
        return "border-gray-200";
    }

     return "";
}

const parseDate = (dateish: Date | string | null | undefined): Date | undefined => {
    if (!dateish) {
        return undefined; 
    }
    if (dateish instanceof Date) {
        return dateish;
    }
   
    if (typeof dateish === 'string') {
        const parsed = new Date(dateish);
        if (!isNaN(parsed.getTime())) {
            return parsed;
        }
    }
    return undefined; 
};

