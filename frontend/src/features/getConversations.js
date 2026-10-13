import api from "../utils/axios.js"

export const getConversation = async () => {
    try {
        const { data } = await api.get("/api/chat/get-conversations")
        console.log(data)
        return data
    } catch (error) {
        "Failed to fetch conversations:",
            error.response?.data || error.message
        throw error;
    }
}