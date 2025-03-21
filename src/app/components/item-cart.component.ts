import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageDirective } from '@app/directives/product-image.directive';
import { ICartItem } from '@app/types/cart.types';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-item-cart',
  imports: [CommonModule, ProductImageDirective, SvgIconComponent],
  template: `
    <div class="mb-8 flex items-center gap-x-8">
      <img
        [productImage]="item().img_url"
        alt="Item img"
        class="h-24 w-24 rounded border object-contain object-center"
      />

      <div class="flex w-full items-center justify-between">
        <div>
          <p class="mb-3 line-clamp-2">{{ item().name }}</p>
          <a
            class="cursor-pointer text-sm text-gray-700 underline"
            (click)="removeItem(item().id)"
            >Eliminar</a
          >
        </div>
        <div>
          <p class="text-xl">{{ item().ammount | currency: 'GTQ' }}</p>

          @if (item().ammount > item().unit_price) {
            <p class="text-gray-70FF0 mt-1 text-sm">
              {{ item().unit_price | currency: 'GTQ' }} c/u
            </p>
          }
        </div>
        <div class="flex items-center gap-x-2">
          <button
            title="decrease"
            class="rounded border border-slate-300 p-1.5"
            (click)="decreaseQty(item().id)"
          >
            <svg-icon
              src="assets/svg/minus.svg"
              class="icon-sm"
              [applyClass]="true"
            />
          </button>
          <p>{{ item().quantity }}</p>
          <button
            title="increase"
            class="rounded border border-slate-300 p-1.5"
            (click)="increaseQty(item().id)"
          >
            <svg-icon
              src="assets/svg/plus.svg"
              class="icon-sm"
              [applyClass]="true"
            />
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ItemCartComponent {
  public item = input.required<ICartItem>({
    alias: 'cartItem',
  });

  public onDeleteItem = output<string>();
  public onIncreaseQty = output<string>();
  public onDecreaseQty = output<string>();

  public increaseQty(itemId: string): void {
    this.onIncreaseQty.emit(itemId);
  }

  public decreaseQty(itemId: string): void {
    this.onDecreaseQty.emit(itemId);
  }

  public removeItem(itemId: string): void {
    this.onDeleteItem.emit(itemId);
  }
}
