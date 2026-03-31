import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactPayload } from '../models/ContactPayload.model';

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly endpoint = 'https://api.web3forms.com/submit';

  sendMessage(payload: ContactPayload, accessKey: string): Observable<Web3FormsResponse> {
    return this.http.post<Web3FormsResponse>(this.endpoint, {
      access_key: accessKey,
      name: payload.name,
      email: payload.email,
      message: payload.message,
      'h-captcha-response': payload.hcaptchaToken,
    });
  }
}
