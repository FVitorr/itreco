import api from "./api"

export async function getCategory() {
    return await api.get("/category").data;
}
