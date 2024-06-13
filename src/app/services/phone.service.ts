import { Injectable } from '@angular/core';
import { Phone } from '../models/phone.models';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  private phones: Phone[] = [
    { id: 1, numero: '(63) 99456-7890' },
    { id: 2, numero: '(62) 98765-4321' },
    { id: 3, numero: '(61) 98856-7890' },
    { id: 4, numero: '(41) 94465-2221' },
    // Adicione mais telefones conforme necessário
  ];

  getPhones(): Phone[] {
    return this.phones;
  }

  addPhone(phone: Phone): void {
    this.phones.push(phone);
  }
}
