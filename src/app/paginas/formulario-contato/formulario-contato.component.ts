import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "../../componentes/container/container.component";
import { SeparadorComponent } from "../../componentes/separador/separador.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Uteis } from '../../shared/Uteis';
import { ContatoService } from './../../services/contato.service';
import moment from 'moment';
import { Router } from '@angular/router';

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
export class FormularioContatoComponent implements OnInit {

  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.reset();
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
    console.log('Validator da data de nascimento:', data);
    const dataFormatada = moment(data, 'YYYY-MM-DD'); // Formato esperado pelo Angular
    console.log('Data formatada:', dataFormatada.format('DD/MM/YYYY'));
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
      const novoContato = this.contatoForm.value;
      console.log('Contato salvo:', novoContato);
      this.contatoService.salvarContato(novoContato);
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      console.log(this.contatoForm.value);
      console.log(this.contatoForm.get('aniversario')?.errors);
      console.log(this.contatoForm.get('aniversario')?.value);
      console.log(typeof this.contatoForm.get('aniversario')?.value);
    }
  }

  public inicializarFormulario(): void {
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
      aniversario: new FormControl<Date>(new Date, [
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

  public reset(): void {
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
    console.log('Testando data de nascimento:', data);
    const dataFormatada = moment(data, 'DD/MM/YYYY');
    const dozeAnosAtras = moment().subtract(12, 'years');
    console.log('Data de nascimento:', dataFormatada.format('DD/MM/YYYY'));
    console.log('Doze anos atrás:', dozeAnosAtras.format('DD/MM/YYYY'));
    console.log('Data de nascimento é antes de 12 anos atrás:', dataFormatada.isBefore(dozeAnosAtras));
    return (dataFormatada.isBefore(dozeAnosAtras));
  }

}
