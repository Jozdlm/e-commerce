import { Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ProductsService } from '@app/shop/products.service';
import { IProduct } from 'src/app/shop/product';
import { ProductCardComponent } from '../../shop/components/product-card/product-card.component';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '@app/cart/cart.service';

@Component({
    selector: 'app-product-detail',
    imports: [
        CommonModule,
        RouterModule,
        ButtonComponent,
        ProductImageDirective,
        ProductCardComponent,
    ],
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  private readonly _productService = inject(ProductsService);
  private readonly _cartService = inject(CartService);
  private readonly _router = inject(Router);

  public subscriptions: Subscription = new Subscription();
  public product: IProduct | undefined = undefined;
  public relatedProducts: IProduct[] = [];

  public constructor() {
    this.subscriptions.add(
      this._productService.getRelatedProducts().subscribe((arr) => {
        this.relatedProducts = arr;
      }),
    );

    inject(DestroyRef).onDestroy(() => {
      this.subscriptions.unsubscribe();
    });
  }

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  public set id(productId: number) {
    this.subscriptions.add(
      this._productService.getProductById(productId).subscribe((product) => {
        if (product) {
          this.product = product;
          return;
        }
        return this._router.navigateByUrl('/');
      }),
    );
  }

  public addToCart(): void {
    if (this.product) {
      this._cartService.addItemToCart({
        product_id: this.product.id,
        name: this.product.name,
        img_url: this.product.img_url,
        unit_price: this.product.selling_price,
        quantity: 1,
        ammount: this.product.selling_price,
      });
    }
  }
}
