import '../env'
import nodemailer from 'nodemailer'

interface Params {
  recipients: string[]
  subject: string
  body: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

transporter.verify(err => console.log(err || 'nodemailer ready'))

const mailThread = (ctx: any) => {
  const params = ctx.request.body

  const paramsLength = Object.keys(params).length

  const { recipients, subject, body }: Params = params

  if (!recipients || !subject || !body) {
    return (ctx.body = {
      success: false,
      error: 'NO_PARAM',
    })
  }

  if (
    !Array.isArray(recipients) ||
    typeof subject !== 'string' ||
    typeof body !== 'string'
  ) {
    return (ctx.body = {
      success: false,
      error: 'INVALID_PARAM',
    })
  }

  if (paramsLength > 3) {
    return (ctx.body = {
      success: false,
      error: 'TOO_MANY_PARAMS',
    })
  }

  ctx.body = {
    success: true,
    response: params,
  }
}

export default {
  mailThread,
}
