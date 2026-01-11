# Refactor Contact Form with Zod, React Hook Form, and TanStack Query

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the contact form to use zod for validation, react-hook-form for form state management, and TanStack Query for API mutations. The UI and functionality remain identical.

**Architecture:**
1. Create zod schema for contact form validation (mirrors current HTML validation)
2. Set up TanStack Query app-wide with QueryClientProvider
3. Refactor ContactForm to use react-hook-form with zod resolver and useMutation
4. Add optional unit tests using Vitest and Astro's Container API

**Tech Stack:** zod v4.2.1 (already installed), react-hook-form, @tanstack/react-query, @hookform/resolvers, vitest, @tanstack/react-query-devtools

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install required dependencies**

Run:
```bash
pnpm add react-hook-form @tanstack/react-query @hookform/resolvers
```

Expected: Packages added to dependencies in package.json

**Step 2: Install dev dependencies for testing**

Run:
```bash
pnpm add -D vitest @tanstack/react-query-devtools
```

Expected: Packages added to devDependencies in package.json

**Step 3: Verify installations**

Run: `cat package.json`

Expected output should include:
```json
"dependencies": {
  "react-hook-form": "^latest",
  "@tanstack/react-query": "^latest",
  "@hookform/resolvers": "^latest",
  ...
},
"devDependencies": {
  "vitest": "^latest",
  "@tanstack/react-query-devtools": "^latest",
  ...
}
```

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "deps: install react-hook-form, tanstack-query, and vitest"
```

---

## Task 2: Create Zod Schema

**Files:**
- Create: `src/lib/schemas/contact.ts`

**Step 1: Create schemas directory**

Run:
```bash
mkdir -p src/lib/schemas
```

**Step 2: Create contact schema file**

Create `src/lib/schemas/contact.ts` with:

```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

**Step 3: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`

Expected: No errors

**Step 4: Commit**

```bash
git add src/lib/schemas/contact.ts
git commit -m "feat: add contact form zod schema"
```

---

## Task 3: Set Up TanStack Query App-Wide

**Files:**
- Create: `src/lib/query-client.ts`
- Create: `src/providers/QueryProvider.tsx`
- Modify: `src/layouts/Layout.astro`

**Step 1: Create QueryClient instance**

Create `src/lib/query-client.ts` with:

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1,
    },
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

**Step 2: Create providers directory**

Run:
```bash
mkdir -p src/providers
```

**Step 3: Create QueryProvider component**

Create `src/providers/QueryProvider.tsx` with:

```typescript
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
```

**Step 4: Update Layout.astro to wrap with QueryProvider**

Read `src/layouts/Layout.astro` first to understand the structure, then add the QueryProvider wrapper.

The Layout should wrap its `<slot />` content with the QueryProvider. Since this is an Astro file with React islands, add the provider around the slot content.

**Step 5: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`

Expected: No errors

**Step 6: Commit**

```bash
git add src/lib/query-client.ts src/providers/QueryProvider.tsx src/layouts/Layout.astro
git commit -m "feat: set up TanStack Query provider app-wide"
```

---

## Task 4: Refactor ContactForm Component

**Files:**
- Modify: `src/components/ContactForm.tsx`

**Step 1: Read current ContactForm**

Run: `cat src/components/ContactForm.tsx`

This is the existing implementation we're refactoring.

**Step 2: Replace ContactForm with new implementation**

Replace the entire content of `src/components/ContactForm.tsx` with:

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
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

export function ContactForm() {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="name"
          {...register('name')}
          type="text"
          placeholder="Your name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Your message..."
          rows={5}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {mutation.isError && (
        <p className="text-sm text-destructive">
          Failed to send message. Please try again.
        </p>
      )}

      <Button type="submit" disabled={isSubmitting || mutation.isPending} className="mt-2">
        {isSubmitting || mutation.isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

**Step 3: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`

Expected: No errors

**Step 4: Verify dev server runs**

Run: `pnpm dev`

Expected: Server starts successfully on localhost:4321. Navigate to `/contact` and verify the form renders.

Stop the dev server with Ctrl+C after verification.

**Step 5: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "refactor: migrate ContactForm to use react-hook-form, zod, and TanStack Query"
```

---

## Task 5: Set Up Vitest Configuration

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`

**Step 1: Create vitest config**

Create `vitest.config.ts` in project root with:

```typescript
/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...getViteConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }),
});
```

**Step 2: Create test setup directory and file**

Run:
```bash
mkdir -p src/test
```

Create `src/test/setup.ts` with:

```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

