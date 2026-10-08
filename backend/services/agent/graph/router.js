import { getModel } from "../config/llmModels"

export const router = async (state) => {
    const llm = await getModel("router")
    const promp = `you are an agent router.

    available agents:

    -chat
    -search
    -coding
    -ppt
    -pdf
    -vision

    Rule:

    chat:
    general conversation,
    explainations,
    learnings,
    questions.

    search:
    current envents,
    latest information,
    news,
    recent developments,
    internet lookup.

    coding:
    generate code,
    debug code,
    build projects,
    architecture,
    API design
    
    pdf:
    questions about generate PDFs
    or document context.

    ppt:
    questions about generate PDFs
    or ppt context.

    vision:
    generate image 
    create image

    return only one word:

    chat
    coding
    search
    pdf
    ppt
    vision

    User Query:
    ${state.prompt}
    `

    const response = await llm.invoke(prompt)
    console.log(response)

    return {
        ...state,
        agent: response.content
            .trim()
            .toLowerCase()
    }
}