import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BUSINESS_NAME } from '@app/constants';
import { SvgIconComponent } from 'angular-svg-icon';
import { CartService } from '@app/services/cart.service';
import { Pages } from '@app/pages';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, SvgIconComponent],
  template: `
    <nav class="w-full mb-4">
      <div
        class="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between py-3 border-b border-gray-300"
      >
        <div class="flex items-center gap-x-12">
          <a class="block text-lg font-semibold" [routerLink]="pages.HOME">
            {{ businessName }}
          </a>
          <div class="text-sm flex gap-x-4">
            <a [routerLink]="pages.HOME">Inicio</a>
            <a [routerLink]="pages.PRODUCTS">Productos</a>
            <a [routerLink]="pages.ABOUT_US">Sobre mí</a>
            <a [routerLink]="pages.CONTACT">Contactar</a>
          </div>
        </div>
        <div class="flex items-center gap-x-3">
          <button
            class="flex items-center gap-x-2 rounded p-2"
            [routerLink]="pages.PRODUCTS"
          >
            <svg-icon src="assets/svg/search.svg" class="icon-md" />
            <span class="text-sm">Buscar</span>
          </button>
          <a
            [routerLink]="pages.CART"
            class="flex items-center gap-x-2 text-sm"
          >
            <svg-icon src="assets/svg/shopping-bag.svg" class="icon-md" />
            <span> Carrito {{ countLabel() }} </span>
          </a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  public itemCount = inject(CartService).itemCount;
  public businessName: string = BUSINESS_NAME;
  public pages = Pages;

  public countLabel = computed<string>(() => {
    return this.itemCount() > 9 ? '(+9)' : `(${this.itemCount()})`;
  });
}
