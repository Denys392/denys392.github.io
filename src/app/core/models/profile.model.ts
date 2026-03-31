export interface ProfileSocial {
  github?: string;
  linkedin?: string;
  cv?: string;
}

export interface Profile {
  name: string;
  role: string;
  headline?: string;
  email?: string;
  location?: string;
  social?: ProfileSocial;
}