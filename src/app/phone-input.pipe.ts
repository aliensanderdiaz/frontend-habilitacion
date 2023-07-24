import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneInput'
})
export class PhoneInputPipe implements PipeTransform {

  transform(value: string) {
    if (!value) return "";
    let trim = value.replace(/\D/g, '').substr(0,10); // Remove non-digits and trim
    let matched = trim.match(/(\d{0,3})(\d{0,3})(\d{0,4})/); // Match chunks of phone number
    if (matched) {
      return !matched[2] ? matched[1] : '(' + matched[1] + ') ' + matched[2] + (matched[3] ? '-' + matched[3] : ''); // Format
    }
    return 'XXXXXXXXXXXXXXXX'
  }

}
