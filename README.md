
# Proyecto basado en React con Next.js y Tailwind

Este proyecto está basado en **React** con **Next.js** y **Tailwind CSS**, añadiendo algunas librerías pequeñas para la gestión de iconos, `iframe` o fuentes.

## Iniciar el proyecto

Primero, para iniciar el proyecto, debemos crear el archivo `.env.local`. Dentro de este archivo, es necesario definir tres variables:

```bash
NEXT_PUBLIC_API_URL = 'https://api.themoviedb.org/3'
NEXT_PUBLIC_API_IMAGE_URL = 'https://image.tmdb.org/t/p/original/'
NEXT_PUBLIC_API_KEY = 'TU_CLAVE_API_DE_TMDB'
```

Después, como en cualquier proyecto, instalamos las dependencias con el siguiente comando:

```bash
npm install
```

Finalmente, podemos ejecutar el proyecto con cualquiera de los siguientes comandos:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Luego, solo es necesario abrir [localhost:3000](http://localhost:3000) en el navegador para comenzar a usar el proyecto.

## Estructura del proyecto

El proyecto está diseñado para ser fácilmente mantenible y escalable, gracias al **code-splitting** y una buena estructura organizativa.

Las carpetas clave del proyecto son:

- **api**: Contiene todos los servicios utilizados para realizar las llamadas a la API (en este caso, la API de TMDB).
- **context**: Aquí se encuentra el archivo de configuración donde se almacenan los datos de la sesión de invitado.
- **interfaces**: Almacena todas las interfaces de los objetos utilizados en el proyecto.
- **ui**: Contiene todos los componentes reutilizables del proyecto.

## Endpoints

Los principales endpoints del proyecto son:

- **Home** (`/`): Página de inicio donde se muestran las listas de películas populares y un buscador en la parte superior.
- **/search**: Página de búsqueda, donde podremos filtrar los resultados a través del buscador.
- **/movies/{id}**: Vista detallada de una película. En esta página también encontraremos un formulario para calificar la película (es necesario iniciar sesión para poder calificar).
- **/mylist**: Sección donde podemos visualizar las notas dadas a las películas en una sesión.

## Cosas a tener en cuenta

- Al iniciar sesión, aparecerá en la parte inferior de la pantalla información relacionada con la sesión, incluyendo su duración.
- Si no has iniciado sesión, no podrás acceder a la sección **/mylist**.
- Si refrescamos la página, se eliminará la sesión actual, ya que el proyecto funciona como una **SPA** (Single Page Application).
- Parte del proyecto tiene responsive
- Se aplico el LazyCoding
