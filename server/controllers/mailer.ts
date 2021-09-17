import '../env'
import nodemailer from 'nodemailer'

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

  ctx.body = {
    success: true,
    response: params,
  }
}

export default {
  mailThread,
}
