import { Directive, HostListener } from '@angular/core';

import { Observable } from 'rxjs';

import { ComponentCanDeactivate } from '@shared/shared-form/types';

@Directive()
export class FormCanDeactivate implements ComponentCanDeactivate {
  canDeactivate(): boolean | Observable<boolean> {
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): BeforeUnloadEvent {
    if (!this.canDeactivate()) {
      event.returnValue = 'Unsaved';
    }
    return event;
  }
}
