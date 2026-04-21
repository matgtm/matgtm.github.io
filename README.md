# Papers Fundamentales de NLP

Sitio estatico para ordenar resumenes de papers fundamentales de NLP, pensado para estudio y publicado via GitHub Pages.

## Stack

- Astro
- Contenido en Markdown (`src/content/papers`)
- Deploy con GitHub Actions

## Comandos

```bash
npm install
npm run seed
npm run dev
```

## Flujo de trabajo

1. `Lista.txt` funciona como semilla inicial de temas y papers.
2. `npm run seed` genera los Markdown base en `src/content/papers`.
3. Despues, el trabajo cotidiano se hace editando esos Markdown.

## Campos utiles por paper

- `status`: `pendiente`, `en progreso`, `leido` o `listo`.
- `writtenBy`: `sin completar`, `humano`, `codex` o `mixto`.
- `core`: `true` marca un paper como parte del nucleo posta.
- `memoryCue`: frase corta que aparece debajo del titulo en las tablas.

## Publicacion

1. Crear el repo publico `matgtm.github.io`.
2. Subir este proyecto al branch `main`.
3. En GitHub, verificar que Pages use GitHub Actions como fuente.
4. Cada push a `main` va a rebuildar y publicar el sitio.
