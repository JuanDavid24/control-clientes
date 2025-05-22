# ControlClientes
Esta aplicación fue hecha con Angular 17.3 y Firebase para almacemaniemto de datos y hosting. 

## Probar app
````https://control-clientes-cdf04.web.app/````

### Roles de usuario

| Rol      | Leer | Editar | Bloquear/desbloquear BD | Administrar Usuarios | 
| ----------- | ----------- | ----------- |----------- |----------- |
| Lector      | ✅ | ❌ | ❌ | ❌ | 
| Editor      | ✅ | ✅ | ❌ | ❌ | 
| Admin      | ✅ | ✅ | ✅ | Lector, Editor | 
| SAdmin      | ✅ | ✅ | ✅ | Lector, Editor, Admin | 

Si se registra en la aplicación con un correo electrónico, podrá ingresar como ```lector```. Para tener un rol más alto, solo se lo puede asignar un usuario ```admin``` o ```SAdmin```.

### Credenciales
Para probar todas las funcionalidades, usar las siguientes credenciales
- lector@control.com / lector123
- editor@control.com / editor123
- admin@control.com / admin123
- sadmin@control.com / sadmin123
