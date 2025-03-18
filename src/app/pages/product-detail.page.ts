import { Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ProductsService } from '@app/features/products/products.service';
import { IProduct } from '@app/features/products/product.types';
import { ProductCardComponent } from '../shop/components/product-card/product-card.component';
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
  template: `
    @if (product) {
      <div class="mb-12 grid grid-cols-[4rem_minmax(560px,_1fr)_500px] gap-x-6">
        <div class="grid h-min gap-y-4">
          <div class="h-16 rounded border border-slate-200 p-3 text-sm">1</div>
          <div class="h-16 rounded border border-slate-200 p-3 text-sm">2</div>
          <div class="h-16 rounded border border-slate-200 p-3 text-sm">3</div>
        </div>
        <div class="flex justify-center">
          <img
            [productImage]="product.img_url"
            [alt]="product.name"
            title="product-image"
            class="block object-contain"
          />
        </div>
        <div class="p-4">
          <div class="mb-6">
            <h1 class="mb-1 text-xl font-semibold text-neutral-800">
              {{ product.name | titlecase }}
            </h1>
            <div class="mb-4 flex gap-x-4 text-sm">
              <p>Marca: marca</p>
              <a [routerLink]="['/shop', product.category?.slug]">
                Categoría:
                <span class="text-sm font-medium text-sky-600">
                  {{ product.category?.name }}
                </span>
              </a>
            </div>
            <p>{{ product.description }}</p>
          </div>
          <div class="mb-8">
            <p class="mb-2 text-xl font-semibold">
              {{ product.selling_price | currency: 'GTQ' }}
            </p>
          </div>
          <div class="mb-8">
            <div class="flex gap-x-4">
              <div
                class="w-[220px] rounded-lg border border-slate-200 p-3 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mb-2 h-6 w-6 text-neutral-800"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <p class="font-medium text-neutral-800">Envío a domicilio</p>
                <p class="mb-2 text-xs">Escoger dirección</p>
                <p class="text-xs">
                  La demora de entrega varía si te encuentras cerca de una de
                  nuestras tiendas.
                </p>
              </div>
              <div
                class="w-[220px] rounded-lg border border-slate-200 p-3 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="mb-2 h-6 w-6 text-neutral-800"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                  />
                </svg>
                <p class="font-medium text-neutral-800">Recoger en tienda</p>
                <p class="mb-2 text-xs">Ver sucursales</p>
                <p class="text-xs">
                  Realiza tu pedido en línea y recogelo en tu tienda más
                  cercana.
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-x-4">
            <app-button (click)="addToCart()">Añadir al carrito</app-button>
          </div>
        </div>
      </div>
    }

    <div>
      <p class="mb-6 border-b border-gray-200 pb-4 text-lg font-medium">
        Te podría interesar
      </p>

      <div class="grid grid-cols-5 gap-x-5">
        @for (item of relatedProducts; track item.id) {
          <app-product-card [product]="item" />
        }
      </div>
    </div>
  `,
})
export class ProductDetailPage {
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
