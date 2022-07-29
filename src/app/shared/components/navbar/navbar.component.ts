import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/model/user/user.model';


@Component({
  selector: 'app-navbar',
  animations: [
    trigger('collapsable', [
      state('opened', style({
        width: '50rem',
      })),
      state('closed', style({
        width: '0',
      })),
      transition('opened<=>closed', [
        animate('0.7s cubic-bezier(0.22, 1, 0.36, 1)')
      ]),

    ])
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;
  @Input() navBarStatus: string;
  @Output() navBarStatusChange = new EventEmitter<string>();
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeMenu();
  }


  constructor(private auth: AuthService) {
    this.auth.currentUser$.subscribe(u => u = this.user);
  };


  closeMenu() {
    return this.navBarStatusChange.emit('closed')
  };


  ngOnInit(): void {
    this.navBarStatus = 'closed'
  };

}
