import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/common/components/dropdown/dropdown.component';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './user-dropdown.component.html',
  styles: [
  ]
})
export class UserDropdownComponent {

}
