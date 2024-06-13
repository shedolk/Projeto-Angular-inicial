import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Phone } from '../../models/phone.models';
import { PhoneService } from '../../services/phone.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-phonemodal',
  standalone: true,
  imports: [MatSelectionList, NgFor, MatListOption,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './phonemodal.component.html',
  styleUrl: './phonemodal.component.css'
})
export class PhoneModalComponent {
  phones: Phone[] = [];

  constructor(
    public dialogRef: MatDialogRef<PhoneModalComponent>,
    private phoneService: PhoneService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.phones = this.phoneService.getPhones();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectPhone(phone: Phone): void {
    this.dialogRef.close(phone);
  }
}
