import { Injectable, inject } from '@angular/core';
import { ICartItem, ItemCartDto } from '@app/features/cart/cart.types';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalCartService } from './local-cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _localCartService: LocalCartService = inject(LocalCartService);
  private _items: ICartItem[] = [];
  private _cartItems$ = new BehaviorSubject<ICartItem[]>(this._items);
  private _totalQuantity$ = new BehaviorSubject<number>(0);
  private _subtotal$ = new BehaviorSubject<number>(0);

  constructor() {
    this.getCartItems();
  }

  private getCartItems(): void {
    const localItems = this._localCartService.getLocalItems();
    this._items = localItems ?? [];

    this._updateCart();
  }

  private _updateCart(): void {
    const totalQuantity = this._items.reduce(
      (acc, val) => acc + val.quantity,
      0
    );

    const totalAmmount = this._items.reduce(
      (acc, val) => acc * 1 + val.ammount,
      0.0
    );

    this._subtotal$.next(totalAmmount);
    this._totalQuantity$.next(totalQuantity);
    this._cartItems$.next(this._items);
    this._localCartService.setLocalItems(this._items);
  }

  public get cartItems$(): Observable<ICartItem[]> {
    return this._cartItems$.asObservable();
  }

  public get cartCount$(): Observable<number> {
    return this._totalQuantity$.asObservable();
  }

  public get subtotal$(): Observable<number> {
    return this._subtotal$.asObservable();
  }

  public addItemToCart(item: ItemCartDto): void {
    const inArray = this._items.some(
      (itemCart) => itemCart.id == item.product_id.toString()
    );

    if (inArray) {
      this.increaseQuantity(item.product_id.toString());
    } else {
      const newItem: ICartItem = { ...item, id: item.product_id.toString() };
      this._items = [...this._items, newItem];
      this._updateCart();
    }
  }

  public increaseQuantity(itemId: string): void {
    const index = this._items.findIndex((item) => item.id == itemId);
    const item = this._items[index];

    const quantity = item.quantity + 1;
    const ammount = quantity * item.unit_price;

    this._items[index] = { ...item, quantity, ammount };
    this._updateCart();
  }

  public decreaseQuantity(itemId: string): void {
    const index = this._items.findIndex((item) => item.id == itemId);
    const item = this._items[index];

    if (item.quantity > 1) {
      const quantity = item.quantity - 1;
      const ammount = quantity * item.unit_price;

      this._items[index] = { ...item, quantity, ammount };
      this._updateCart();
    } else {
      this.removeItem(item.id);
    }
  }

  public removeItem(itemId: string): void {
    this._items = this._items.filter((item) => item.id != itemId);
    this._updateCart();
  }

  public clearCart(): void {
    this._items = [];
    this._updateCart();
  }
}
