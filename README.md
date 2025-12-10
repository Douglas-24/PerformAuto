# 🛠️ Proyecto Web para la Gestión de Talleres Mecánicos

Este repositorio contiene la aplicación completa para la **gestión integral de talleres mecánicos**. El proyecto está dividido en un **Backend** (API) y un **Frontend** (Interfaz de Usuario).

## 💡 Stack Tecnológico

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Backend (API)** | **NestJS** | Framework de Node.js para construir una API robusta y escalable. |
| **ORM / DB Access** | **Prisma** | Moderno ORM para la interacción con la base de datos. |
| **Frontend (UI)** | **Angular** | Framework para la construcción de la interfaz de usuario interactiva. |
| **Estilos** | **Tailwind CSS** | Framework CSS utility-first para un diseño rápido y personalizable. |
| **Base de Datos** | **MySQL** | Sistema de gestión de bases de datos relacionales. |

---

## 🚀 Guía de Inicialización

### Requisitos Previos

Asegúrate de tener instalado lo siguiente:

* **Node.js y npm** (versión recomendada: v18+).
* **Angular CLI** globalmente:
    ```bash
    npm install -g @angular/cli
    ```
* Una instancia de **MySQL** o un motor de base de datos compatible listo para conectarse.

### 1. Preparación Inicial

Clona el repositorio:

```bash
git clone https://github.com/Douglas-24/PerformAuto.git
```

### 2. Configuración del Backend (NestJS + Prisma)
### 1. Instalacioón de dependencias
Navega al directorio del backend e instala las dependencias
```bash
cd ../back
npm install
# O usando npm i
```

#### 2. Generar Cliente Prisma
Genera el cliente para que NestJS pueda interactuar con la base de datos.
```bash
npx prisma generate
```

#### 3. Ejecutar Migraciones
Crea la base de datos y aplica la migración inicial
```bash
npx prisma migrate dev --name init
```
Nota: Este comando crea la base de datos si no existe y aplica los cambios definidos en tu esquema de Prisma.

#### 4. Ejecutar Seeders (Datos Iniciales)
Datos de prueba
```bash
npm run seed
```
#### 5. Iniciar el Servidor del Backend
Finalmente, inicia el servidor de NestJS:
```bash
npm run start:dev
```
🖥️ Frontend (Angular)
El frontend está desarrollado con Angular.

1. Instalación de Dependencias
Instala todas las dependencias de la aplicación Angular:
```
cd ../front
npm install
```
#### 2. Iniciar el Servidor del Frontend
Inicia el servidor de desarrollo de Angular:
```bash
ng serve
```

