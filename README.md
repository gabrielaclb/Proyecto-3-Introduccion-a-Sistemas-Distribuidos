
# Tarea 2 Distribuida 😀

Para realizar la instalación, descargar el proyecto, y en la carpeta raiz abrir la terminal y ejecutar las lineas de comando que estan en el archivo "bash.txt"

Importar luego la colección de postman, donde estaran todas las peticiones al proxy que apunta a los BFF.

La aplicación tienen dos tipos de usuarios, los admins, y los lectores, solo pueden subir posteos los administradores(donde suben el titulo y el contenido)

Hay dos BFF: Desktop y Mobile.

- Desde el BFF Desktop puedes realizar todas las operaciones de un usuario y un administrador.

- Desde el BFF Mobile solo se puede realizar las operaciones que un usuario comun puede realizar. (En caso de realizar una petición de administrador, se recibirá un mensaje de no disponible)

Dependiendo al BFF consultado, el contenido retornará una imagen (usando la libreria Lorem Picsum) con distintas dimensiones adaptadas al dispositivo.

Las peticiones se realizan prooxy inverso alojado en el puerto 8000, que dependiendo del primer path (si es "/desktop" o "/mobile") se encargar de transmitir la peticion al BFF correspondiente.

Los BFF se conectan al puerto 8001, donde se encuentra otro proxy con el mismo funcionamiento que redirige dependiendo el path las peticiones a los servicios ("/auth" para los temas de usuario, "/posts" para los temas de posteos)

Ambos servicios apuntan a su base de datos correspondiente, y manejan un pool interno de conexiones cada una.

La base de datos son persistentes ya que se crea antes un volumen unico para cada base de datos.

Al crear la base de datos, se importa un ".sql" con el schema.

Todos los servicios se conectan a un Logger creada con Node.js, que almacena los logs usando Winston.

Para ver todos los logs, el logger tiene expuesto el puerto 8002 una interfaz grafica para visualizarlo.

Todos los servicios notifican al logger las peticiones HTTP que reciben y pudieran notificar otro tipo de información de manera rapida enviando el mensaje y el tipo de mensaje ("Error", "Info", "Warn", etc)

😀😀😀😀😀😀