**Step 3: Add test scripts to package.json**

Add to the `"scripts"` section in `package.json`:

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:run": "vitest run"
```

**Step 4: Install testing library dependencies**

Run:
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom jsdom @vitest/ui
```

**Step 5: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`

Expected: No errors

**Step 6: Commit**

```bash
git add vitest.config.ts src/test/setup.ts package.json pnpm-lock.yaml
git commit -m "test: set up vitest configuration"
```

---

## Task 6: Write Unit Tests for ContactForm

**Files:**
- Create: `src/components/ContactForm.test.tsx`

**Step 1: Write the failing test first (TDD)**

Create `src/components/ContactForm.test.tsx` with:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContactForm } from './ContactForm';

// Mock fetch globally
global.fetch = vi.fn();

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });
}

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('ContactForm', () => {
  it('renders form fields correctly', () => {
    renderWithQueryClient(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    renderWithQueryClient(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Test message',
          }),
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  it('shows error message on failed submission', async () => {
    const user = userEvent.setup();
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    renderWithQueryClient(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });
});
```

**Step 2: Run tests to verify they fail (or pass if implemented correctly)**

Run: `pnpm test:run`

Expected: All tests pass (since we've already implemented the component)

**Step 3: Commit**

```bash
git add src/components/ContactForm.test.tsx
git commit -m "test: add unit tests for ContactForm"
```

---

## Task 7: Verify Everything Works

**Files:**
- Verify: All components, dev server, build

**Step 1: Run TypeScript check**

Run: `pnpm exec tsc --noEmit`

Expected: No errors

**Step 2: Run tests**

Run: `pnpm test:run`

Expected: All tests pass

**Step 3: Start dev server and test manually**

Run: `pnpm dev`

Navigate to `http://localhost:4321/contact` and verify:
1. Form renders correctly
2. Validation errors show for empty fields
3. Email validation works for invalid email format
4. Form submits successfully (check network tab for POST to /api/contact)
5. Success message displays after submission
6. TanStack Devtools is available (bottom left button in dev mode)

Stop dev server with Ctrl+C.

**Step 4: Build the project**

Run: `pnpm build`

Expected: Build completes successfully

**Step 5: Preview production build**

Run: `pnpm preview`

Expected: Preview server starts, contact page works correctly

Stop preview with Ctrl+C.

**Step 6: Run code reviewer subagent**

Use the `superpowers:requesting-code-review` skill to verify:
1. Code follows React best practices
2. Proper error handling
3. Accessibility (ARIA attributes)
4. TypeScript types are correct
5. Tests cover main use cases

**Step 7: Final commit**

```bash
git add -A
git commit -m "test: verify contact form refactor works correctly"
```

---

## Verification Checklist

After completing all tasks:

- [ ] Dependencies installed (react-hook-form, @tanstack/react-query, @hookform/resolvers, vitest)
- [ ] Zod schema created at `src/lib/schemas/contact.ts`
- [ ] QueryClient and QueryProvider set up app-wide
- [ ] ContactForm refactored to use react-hook-form + zod + TanStack Query
- [ ] Vitest configuration created
- [ ] Unit tests written and passing
- [ ] TypeScript compilation passes with no errors
- [ ] Dev server runs successfully
- [ ] Form validation works (required fields, email format)
- [ ] Form submission works (POST to /api/contact)
- [ ] Success message displays after submission
- [ ] TanStack Devtools available in dev mode
- [ ] Production build succeeds
- [ ] Preview server works correctly
- [ ] Code reviewer approves all changes

---

## Summary

This refactor modernizes the contact form by:

1. **Zod Schema** - Type-safe validation schema at `src/lib/schemas/contact.ts` that mirrors the original HTML validation
2. **React Hook Form** - Efficient form state management with `useForm` hook, replacing manual `useState` and `FormData` handling
3. **TanStack Query** - App-wide QueryClient setup with `useMutation` for the contact form submission, providing built-in loading/error states and retry logic
4. **Testing** - Vitest configuration with React Testing Library for unit tests
5. **Accessibility** - ARIA attributes for form validation errors
6. **DevTools** - TanStack Query Devtools for debugging in development

The UI and functionality remain identical to the original, but the codebase is now more maintainable, type-safe, and ready for future API integrations.
