import { Button } from './ui/Button';
import { Socials } from './Socials';
import { FileDown } from 'lucide-react';

export function HeroActions() {
  return (
    <section className="mt-6 flex flex-wrap items-center gap-4">
      <a href="/resume.pdf" target="_blank">
        <Button variant="outline">
          <span className="font-semibold">Resume</span>
          <FileDown className="ml-2 size-5" />
        </Button>
      </a>
      <Socials />
    </section>
  );
}
