import proxy from "express-http-proxy"

export const proxyWithHeader = (serverUrl) => {
    return proxy(serverUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {

            proxyReqOpts.headers = proxyReqOpts.headers || {}

            if (srcReq.user) {
                proxyReqOpts.headers["x-user-id"] = srcReq.user.userId
            }

            return proxyReqOpts
        }
    })
}