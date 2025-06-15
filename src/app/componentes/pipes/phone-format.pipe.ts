import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

  /**
   * Transforma um número de telefone bruto para o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
   * Remove todos os caracteres não numéricos antes de formatar.
   *
   * @param value O número de telefone como string (ex: "11987654321" ou "2134567890").
   * @returns O número de telefone formatado, ou a string original se for inválida ou vazia.
   */
  transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    let phoneStr = String(value).replace(/\D/g, ''); // Remove tudo que não for dígito

    if (phoneStr.length === 11) { // Formato (XX) 9XXXX-XXXX
      return `(${phoneStr.substring(0, 2)}) ${phoneStr.substring(2, 7)}-${phoneStr.substring(7, 11)}`;
    } else if (phoneStr.length === 10) { // Formato (XX) XXXX-XXXX
      return `(${phoneStr.substring(0, 2)}) ${phoneStr.substring(2, 6)}-${phoneStr.substring(6, 10)}`;
    }

    // Se não for 10 ou 11 dígitos, retorna o valor original limpo ou vazio
    return phoneStr;
  }

}
