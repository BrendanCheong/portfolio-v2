'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';

async function submitContactForm(data: ContactFormData): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }
}

function ContactFormInner() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h3 className="text-lg font-semibold">Thank you!</h3>
        <p className="mt-2 text-muted-foreground">
          Your message has been sent. I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:grid-cols-2" noValidate>
      <div className="h-16">
        <Input
          id="name"
          {...register('name')}
          type="text"
          placeholder="Name"
          autoComplete="given-name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="h-16">
        <Input
          id="email"
          {...register('email')}
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="h-32 sm:col-span-2">
        <Textarea
          rows={4}
          id="message"
          {...register('message')}
          placeholder="Drop me a message with any career opportunities or just to say hi!"
          autoComplete="off"
          className="resize-none"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {mutation.isError && (
        <p className="col-span-1 text-sm text-destructive sm:col-span-2">
          Failed to send message. Please try again.
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting || mutation.isPending} className="w-full">
          {isSubmitting || mutation.isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

export function ContactForm() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ContactFormInner />
    </QueryClientProvider>
  );
}
