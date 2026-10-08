import { getModel } from "../config/llmModels"

export const  chatAgent=async (state)=>{
    const llm = await getModel("chat")
    const systemPrompt = "you are RAVION, an intelligent ai assistant"
    const response= await llm.invoke([
        {
            "role": "system",
            "content" : "systemPrompt"
        },
        {
            "role": "user",
            "content" : state.prompt
        }
    ]
        
    )

    return {
        ...state,
        aiResponse:response.content
    }

}