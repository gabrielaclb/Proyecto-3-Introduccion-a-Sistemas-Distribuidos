
# Proyecto 3. Introduccion a Sistemas Distribuidos 😀

Para realizar la instalación, descargar el proyecto, y en la carpeta raiz ejecutar el comando `docker-compose up -d`.

Importar luego la colección de postman, donde estaran todas las peticiones al proxy.

La aplicación tienen dos tipos de usuarios, los admins, y los lectores, pueden subir los posteos los usuarios registrados

Las peticiones se realizan proxy inverso alojado en el puerto 8000, que dependiendo del primer path se delega la peticion al servicio correspondiente.

Ambos servicios apuntan a su base de datos correspondiente, y manejan un pool interno de conexiones cada una.

La base de datos son persistentes ya que se crea antes un volumen unico para cada base de datos.

Al crear la base de datos, se importa un ".sql" con el schema.

Todos los servicios se conectan a un Logger creada con Node.js, que almacena los logs usando Winston.

El servicio de Posteos maneja una conexion con Redis para enviar una cache de los posteos sin tener que acceder a la base de datos.

Para ver todos los logs, el logger tiene expuesto el puerto 8002 una interfaz grafica para visualizarlo.

Todos los servicios notifican al logger las peticiones HTTP que reciben y pudieran notificar otro tipo de información de manera rapida enviando el mensaje y el tipo de mensaje ("Error", "Info", "Warn", etc)