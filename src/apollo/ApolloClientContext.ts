import { ApolloClient } from "apollo-boost"
import React from "react"

export default React.createContext<ApolloClient<any>>()
