# Tests postman

## Configurar entorno
1. Crear un nuevo workspace en Postman
2. Importar los archivos de la carpeta `collections`. 
3. Importar las variables **globales** y de **entorno** de la carpeta `env`
4. Correr las pruebas en el entorno `Credenciales`

## Conformación de las pruebas

#### Colecciones
Hay una colección para cada **rol de usuario**:
- Lector
- Editor
- Admin
- Superadmin

#### Auth
Obtiene el token de sesión de un usuario con el rol correspondiente. 

#### Clientes
Pruebas que impactan sobre la base de datos de clientes. 

#### Usuarios
Pruebas que impactan sobre los datos de usuarios de la aplicación.

> **Autorizados y no autorizados**
> Tanto para las pruebas de Clientes como de Usuarios, en los casos necesarios se dividen en carpetas según si la operación es o no permitida por las reglas de seguridad del backend.

#### Limpiar BD
Al ejecutarse, **limpia los datos generados en las pruebas de la colección correspondiente**. Puntualmente, el usuario creado en los casos en que el rol que se está testeando no tiene permisos para eliminarlo. Por esta razón, usa las credenciales del superadmin.

#### Sobre las variables
***Los valores que toman están automatizados*** en los casos que se consideró necesario para que no haya que modificar ni traspasar ningún valor manualmente para hacer funcionar los tests.