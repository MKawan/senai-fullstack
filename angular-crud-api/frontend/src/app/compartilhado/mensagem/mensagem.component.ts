import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensagem.component.html',
})
export class MensagemComponent {
  @Input() mensagem = '';
  @Input() tipo: 'sucesso' | 'erro' | 'aviso' | 'informacao' = 'informacao';
}
