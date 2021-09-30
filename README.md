# wchallenge
Accenture - Wolox Test

El presente código es el resultado de la actividad enviada por Accenture para validar el conocimiento en Node Js.

Se desarrolló la funcionalidad completa solicitada y a continuación están las instrucciones para la puesta en marcha.

## Instalaciones de plataforma:
- MySQL: Se sugiere usar Xampp por facilidad en caso de no tener el MySQL previamente instalado.
- Node JS: Se hizo el desarrollo usando la versión 4.17.6

## Configuraciones:
- Crear o usar un usuario con privilegios para crear bases de datos en MySQL. Crear las bases de datos vacias de wchallenge (development) y wchallenge_test (para los test). En la raíz de éste proyecto ubicar la carpeta "db" en donde se encuentran 3 scripts nombrados según su función. Ejecutar los scripts wchallenge.sql y wchallenge_test.sql. El rrchivo clean_test_db se ejecuta solo después de ejecutar los test para limpiar la base de datos de pruebas y dejarla lista`para una nueva ejecución.

- Renombrar el archivo .env.example como .env . Modificar el archivo .env ponendo los datos del usuario y puerto de la base de datos con los que se establecerá conexión. Por las características de Windows no toma las variables de entorno en los scripts del package.json. Así que para no complicarlo, simplemente se comentará y descomentarán las bases de datos "wchallenge" y "wchallenge_test" según la que se vaya a necesitar.

- Abrir el proyecto en VSCode, abrir una terminal y ejecutar "npm install".

- Para ejecutar el entorno de desarrollo:  "npm run dev" .

- Para ajecutar las pruebas: "npm test". Cada que se ejecute un ciclo de pruebas se debe limpiar la base de datos para que no se presenten errores no esperados. El set de pruebas bo está completo. Faltó añadir las que involucran token que son las de update de usuario y las relacionadas con las consultas de criptomoneda (porque siempre van amarradas al usuario en el token).

- Para generar la interfaz web de la documentación de la Api, ejecutar "npm run doc". Ésto activará un mini web server que en "http://localhost/5000" permitirá visualizar la guía de entradas y salidas. Se inició a trabajar también con swagger para dejar la documentación como una url en la ejecución. Al ejecutar el entorno de desarrollo normal en la ruta "/api/v1/doc" (solo es una muestra).

## Facilidades para uso de la Api:

- En la raíz del proyecto se incluyó el archivo Incomnia_wchallenge.json que puede importarse en la aplicación Insomnia para hacer las pruebas de los endpoints.

## Contacto:

- A Cualquier inquietud el respecto quedo atento por medio del email alxlopez@gmail.com
