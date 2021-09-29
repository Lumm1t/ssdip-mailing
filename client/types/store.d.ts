declare module 'store' {
  interface Mutation {
    type: string
  }

  interface State {
    global: {
      darkTheme: boolean
    }
  }
}
