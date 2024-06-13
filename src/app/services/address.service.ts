import { Injectable } from '@angular/core';
import { Address } from '../models/adress.models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addresses: Address[] = [
    { id: 1, rua: '604 Sul', cidade: 'Palmas', estado: 'TO', cep: '77000-00' },
    { id: 2, rua: 'Jardim América', cidade: 'Goiânia', estado: 'GO', cep: '74000-00' },
    { id: 3, rua: '123 Main St', cidade: 'Anytown', estado: 'TO', cep: '12345' },

    // Adicione mais endereços conforme necessário
  ];

  getAddresses(): Address[] {
    return this.addresses;
  }

  addAddress(address: Address): void {
    this.addresses.push(address);
  }
}
