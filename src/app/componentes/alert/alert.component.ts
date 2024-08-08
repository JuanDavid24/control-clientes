import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() mensaje: string = '';
  @Input() esVisible: boolean = false;
  @Input() tiempo: number = 4000;
  @Output() cambioVisibilidad = new EventEmitter<boolean>();

  ngOnChanges() {
    if (this.esVisible) 
      this.ocultarTrasTiempo()
  }

  ocultarTrasTiempo() {
    setTimeout( () => {
      this.esVisible = false;
      this.cambioVisibilidad.emit(this.esVisible)
    }, this.tiempo);
  }
}
