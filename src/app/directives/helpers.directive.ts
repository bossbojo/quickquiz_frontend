import { Directive, HostBinding, HostListener, OnInit, ElementRef, OnChanges, Input } from '@angular/core';
@Directive({
    selector: 'select.form-control'
})
export class SelectDirective implements OnChanges, OnInit {
    constructor(private elem: ElementRef) { }
    @Input() Changes: any;
    @HostBinding('attr.has-value') hasValue: boolean = false;
    @HostListener('change') onchange() {
        let input = <HTMLInputElement>this.elem.nativeElement;
        this.hasValue = input.value.trim() !== '';
    }

    ngOnChanges() {
        if (this.Changes)
            setTimeout(() => this.processCheck());
    }

    ngOnInit() {
        this.processCheck();
    }

    private processCheck() {
        let input = <HTMLInputElement>this.elem.nativeElement;
        this.hasValue = input.value.trim() !== '';
    }
}

