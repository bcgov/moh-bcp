import { Component, Input } from '@angular/core';
import { getLineCount } from '../../models/helperFunc';

@Component({
  selector: 'bcp-multi-line-container',
  templateUrl: './multi-line-container.component.html',
  styleUrls: ['./multi-line-container.component.scss']
})
export class MultiLineContainerComponent {
  @Input() public value: string;

  get lineCount() {
    return getLineCount(this.value);
  }
}
