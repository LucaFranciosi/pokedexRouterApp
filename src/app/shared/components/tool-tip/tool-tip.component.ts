import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss'],

})
export class ToolTipComponent {
  @Input() user: User;
}
