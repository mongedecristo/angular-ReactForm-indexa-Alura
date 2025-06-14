import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "../../componentes/container/container.component";
import { SeparadorComponent } from "../../componentes/separador/separador.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Uteis } from '../../shared/Uteis';
import moment from 'moment';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent {

  contatoForm!: FormGroup;

  constructor() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      telefone: new FormControl('', [
        Validators.required,
        FormularioContatoComponent.telefoneBrasileiroValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email]),
      aniversario: new FormControl('', [
        Validators.required,
        FormularioContatoComponent.dataBrasileiraValidator,
        FormularioContatoComponent.dataNascimentoValidator
      ]),
      redes: new FormControl('', [
        Validators.minLength(5)
      ]),
      obs: new FormControl('')
    });
  }

  private static dataBrasileiraValidator(control: AbstractControl): ValidationErrors | null {
    const data = control.value as string;
    if (!data) {
      return null;
    }
    const isValid = Uteis.isDataBrasileira(data);
    return isValid ? null : { 'dataInvalida': true };
  }

  private static dataNascimentoValidator(control: AbstractControl): ValidationErrors | null {
    const data = control.value as string;
    if (!data) {
      return null;
    }
    const dataFormatada = moment(data, 'DD/MM/YYYY');
    const isValid = FormularioContatoComponent.testandoDataDeNascimento(dataFormatada.format('DD/MM/YYYY'));
    return isValid ? null : { 'dataMenor': true };
  }

  private static telefoneBrasileiroValidator(control: AbstractControl): ValidationErrors | null {
    const telefone = control.value;
    if (!telefone) {
      return null;
    }
    const isValid = Uteis.isTelefoneBrasileiro(telefone);
    return isValid ? null : { 'telefoneInvalido': true };
  }

  public salvarContato(): void {
    if (this.contatoForm.valid) {
      const contato = this.contatoForm.value;
      console.log('Contato salvo:', contato);
      // Aqui você pode adicionar a lógica para salvar o contato, como enviar para um servidor
      this.contatoForm.reset();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      console.log(this.contatoForm.value);
    }
  }

  public cancelar(): void {
    this.contatoForm.reset();
    console.log('Formulário cancelado');
  }

  /**
   * A pessoas tem que ter pelo menos 12 anos para se cadastrar
   * que é a idade mínima para ter email e conta em redes sociais.
   * @param data
   * @returns true se a data for válida.
   */
  public static testandoDataDeNascimento(data: string): boolean {
    const dataFormatada = moment(data, 'DD/MM/YYYY');
    const dozeAnosAtras = moment().subtract(12, 'years');
    return (dataFormatada.isBefore(dozeAnosAtras));
  }

}
