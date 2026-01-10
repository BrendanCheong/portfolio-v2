import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import ContactEmail from '@/emails/ContactEmail';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailHtml = await render(ContactEmail({ name, email, message }));

    await resend.emails.send({
      from: 'Portfolio <contact@brendancej.tech>',
      to: ['brendancej1@gmail.com'],
      subject: `Portfolio Contact: Message from ${name}`,
      html: emailHtml,
      replyTo: email,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
