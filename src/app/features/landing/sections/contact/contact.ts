import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SiteService } from '../../../../core/services/site-service';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { ContactService } from '../../../../core/services/contact-service';
import { environment } from '../../../../../environments/environment';

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: HTMLElement, params: { sitekey: string }) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

type ContactFormModel = {
  name: string | null;
  email: string | null;
  message: string | null;
  company: string | null;
};

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {
  private siteService = inject(SiteService);
  private contactService = inject(ContactService);

  profile = toSignal(this.siteService.getSite());

  loading = false;
  success = false;
  error = false;
  errorMessage = '';

  form: ContactFormModel = { name: '', email: '', message: '', company: '' };

  @ViewChild('captchaEl', { static: false })
  captchaEl?: ElementRef<HTMLElement>;

  private captchaWidgetId?: number;
  private captchaIntervalId?: number;

  ngAfterViewInit(): void {
    this.mountCaptcha();
  }

  private mountCaptcha(): void {
    const sitekey = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

    const tryRender = () => {
      const el = this.captchaEl?.nativeElement;
      if (!el) return false;
      if (!window.hcaptcha?.render) return false;

      el.innerHTML = '';
      this.captchaWidgetId = window.hcaptcha.render(el, { sitekey });
      return true;
    };

    if (tryRender()) return;

    this.captchaIntervalId = window.setInterval(() => {
      if (tryRender() && this.captchaIntervalId) {
        clearInterval(this.captchaIntervalId);
        this.captchaIntervalId = undefined;
      }
    }, 100);

    window.setTimeout(() => {
      if (this.captchaIntervalId) {
        clearInterval(this.captchaIntervalId);
        this.captchaIntervalId = undefined;
      }
    }, 5000);
  }

  private getCaptchaToken(): string {
    return (
      (document.querySelector('[name="h-captcha-response"]') as HTMLTextAreaElement | null)
        ?.value ?? ''
    );
  }

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

    const token = this.getCaptchaToken();
    if (!token) {
      this.error = true;
      this.errorMessage = 'Completa el captcha para poder enviar.';
      return;
    }

    this.loading = true;

    this.contactService
      .sendMessage(
        {
          name: this.form.name ?? '',
          email: this.form.email ?? '',
          message: this.form.message ?? '',
          hcaptchaToken: token,
        },
        environment.web3formsAccessKey,
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.success = true;

            contactForm.resetForm({
              name: '',
              email: '',
              message: '',
              company: '',
            });

            this.form = { name: '', email: '', message: '', company: '' };
          } else {
            this.error = true;
            this.errorMessage = res.message ?? 'No se pudo enviar.';
          }

          window.hcaptcha?.reset?.(this.captchaWidgetId);
        },
        error: (err) => {
          console.error('Web3Forms error:', err?.error ?? err);
          this.error = true;
          this.errorMessage = err?.error?.message ?? 'Error de red o servidor.';

          window.hcaptcha?.reset?.(this.captchaWidgetId);
        },
      });
  }
}
