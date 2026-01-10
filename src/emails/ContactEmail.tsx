import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New message from {name} via your portfolio</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto max-w-xl">
            <Section className="mt-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              {/* Header */}
              <Section className="mb-8 text-center">
                <Heading className="text-2xl font-bold text-gray-900">
                  {name}
                </Heading>
                <Text className="text-gray-500">{email}</Text>
              </Section>

              {/* Message */}
              <Section className="rounded-lg border-l-4 border-blue-600 bg-gray-50 px-6 py-4">
                <Text className="whitespace-pre-wrap text-base leading-relaxed text-gray-800">
                  {message}
                </Text>
              </Section>

              {/* Footer */}
              <Section className="mt-8 text-center">
                <Text className="text-xs text-gray-400">
                  Sent from your portfolio contact form
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
