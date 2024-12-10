'use server';

import nodemailer, { TransportOptions } from 'nodemailer';
import SMTPPool from 'nodemailer/lib/smtp-pool';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ValidationError, object, string } from 'yup';

const host = process?.env?.MAILER_HOST || '';
const port = process?.env?.MAILER_PORT ? Number(process?.env?.MAILER_PORT) : 0;
const user = process?.env?.MAILER_USER || '';
const password = process?.env?.MAILER_PASSWORD || '';

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
  const url = formData.get('url');
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
    const sentMessageInfo: SMTPPool.Options = {
      host,
      port,
      auth: {
        user,
        pass: password
      },
      logger: true,
      debug: process.env.NODE_ENV === 'development',
      pool: true
    };

    const options: TransportOptions = {};

    const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport(
      sentMessageInfo,
      options
    );

    const emailMessage = {
      to: process.env.MAILER_CONTACT_TO,
      subject: `[DEPUIS ORYX] ${message?.substring(1, 30)}`,
      text: `${email} - ${name} - ${company} - ${message?.toString()}`,
      html: `<div><b>Email:</b> ${email} <br/><br/> <b>Name:</b> ${name} <br/><br/> <b>Company:</b> ${company} <br/><br/><b>Url:</b> ${url} <br/><br/> <b>Message:</b> ${message?.toString()}</div>`
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

export const sendServiceAdditionEmail = async (
  formData: FormData
): Promise<{ sent: boolean; errors?: { [key: string]: string } }> => {
  const theme = formData.getAll('theme');
  const tags = formData.getAll('tags');
  const url = formData.get('url');
  const label = formData.get('label');
  const region = formData.getAll('region');
  const location = formData.get('location');
  const options = formData.getAll('options');
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

    // await sendServiceAdditionEmailSchema.validate({ email, company, message, name }, { abortEarly: false });
    const sentMessageInfo: SMTPPool.Options = {
      host,
      port,
      auth: {
        user,
        pass: password
      },
      logger: true,
      debug: process.env.NODE_ENV === 'development',
      pool: true
    };

    const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport(
      sentMessageInfo,
      {} as TransportOptions
    );

    const htmlContent = `<div>
    <b>Theme :</b> ${theme[0]} <br/><br/> 
    <b>Tags :</b> ${tags.join(', ')} <br/><br/> 
    <b>Nom :</b> ${label} <br/><br/>
    <b>Url :</b> ${url} <br/><br/> 
    <b>Region :</b> ${region.join(', ')} <br/><br/> 
    <b>Type :</b> ${location} <br/><br/> 
    <b>Region :</b> ${region.join(', ')} <br/><br/> 
    <b>Options :</b> ${options.join(', ')} <br/><br/> 
    </div>`;

    const emailMessage = {
      to: process.env.MAILER_CONTACT_TO,
      subject: `[ORYX][AJOUT SERVICE][${theme[0]}] ${label}`,
      html: htmlContent
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
