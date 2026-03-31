# MyPortfolio

Portafolio personal desarrollado con Angular para presentar proyectos, tecnologías y experiencia profesional.

## Demo

- Repositorio: <https://github.com/Denys392/denys392.github.io>
- Web: <https://denys392.github.io/>

## Características

- Landing page con secciones: **Hero**, **About**, **Skills**, **Projects Latest** y **Contact**.
- Página de proyectos con listado completo.
- Página de detalle por proyecto usando rutas dinámicas (`/projects/:slug`).
- Datos desacoplados en archivos JSON dentro de `public/data`.
- Formulario de contacto integrado con **Web3Forms** y captcha.
- Página `Not Found` para rutas no válidas.
- Un CSS adecuado para toda la página.

## Stack técnico

- Angular 21 (standalone components)
- TypeScript
- RxJS
- Tailwind CSS 4
- Vitest (unit testing)

## Estructura principal


src/
	app/
		core/
			models/
			services/
		features/
			landing/
			projects/
		layout/
		shared/
	environments/
public/
	data/
	images/


## Rutas

- `/` → Landing
- `/projects` → Lista de proyectos
- `/projects/:slug` → Detalle de proyecto
- `**` → Not Found

## Configuración de contenido

Edita los siguientes archivos para actualizar tu portafolio sin tocar componentes:

- `public/data/site.json`: título, descripción, sección “about”, redes/contacto y proyectos visibles (`projectShow`).
- `public/data/profile.json`: datos personales y enlaces sociales.
- `public/data/projects.json`: catálogo de proyectos.
- `public/data/technologies.json`: tecnologías disponibles.

## Variables y claves

Cambiar el nombre de environment.copy.ts a environment.ts

La clave del formulario de Web3Forms se debe de colocar en environment.ts:
- `src/environments/environment.ts`

Campos actuales:

- `web3formsAccessKey`


## Desarrollo local

### 1) Instalar dependencias

```bash
npm install
```

### 2) Levantar servidor

```bash
npm start
```

Aplicación disponible en: <http://localhost:4200>

## Build de producción

```bash
npm run build
```

Salida en `dist/`.

## Autor

- **Denys Chafloque**
- LinkedIn: <https://www.linkedin.com/in/denys-chafloque-neciosup>
- GitHub: <https://github.com/Denys392>
