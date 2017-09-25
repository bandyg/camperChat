import { NgModule } from '@angular/core';
import { KeyboardAttachDirective } from './keyboard-attach/keyboard-attach';
import { LogElmDirective } from './log-elm/log-elm';

@NgModule({
	declarations: [KeyboardAttachDirective, LogElmDirective],
	imports: [],
	exports: [KeyboardAttachDirective, LogElmDirective]
})
export class DirectivesModule {}
