import { Component, Input } from '@angular/core';
import { History } from '../../models/history.model';

@Component({
  selector: 'historylog',
  standalone: true,
  imports: [],
  templateUrl: './historylog.component.html',
  styleUrl: './historylog.component.css'
})
export class HistorylogComponent {
 @Input() history!: History;
constructor() {

}
}
