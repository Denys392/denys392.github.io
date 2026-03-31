import { Technology } from './technology.model';

export interface SkillGroupView {
  name: string;
  color?: string;
  technologies: Technology[];
}