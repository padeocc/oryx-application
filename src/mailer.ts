'use server';

import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ValidationError, object, string } from 'yup';

const host = process.env.MAILER_HOST;
const port = process.env.MAILER_PORT;
const user = process.env.MAILER_USER;
const password = process.env.MAILER_PASSWORD;

const sendContactEmailSchema = object({
  name: string().required(),
  message: string().required(),
  company: string(),
  email: string().email().required()
});

export const sendContactEmail = async (
  formData: FormData
): Promise<{ sent: boolean; errors?: { [key: string]: string } }> => {
  const email = formData.get('email');
  const company = formData.get('company');
  const message = formData.get('message')?.toString();
  const name = formData.get('name');
  const recaptcha = formData.get('g-recaptcha-response');

  try {
    const recaptchaResponse = await (
      await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
      )
    ).json();

    if (!recaptchaResponse?.success) {
      throw Error('recaptcha');
    }

    await sendContactEmailSchema.validate({ email, company, message, name }, { abortEarly: false });
    const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport(
      {
        //@ts-ignore
        host,
        port,
        auth: {
          user,
          pass: password
        },
        logger: true,
        debug: process.env.NODE_ENV === 'development'
      },
      {
        from: `<${user}>`,
        headers: {
          'X-Laziness-level': 1000
        }
      }
    );

    const emailMessage = {
      to: process.env.MAILER_CONTACT_TO,
      subject: `[DEPUIS ORYX] ${message?.substring(1, 30)}`,
      text: `${email} - ${name} - ${company} - ${message?.toString()}`,
      html: `<div><b>Email:</b> ${email} <br/><br/> <b>Name:</b> ${name} <br/><br/> <b>Company:</b> ${company} <br/><br/> <b>Message:</b> ${message?.toString()}</div>`
    };

    const info = await transporter.sendMail(emailMessage);
    return { sent: !!info.messageId };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    if (error instanceof ValidationError) {
      const errors = error?.inner?.reduce((all, err) => {
        return { ...all, [err.path || 'error']: err?.type || 'unknow' };
      }, {});
      return { sent: false, errors };
    }
    return { sent: false, errors: { error: 'unknow' } };
  }
};
