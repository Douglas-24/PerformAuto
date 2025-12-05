import { Directive, Input, ElementRef, HostListener, inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipsDinamic } from '../../shared/tooltips-dinamic/tooltips-dinamic';
@Directive({
  selector: '[appTooltipDirective]'
})
export class TooltipDirective {
  @Input('appTooltipDirective') message = ''
  private overlayRef: OverlayRef | null = null;
  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);


  @HostListener('mouseenter')
  show() {
    if (!this.overlayRef) {
      const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([{
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        }]);

      this.overlayRef = this.overlay.create({ positionStrategy });
    }

    const tooltipPortal = new ComponentPortal(TooltipsDinamic);
    const tooltipRef = this.overlayRef.attach(tooltipPortal);
    tooltipRef.instance.message = this.message;
  }

  @HostListener('mouseleave')
  hide() {
    this.overlayRef?.detach();
  }
}
