import { ApolloQueryResult } from "apollo-boost"
import { useContext, useEffect, useState } from "react"
import ApolloClientContext from "./ApolloClientContext"

export function useQuery<T = { [key: string]: any }>(
  query: any,
  variables: any = {},
) {
  const client = useContext(ApolloClientContext)
  if (!client) throw new Error("Client not found")

  const [isLoading, setLoading] = useState(true)
  const [result, setResult] = useState<ApolloQueryResult<T>>()

  useEffect(() => {
    client
      .query<T>({ query, variables })
      .then(setResult)
      .then(() => setLoading(false))
  }, [])

  return {
    data: result && result.data,
    error: result && result.errors,
    isLoading,
  }
}
