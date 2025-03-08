import { Directive, inject, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[productImage]',
  standalone: true,
})
export class ProductImageDirective {
  private _elementRef = inject(ElementRef);

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  public set productImage(imgUrl: string) {
    if (imgUrl?.trim().length > 1) {
      this._elementRef.nativeElement.src = imgUrl;
    } else {
      this._elementRef.nativeElement.src = 'assets/images/no-product-img.jpg';
    }
  }

  constructor() {}
}
