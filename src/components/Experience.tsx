'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Timeline } from '@/components/Timeline';
import careerData from '@/data/career.json';
import educationData from '@/data/education.json';

export function Experience() {
  return (
    <Tabs defaultValue="work" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-2">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline items={careerData.career} />
      </TabsContent>
      <TabsContent value="education">
        <Timeline items={educationData.education} />
      </TabsContent>
    </Tabs>
  );
}
