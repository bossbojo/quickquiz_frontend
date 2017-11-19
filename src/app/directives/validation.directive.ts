import { Directive, Input, DoCheck, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { element } from 'protractor';
import { LanguageService } from '../services/language.service';
@Directive({
    selector: 'validation'
})
export class ValidationDirective implements DoCheck, AfterViewInit {
    constructor(private element: ElementRef, private render: Renderer, private languageService: LanguageService) { }

    @Input() control: FormControl;
    formGroupElement: any;
    formInputelement: any;

    // After view init : โหลดข้อมูลหลังจาก View โหลดเสร็จ
    ngAfterViewInit() {
        this.getFormGroup();
        if (this.formGroupElement) {
            this.formInputelement = this.formGroupElement.find('.form-control');

            if (this.formInputelement.length > 0)
                this.formInputelement.on('focus', () => this.formGroupElement.removeClass('has-success has-error'));
        }
    }

    // Check realtime data : ตรวจสอบข้อมูลทุก Event
    ngDoCheck() {
        if (!this.control) return;
        let nativeElement: HTMLElement = this.element.nativeElement;
        let invaldClass = 'ng-invalid';
        if (this.control.touched) {
            if (this.formInputelement.is(':focus')) return;

            this.formGroupElement.removeClass('has-success has-error');
            const errorMessage = this.languageService.translage(this.getValidatorsMessage());
            const nodeName = this.formInputelement.prop('nodeName');
            if (this.control.valid) {
                nativeElement.innerHTML = nodeName == 'SELECT' ? errorMessage : `${errorMessage} <i class="material-icons">check</i>`;
                this.formGroupElement.addClass('has-success');
            }
            else {
                nativeElement.innerHTML = nodeName == 'SELECT' ? errorMessage : `${errorMessage} <i class="material-icons">report_problem</i>`;
                this.formGroupElement.addClass('has-error');
            }
        }
    }

    // Check type and get validator message : ตรวจสอบว่าเป็น error ชนิดไหนและแสดงข้อความนั้นออกมา
    protected getValidatorsMessage() {
        let errors = this.control.errors;
        let msg = '';
        for (let i in errors) {
            let error = errors[i];
            switch (i) {
                case 'minlength':
                case 'maxlength':
                    msg = ValidatorsMessage[i].replace('{0}', error.requiredLength);
                    break;
                case 'pattern':
                    msg = ValidatorsMessage[i];
                    break;
                case 'message':
                    msg = error;
                    break;
                default:
                    msg = ValidatorsMessage[i];
                    break;
            }
        }
        return msg;
    }

    // Search form group element : ค้นหาเอเลเมน ที่มีชื่อ class ว่า FormGroup
    protected getFormGroup() {
        const searchParent = (elem): HTMLElement[] => {
            let parent = $(elem).parent();
            if (parent.hasClass('form-group'))
                return parent;
            else if (parent.hasClass('container'))
                return $(null);
            else
                return searchParent(parent);
        };
        this.formGroupElement = searchParent(this.element.nativeElement);
    }
    searchParent() {
        this.getFormGroup();
    }
}

// list of message : รายการข้อความ error
const ValidatorsMessage = {
    required: 'This field is required',
    pattern: 'The pattern field is incorrect',
    maxlength: 'Incorrect value. It is more than {0} characters',
    minlength: 'Incorrect value. It is less than {0} characters',
    numeric: 'The number is incorrect',
    password: 'Incorrect password',
    email: 'Incorrect email',
    compare_password: 'Password and Confirm password do not match',
    phone: 'The phone number is invalid',
    postcode: 'The postcode is incorrect',
    no_special: 'Must not contain any special characters',
    url: 'Must be valid URL'
};

