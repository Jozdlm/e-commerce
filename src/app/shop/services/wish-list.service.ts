import { Injectable, signal, computed } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IWishItem, IWishList } from '../wish-list';
import { IProduct, ProductOption } from 'src/app/store/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private _wishItems = signal<IWishItem[]>([]);

  public wishList = computed<IWishList>(() => ({
    id: '1',
    items: this._wishItems(),
    count: this._wishItems().length
  }));

  constructor() {}

  public addToWish(product: IProduct, option: ProductOption): void {
    const currItem = this._wishItems().find(
      (i) => i.product_id == product.id && i.type == option.type
    );

    if (currItem) return;

    const wishItem: IWishItem = {
      id: uuid(),
      product_id: product.id,
      name: product.name,
      description: product.description,
      type: option?.type || product.options[0].type,
      price: option?.price || product.options[0].price,
      img_url: product.img_url,
    };

    this._wishItems.mutate((items) => items.push(wishItem));
  }
}
