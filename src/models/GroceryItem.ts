export interface GroceryItem {
    id?: string;
    name: string;
    quantity: number;
    category: string;
    unit: string;
    expirationDate?: Date
}