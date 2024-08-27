import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';
import { AlertComponent } from "../alert/alert.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule, RouterLink, AlertComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription;
  permitirRegistro?: boolean;
  alertVisible: boolean = false;
  alertClase!: string;
  alertMensaje!: string;
  
  constructor(
    private configuracionServicio: ConfiguracionServicio
  ) {}
  
  ngOnInit() {
    this.subscription =
      this.configuracionServicio.configuracion$.subscribe (config =>           
        this.permitirRegistro = config?.permitirRegistro ?? false
      );
    
  }
  
  async guardar() {
    console.log("guardar configuracion");  
    try {
      const configuracion = {permitirRegistro: this.permitirRegistro};
      await this.configuracionServicio.updateConfiguracion(configuracion);
      this.alertClase = "alert-success";
      this.alertMensaje = "Configuración actualizada correctamente";
    }
    catch (error) {
      console.error("Configuración actualizada correctamente");
      this.alertClase = "alert-danger";
      this.alertMensaje = "Error al actualizar - " + error;
    }
    finally {
      this.alertVisible = true;
    }
  }

  alertCambioVisibilidad(esVisible: boolean) {
    this.alertVisible = esVisible
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}