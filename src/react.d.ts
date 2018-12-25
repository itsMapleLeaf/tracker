import "react"

declare module "react" {
  export class ConcurrentMode extends Component {}

  function useState<S>(): [S | void, Dispatch<SetStateAction<S | void>>]

  function useRef<T>(): MutableRefObject<T | void>

  function createContext<V>(): Context<V | void>
}
