interface Mutation {
  type: string
}

interface State {
  global: {
    darkTheme: boolean
  }
}

export { Mutation, State }
