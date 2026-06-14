import workData from "../data/work.json";

export type WorkData = typeof workData;
export type ProjectId = keyof WorkData;

export interface Project {
  title: string;
  role: string;
  techStack: string[];
  description: string;
  link: { label: string; url: string };
  periode: { start: number[]; end: number[] };
}
