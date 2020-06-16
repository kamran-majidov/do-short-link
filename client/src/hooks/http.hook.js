import {useCallback, useState} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const request = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            console.log(method)
            setLoading(true)
            try {
                if(body){
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }
                const response = await fetch(url, {method, body, headers})
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message || 'Error')
                }
                setLoading(false)
                return data
            } catch (error) {
                setErrors(error.message)
                setLoading(false)
                console.log(error)
            }
        }, [])

    const clearErrors = () => setErrors(null)

    return {loading, request, errors, clearErrors}
}