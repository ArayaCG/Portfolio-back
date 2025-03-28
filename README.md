# Portfolio Backend

Este es un proyecto de backend para un portfolio personal, desarrollado con tecnologías modernas para garantizar un rendimiento eficiente y una gestión sencilla.

## 🚀 Tecnologías Utilizadas

### Lenguajes y Entorno
- **TypeScript**: Lenguaje de programación con tipado estático
- **Node.js**: Entorno de ejecución para JavaScript en el servidor

### Framework y Librerías
- **Express**: Framework para creación del servidor y gestión de rutas
- **TypeORM**: ORM para interacción con base de datos PostgreSQL
- **Multer**: Middleware para manejo de carga de archivos
- **Nodemailer**: Envío de correos electrónicos
- **JsonWebToken (JWT)**: Autenticación y generación de tokens
- **Bcrypt**: Encriptación de contraseñas
- **Axios**: Cliente HTTP para solicitudes
- **Redis**: Almacenamiento en caché
- **Swagger**: Documentación de API

### Servicios y Bases de Datos
- **Cloudinary**: Gestión y almacenamiento de imágenes en la nube
- **PostgreSQL**: Sistema de gestión de bases de datos relacional
- **Redis**: Base de datos en memoria para caché

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- PostgreSQL
- Redis

## 🔧 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ArayaCG/Portfolio.git
   cd Portfolio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example` proporcionado. Asegúrate de configurar:
   - Credenciales de PostgreSQL
   - Configuración de Redis
   - Credenciales de Cloudinary
   - Configuraciones de JWT
   - Credenciales de correo electrónico
   - Configuración de admin

   Ejemplo de configuración mínima:
   ```
   PORT=3000
   HOST_REDIS=localhost
   PORT_REDIS=6379
   JWT_SECRET=tu_secreto_jwt
   PASSWORD_POSTGRE=tu_password_postgres
   BASE_DATOS=nombre_base_datos
   EMAIL_USER=tu_correo@example.com
   EMAIL_PASS=tu_contraseña_app
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   USERNAME_ADMIN=admin
   PASSWORD_ADMIN=admin_password
   ```

## 🗃️ Configuración de Redis

### Instalación de Redis

#### En macOS
```bash
brew install redis
brew services start redis
```

#### En Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis.service
```

#### En Windows
1. Descarga el instalador de Redis desde el sitio oficial
2. Instala el servicio de Redis
3. Inicia el servicio desde el Administrador de servicios de Windows

### Verificar la instalación de Redis
```bash
redis-cli ping
```
Si devuelve "PONG", la instalación es correcta.

4. Inicia el servidor:
   ```bash
   npm start
   ```

## 📚 Documentación de la API
La documentación de la API está disponible mediante Swagger. Accede a `/docs` para ver la documentación interactiva.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/nueva-caracteristica`)
3. Confirma tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Sube tu rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia ISC.

## 🛠️ Mantenimiento

Para cualquier problema o sugerencia, por favor abre un issue en el repositorio de GitHub.
