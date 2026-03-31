import { Technology } from './technology.model';
import { Project } from './project.model';

export interface ProjectView extends Project {
  technologiesFull: Technology[];
}