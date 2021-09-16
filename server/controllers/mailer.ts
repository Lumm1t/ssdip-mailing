const mailThread = (ctx: any) => {
  const params = ctx.request.body

  ctx.body = {
    success: true,
    response: params,
  }
}

export default {
  mailThread,
}
