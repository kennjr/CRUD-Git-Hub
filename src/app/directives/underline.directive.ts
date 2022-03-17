import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUnderline]'
})
export class UnderlineDirective {

  constructor(private elementref :ElementRef) { 
    
  }

  private underlineText(cursor: string, textDeco: string) {
    this.elementref.nativeElement.style.textDecoration = textDeco;
    this.elementref.nativeElement.style.cursor = cursor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.underlineText("pointer", "underline")
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.underlineText("text", "")
  }
}
