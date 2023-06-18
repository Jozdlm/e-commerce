import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICartItem } from '../../interfaces/cart-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { IProduct } from '../../interfaces/product';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';

@Component({
  selector: 'app-item-cart',
  standalone: true,
  imports: [CommonModule, ProductImageDirective],
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css'],
})
export class ItemCartComponent {
  private _cartService = inject(ShoppingCartService);

  @Input({ alias: 'cartItem', required: true })
  public item!: ICartItem;

  public increaseQty(product: IProduct): void {
    this._cartService.addToCart(product);
  }

  public decreaseQty(cartItem: ICartItem): void {
    const { product, quantity } = cartItem;
    this._cartService.decreaseQuantity(product.id, quantity);
  }

  public removeItem(productId: number): void {
    this._cartService.removeFromCart(productId);
  }
}
