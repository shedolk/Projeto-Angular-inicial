import { Component, Inject } from '@angular/core';
import { Address } from '../../models/adress.models';
import { AddressService } from '../../services/address.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addressmodal',
  standalone: true,
  imports: [MatSelectionList, NgFor, MatListOption,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,

],
  templateUrl: './addressmodal.component.html',
  styleUrl: './addressmodal.component.css'
})
export class AddressModalComponent {
  addresses: Address[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddressModalComponent>,
    private addressService: AddressService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addresses = this.addressService.getAddresses();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectAddress(address: Address): void {
    this.dialogRef.close(address);
  }
}
