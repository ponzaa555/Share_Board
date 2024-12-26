
import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutation: any) => {
    const [isLoading, setIsLoading] = useState(false)
    const apiMutation = useMutation(mutation)

    const mutate = (payload : any) =>{
        setIsLoading(true)
        // return response Api
        return apiMutation(payload)
        .finally(() => setIsLoading(false))
        .then((resualt) => {
            return resualt
        })
        .catch((error) => {
            console.error(error)
            throw error
        })
    }

    return {mutate, isLoading}
}