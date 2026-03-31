export interface SiteContactItem {
  name: string;
  link: string;
  urlIcon: string;
}

export interface SiteContact {
  github?: SiteContactItem;
  linkedin?: SiteContactItem;
  cv?: SiteContactItem;
}

export interface SiteSkillGroup {
  name: string;
  technologies: string[];
  color?: string;
}

export interface SiteData {
  title: string;
  author: string;
  description: string;
  about: string;
  projectShow: string[];
  contact: SiteContact;
  skills: SiteSkillGroup[];
}
