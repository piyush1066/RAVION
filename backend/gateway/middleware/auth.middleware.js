import redis from "../../shared/redis.js"

const protect = async (req,res,next) => {
    try {
        const sessionId = req.cookies?.session
        if(!session){
            return res.status(400).json({message:"Unauthorized!!"})
        }
        const data= await redis.get(`session-${sessionId}`);
        if(!session){
            return res.status(400).json({message:"session expired"})
        }

        req.user= JSON.parse(data)

    } catch (error) {
        return res.status(500).json({message:"Protect error!!"})
    }
}

export default protect