import { Component, ElementRef, HostListener, ViewChild, inject, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ClientCardData } from '../data/interfaces/client-card-data';
import { ClientsService } from '../data/services/clients-service';
import {NzInputDirective} from 'ng-zorro-antd/input';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [NzCardModule, NzIconModule, NzProgressModule, CommonModule, FormsModule, NzInputDirective],
  templateUrl: './client-card.html',
  styleUrl: './client-card.less'
})
export class ClientCardComponent {
  client = input<ClientCardData>();
  clientsService = inject(ClientsService);
  message = inject(NzMessageService);

  isEditingCompanyName: boolean | "submitting" = false;
  isEditingDirector: boolean | "submitting" = false;
  isEditingContact: boolean | "submitting" = false;
  isEditingEmail: boolean | "submitting" = false;
  isEditingPhone: boolean | "submitting" = false;

  @ViewChild('companyInput') companyInput!: ElementRef<HTMLInputElement>;
  @ViewChild('directorInput') directorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contactInput') contactInput!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('phoneInput') phoneInput!: ElementRef<HTMLInputElement>;

  get activeProjects() {
    const c = this.client();
    return c?.projects?.filter(p => !p.isArchived) ?? [];
  }

  get historyProjects() {
    const c = this.client();
    return c?.projects?.filter(p => p.isArchived) ?? [];
  }

  startEditing(field: string) {
    switch (field) {
      case 'companyName':
        this.isEditingCompanyName = !this.isEditingCompanyName;
        setTimeout(() => this.companyInput?.nativeElement.focus());
        break;
      case 'director':
        this.isEditingDirector = !this.isEditingDirector;
        setTimeout(() => this.directorInput?.nativeElement.focus());
        break;
      case 'contact':
        this.isEditingContact = !this.isEditingContact;
        setTimeout(() => this.contactInput?.nativeElement.focus());
        break;
      case 'email':
        this.isEditingEmail = !this.isEditingEmail;
        setTimeout(() => this.emailInput?.nativeElement.focus());
        break;
      case 'phone':
        this.isEditingPhone = !this.isEditingPhone;
        setTimeout(() => this.phoneInput?.nativeElement.focus());
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeys(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== 'Escape') return;

    if (this.isEditingCompanyName) this.finishEditing('companyName');
    if (this.isEditingDirector) this.finishEditing('director');
    if (this.isEditingContact) this.finishEditing('contact');
    if (this.isEditingEmail) this.finishEditing('email');
    if (this.isEditingPhone) this.finishEditing('phone');

    event.preventDefault();
  }

  finishEditing(field: string) {
    switch (field) {
      case 'companyName': this.isEditingCompanyName = !this.isEditingCompanyName; break;
      case 'director': this.isEditingDirector = !this.isEditingDirector; break;
      case 'contact': this.isEditingContact = !this.isEditingContact; break;
      case 'email': this.isEditingEmail = !this.isEditingEmail; break;
      case 'phone': this.isEditingPhone = !this.isEditingPhone; break;
    }

    const clientData = this.client();
    if (!clientData) return;

    this.clientsService.updateClient(clientData.clientId, clientData).subscribe({
      error: (err) => this.message.error('Ошибка при обновлении клиента: ' + err.message),
      complete: () => this.message.success('Клиент успешно обновлен!')
    });
  }
}
