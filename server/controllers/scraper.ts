const getLocations = (ctx: any) => {
  ctx.body = ctx.request.body
}

const getSubjects = (ctx: any) => {
  ctx.body = ctx.request.body
}

export default {
  getLocations,
  getSubjects,
}
