export interface ProjectLinkSet {
  demo?: string;
  repo?: string;
}

export interface Project {
  slug: string;
  title: string;
  featured: boolean;
  order: number;
  descriptionShort: string;
  descriptionFull: string;

  technologies: string[];

  problem?: string;
  solution?: string;

  links?: ProjectLinkSet;
  images?: string[];
  cover?: string;
}