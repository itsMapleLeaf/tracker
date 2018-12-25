import { ApolloQueryResult } from "apollo-boost"
import { useContext, useEffect, useState } from "react"
import ApolloClientContext from "./ApolloClientContext"

export function useQuery<Q, V>(query: any, variables: V, deps: unknown[] = []) {
  const client = useContext(ApolloClientContext)
  if (!client) throw new Error("Client not found")

  const [isLoading, setLoading] = useState(true)
  const [result, setResult] = useState<ApolloQueryResult<Q>>()

  useEffect(() => {
    client
      .query<Q, V>({ query, variables })
      .then(setResult)
      .then(() => setLoading(false))
  }, deps)

  return {
    data: result && result.data,
    errors: result && result.errors,
    isLoading,
  }
}
