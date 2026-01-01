import socialsData from '../data/socials.json';
import { Icon } from './Icon';
import { Button } from './ui/Button';

export function Socials() {
  return (
    <div className="flex items-center gap-2">
      {socialsData.socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
        >
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Icon name={social.icon} className="size-4" />
          </Button>
        </a>
      ))}
    </div>
  );
}
