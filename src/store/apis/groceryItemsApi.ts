import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GroceryItem } from "../../models/GroceryItem";

export const groceryItemsApi = createApi({
    reducerPath: 'groceries',
    tagTypes: ['GroceryItem'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/'
    }),
    endpoints: (builder) => {
        return {
            fetchGroceryItems: builder.query<GroceryItem[], void>({
                providesTags: (result) => result ? 
                    [...result.map((gItem: GroceryItem) => 
                            ({type: 'GroceryItem' as const, id: gItem.id})), {type: 'GroceryItem' as const, id: 'LIST' as const}
                    ]
                    : [{type: 'GroceryItem', id: 'LIST'}],
                query: () => {
                    return {
                        url: 'grocery-items',
                        method: 'GET',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authToken")
                        }
                    }
                }
            }),
            addGroceryItem: builder.mutation<GroceryItem, GroceryItem>({
                invalidatesTags: () => [{type: 'GroceryItem', id: 'LIST'}],
                query: (groceryItem: GroceryItem) => {
                    return {
                        url: 'grocery-items',
                        method: 'POST',
                        body: groceryItem,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authToken")
                        }
                    }
                }
            }),
            deleteGroceryItem: builder.mutation<string, string>({
                invalidatesTags: () => [{type: 'GroceryItem', id: 'LIST'}],
                query: (id: string) => {
                    return{
                        url: 'grocery-items',
                        method: 'DELETE',
                        body: id,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authToken")
                        }
                    }
                }
            }),
            updateGroceryItem: builder.mutation<GroceryItem, GroceryItem>({
                invalidatesTags: () => [{type: 'GroceryItem', id: 'LIST'}],
                query: (groceryItem: GroceryItem) => {
                    return {
                        url: "grocery-items/update",
                        method: "PUT",
                        body: groceryItem,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("authToken")
                        }
                    }
                }
            })
        }
    }
});

export const { useFetchGroceryItemsQuery, useAddGroceryItemMutation, useDeleteGroceryItemMutation, useUpdateGroceryItemMutation } = groceryItemsApi;