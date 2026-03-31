import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteService } from '../../../../core/services/site-service';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { ContactService } from '../../../../core/services/contact-service';
import { environment } from '../../../../../environments/environment';

declare global {
  interface Window {
    hcaptcha?: { reset: () => void };
  }
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private siteService = inject(SiteService);
  private contactService = inject(ContactService);

  profile = toSignal(this.siteService.getSite());

  loading = false;
  success = false;
  error = false;
  errorMessage = '';

  form = { name: '', email: '', message: '', company: '' };

  sendMessage(contactForm: NgForm) {
    this.success = false;
    this.error = false;
    this.errorMessage = '';

    if (this.form.company) return;

    contactForm.form.markAllAsTouched();
    if (contactForm.invalid) {
      this.error = true;
      this.errorMessage = 'Completa los campos requeridos.';
      return;
    }

    const token = (document.querySelector('[name="h-captcha-response"]') as HTMLInputElement | null)
      ?.value;

    if (!token) {
      this.error = true;
      this.errorMessage = 'Completa el captcha para poder enviar.';
      return;
    }

    this.loading = true;

    this.contactService
      .sendMessage(
        {
          name: this.form.name,
          email: this.form.email,
          message: this.form.message,
          hcaptchaToken: token,
        },
        environment.web3formsAccessKey,
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.success = true;
            contactForm.resetForm();
          } else {
            this.error = true;
            this.errorMessage = res.message ?? 'No se pudo enviar.';
          }

          window.hcaptcha?.reset?.();
        },
        error: (err) => {
          console.error('Web3Forms error:', err?.error ?? err);
          this.error = true;
          this.errorMessage = err?.error?.message ?? 'Error de red o servidor.';
          window.hcaptcha?.reset?.();
        },
      });
  }
}
