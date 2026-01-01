import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/Icon';

interface Project {
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  links?: Array<{ name: string; href: string; icon: string }>;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { name, description, image, tags, links } = project;

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        {image && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <CardTitle className="text-base">{name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4 pt-0">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.sort().map((tag) => (
              <Badge key={tag} variant="secondary" className="px-1.5 py-0.5 text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {links.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                <Badge className="flex items-center gap-1 px-2 py-1 text-[10px]">
                  <Icon name={link.icon} className="size-3" />
                  {link.name}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
