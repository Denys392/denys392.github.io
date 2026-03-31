import { Component } from '@angular/core';
import { ProjectsLatest } from '../sections/projects-latest/projects-latest';
import { Hero } from "../sections/hero/hero";
import { About } from "../sections/about/about";
import { Contact } from "../sections/contact/contact";
import { Skills } from "../sections/skills/skills";

@Component({
  selector: 'app-landing-page',
  imports: [ProjectsLatest, Hero, About, Contact, Skills],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

}
