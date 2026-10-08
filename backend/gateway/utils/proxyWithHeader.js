import proxy from "express-http-proxy"

export const proxyWithHeader = (serverUrl)=>{
    return proxy (serverUrl, {
        proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
            if(srcReq.user){
                proxyReqOpts.headers["x-user-id"] = srcReq.user.userId
            }
        }
    })
}
