import { AbstractControl, FormGroup } from '@angular/forms';
export class ValidatorsConfig {
    // for show validation
    static markAsTouchedAll(form: FormGroup | any, focus: boolean = true) {
        for (let i in form.controls) {
            if (form.controls.hasOwnProperty(i)) {
                let control = form.controls[i];
                control.markAsTouched();
                control.markAsDirty();
            }
        }
        // for focus input
        // const input = <any>document.querySelector('.form-control.ng-invalid');
        // if (input != null && focus) input.focus();
    }

    // for is number validator
    static IsNumeric(control: AbstractControl) {
        return isNaN(control.value) ? { numeric: true } : null;
    }

    // for is email validator
    static IsEmail(control: AbstractControl) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !pattern.test(control.value) ? { email: true } : null;
    }

    // for is password validator
    static IsPassword(control: AbstractControl) {
        const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[#?!@$%^&*_-])[A-z0-9#?!@$%^&*_-]{8,20}$/;
        return !pattern.test(control.value) ? { password: true } : null;
    }

    // for is phone number
    static IsPhone(control: AbstractControl) {
        // const pattern = /^(?:0|\(?\+66\)?\s?|0\s?)[0-9](?:[\.\-\s]?\d\d){4}$/;
        const pattern = /\+?[1-9]{1}[0-9]{3,14}/;

        // the easiest way to validate phone number is remove all the special chars in it
        // and then validate if it's has no more than 15 digits.
        return !pattern.test(control.value.replace(/[\s\-\(\).]/, '')) ? { phone: true } : null;
    }

    // for is name of member
    static IsName(control: AbstractControl) {
        const pattern = /^[A-Za-z]{3}/;
        return !pattern.test(control.value) ? { name: true } : null;

    }

    //for confirm pass
    static IsConfirmPass(control: AbstractControl) {
        const pattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[#?!@$%^&*_-])[A-z0-9#?!@$%^&*_-]{8,20}$/;
        return !pattern.test(control.value) ? { confirmPass: true } : null;
    }

    // for compare password
    static comparePassword(id: any) {
        return (control: AbstractControl) => {
            let password = <HTMLInputElement>document.getElementById(id);
            if (!password || control.invalid) return null;
            let value = password.value.trim();
            if (value == '') return null;
            return value === control.value ? null : { compare_password: true };
        }
    }

    // for my pattern
    static myPattern(pattern: string, myMessage: string) {
        return (control: AbstractControl) => {
            if (control.invalid) return;
            let _pattern = new RegExp(pattern);
            return !_pattern.test(control.value) ? { message: myMessage } : null;
        }
    }

    static IsPostCode(control: AbstractControl) {
        return !/[0-9]{5}/.test(control.value) ? { postcode: true } : null;
    }

    // Allow some special chars and whitespace
    static NoSpecialChars(control: AbstractControl) {
        const pattern = /^[a-zA-Z0-9\-!&.\(\).= ]+/;
        if (control.value == "") { return null; }

        let matches = control.value.match(pattern);

        if (matches === null) {
            return { no_special: true }; // I really hate this. Will find a way to fix this later.
        }

        return control.value.match(pattern)[0] !== control.value ? { no_special: true } : null
    }

    static IsUrl(control: AbstractControl) {
        const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        return !pattern.test(control.value) ? { url: true } : null;
    }
}