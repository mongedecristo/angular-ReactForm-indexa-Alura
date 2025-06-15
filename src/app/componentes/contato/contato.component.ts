import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from "../pipes/phone-format.pipe";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, PhoneFormatPipe],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  @Input() nome: string = ''
  @Input() telefone: string = ''
}
