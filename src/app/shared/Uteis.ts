import moment from 'moment';

export class Uteis {

  public static isDataBrasileira(data: string): boolean {
    if (!data || isNaN(Date.parse(data))) {
      return false;
    }
    const dataFormatada = moment(data);
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return re.test(dataFormatada.format('DD/MM/YYYY')) && dataFormatada.isValid();
  }

  public static isTelefoneBrasileiro(telefone: string): boolean {
    // Regex que contempla diversos formatos de telefone brasileiro:
    // Opcional DDI (+55)
    // Opcional DDD (entre parênteses, ou 2 dígitos)
    // Opcional espaço/hífen
    // Número com 8 ou 9 dígitos (9xxxx-xxxx ou xxxx-xxxx)
    const re = /^(\+55\s?)?(\(?\d{2}\)?\s?)(\d{4,5}[-\s]?\d{4})$/;
    return re.test(telefone);
  }

}
