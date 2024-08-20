"use server"

import { API_URL } from "@/lib/api";
import { revalidateTag } from "next/cache";

const deleteWEb = async (id: string, token: string) => {
    try {
      const response = await fetch(`${API_URL}/website/my-website/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
     
      revalidateTag(`website`);
    } catch (error) {
      console.error("Failed to delete the website:", error);
    }
  };

  export {deleteWEb}