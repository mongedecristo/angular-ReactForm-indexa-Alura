import { Injectable } from '@angular/core';
import { Contato } from '../shared/types';
import agenda from '../agenda.json';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatos: Contato[] = [];

  constructor() {
    //Usando a agenda do arquivo JSON como base
    let listaDaAgenda: Contato[] = agenda;

    // Carrega os contatos do localStorage ao inicializar o serviço
    const contatosLocalStorage = localStorage.getItem('contatos');
    const contatosParse: Contato[] = contatosLocalStorage ? JSON.parse(contatosLocalStorage) : null;
    this.contatos = contatosParse || listaDaAgenda; // Se não houver contatos no localStorage, usa os contatos do arquivo JSON

    //Salvar os contatos no localStorage
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  public obterContatos(): Contato[] {
    return this.contatos;
  }

  public salvarContato(contato: Contato): void {
    let maxIndex = this.contatos.reduce((max, c) => c.id > max ? c.id : max, 0);
    contato.id = maxIndex + 1;
    this.contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

}
