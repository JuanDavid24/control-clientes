import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit {

  permitirRegistro?: boolean;
  
  constructor(
    private configuracionServicio: ConfiguracionServicio
  ) {}
  
  async ngOnInit() {
    try {
      const config = await this.configuracionServicio.getConfiguracion();
      this.permitirRegistro = config?.permitirRegistro ?? false;
    }
    catch(error) {
      this.permitirRegistro = false;
      console.error(error);
    }
  }
  
  guardar() {
    console.log("guardar configuracion");  
    const configuracion = {permitirRegistro: this.permitirRegistro};
    this.configuracionServicio.updateConfiguracion(configuracion);
  }
}