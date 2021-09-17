import '../env'
import { Context } from 'koa'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

interface Params {
  recipients: string[]
  subject: string
  body: string
}

interface EmailsSent {
  email: string
  status: string | Error
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

transporter.verify(err => console.log(err || 'nodemailer ready'))

const sendEmail = async (emailData: Mail.Options): Promise<EmailsSent> => {
  return await new Promise(resolve => {
    const email = emailData.to

    return transporter.sendMail(emailData, (err, info) => {
      const infoStatus = info.accepted.length > 0 ? 'accepted' : 'rejected'

      resolve({ email: email.toString(), status: err || infoStatus })
    })
  })
}

const mailThread = async (ctx: Context) => {
  const params = ctx.request.body

  const paramsLength = Object.keys(params).length

  const { recipients, subject, body }: Params = params

  const emailSender = process.env.EMAIL_SENDER

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

  const emailsSent: EmailsSent[] = []

  for (const recipient of recipients) {
    const emailData = {
      from: emailSender,
      to: recipient,
      subject,
      html: body,
    }

    await sendEmail(emailData).then((emailSent: EmailsSent) =>
      emailsSent.push(emailSent)
    )
  }

  ctx.body = {
    success: true,
    response: emailsSent,
  }
}

export default {
  mailThread,
}
