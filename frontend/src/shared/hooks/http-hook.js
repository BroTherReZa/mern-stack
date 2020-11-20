import { useCallback, useEffect, useRef } from "react"

export const useHttpClient = () =>{
    const activeHttpRequest = useRef([])

    
    const sendRequest = useCallback( async (
        url,
        method = 'GET',
        body = null,
        headers = {}
    ) => {
        const httpAbortCtrl = new AbortController()
        activeHttpRequest.current.push(httpAbortCtrl)
        try {
            const response = await fetch(url,{
                method : method,
                body : body,
                headers : headers,
                signal : httpAbortCtrl.signal
            })
            const responseData = await response.json()
            activeHttpRequest.current = activeHttpRequest.current.filter(
                i => i !== httpAbortCtrl
            )

            if(!response.ok){
                throw new Error(responseData.message)
            }
            return responseData
        } catch (err) {
            throw err
        }
    },[])
    useEffect(()=>{
        return () => {
            activeHttpRequest.current.forEach(
                i => i.abort()
            )
        }
    },[])
    return { sendRequest }
} 