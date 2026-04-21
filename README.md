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

- `status`: `no leido`, `en progreso`, `leido` o `listo`.
- `writtenBy`: `humano`, `codex` o `mixto` cuando toda la ficha tenga una voz clara.
- `sectionAuthors`: permite marcar secciones puntuales, por ejemplo `resumen: humano` o `metodo: codex`.
- `core`: `true` muestra la marca visual `Clave`.
- `memoryCue`: frase corta que aparece debajo del titulo en las tablas.

Ejemplo para una ficha donde vos escribiste las primeras secciones y Codex completo el resto:

```yaml
sectionAuthors:
  resumen: humano
  que-aporta: humano
  que-problema-resuelve: codex
  metodo: codex
  dataset-y-evaluacion: codex
  que-me-llamo-la-atencion: codex
```

## Publicacion

1. Crear el repo publico `matgtm.github.io`.
2. Subir este proyecto al branch `main`.
3. En GitHub, verificar que Pages use GitHub Actions como fuente.
4. Cada push a `main` va a rebuildar y publicar el sitio.
