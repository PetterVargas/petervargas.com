# petervargas.com

Sitio personal de **Peter Vargas** — Ingeniero en Ciberseguridad y fundador de
[DivisionCero](https://divisioncero.com/), Kudo y CyberAcademy.

Construido con [Next.js](https://nextjs.org) (App Router) y
[Fumadocs](https://fumadocs.dev), exportado como sitio estático
([Static Export](https://nextjs.org/docs/app/guides/static-exports)).

## Stack

- **Next.js 16** (App Router, `output: 'export'`)
- **Fumadocs** (`fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`) para el contenido en MDX y la búsqueda
- **Tailwind CSS 4**
- **GSAP** para animaciones del home
- **@next/third-parties** (Google Analytics)
- Gestor de paquetes: **pnpm**

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000 para ver el resultado.

Otros comandos:

```bash
pnpm build         # build + export estático (carpeta `out/`)
pnpm start          # sirve la carpeta `out/` generada
pnpm types:check     # regenera tipos de Fumadocs y corre tsc --noEmit
pnpm photos:update    # trae y procesa las fotos de Unsplash para /fotos (ver sección Fotos)
```

## Estructura del proyecto

```
app/
  (home)/         # Landing, blog y galería de fotos
    page.tsx
    blog/
    fotos/
  (docs)/         # Layout y páginas de documentación (Fumadocs) — route group, sin
                  # segmento en la URL: content/docs/*.mdx se sirve en la raíz
                  # (/proyectos, /experiencia, /educacion, /use), no bajo /docs
  api/search/     # Route handler de búsqueda
  og/             # Generación de imágenes OG (docs/blog)
  llms.txt, llms-full.txt, llms.mdx/  # Salidas para consumo por LLMs

content/
  docs/           # proyectos, experiencia, educacion, use (MDX)
  blog/           # posts del blog (MDX)

components/       # UI: nav flotante, hero, galería, animaciones, mdx, search
lib/
  source.ts        # adaptador de contenido (loader de Fumadocs)
  shared.ts         # metadata del sitio (nombre, descripción, URLs, redes)
  layout.shared.tsx  # opciones de layout compartidas

scripts/
  fetch-photos.ts    # descarga las fotos de la colección de Unsplash
  process-photos.ts   # las redimensiona/comprime a .webp y genera public/fotos/index.json
```

### Secciones del sitio

| Ruta                    | Descripción                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| `/`                      | Landing page                                                        |
| `/proyectos`, `/experiencia`, `/educacion`, `/use` | Perfil (contenido de `content/docs/*.mdx`), servido en la raíz — sin prefijo `/docs` |
| `/blog`                  | Notas sobre ciberseguridad, óptica personal y aprendizaje continuo   |
| `/fotos`                 | Galería de fotos, tomadas de una colección de Unsplash              |
| `/api/search`            | Endpoint de búsqueda (Fumadocs)                                     |
| `/og/docs`, `/og/blog`   | Imágenes Open Graph generadas dinámicamente                         |
| `/llms.txt`, `/llms-full.txt`, `/llms.mdx` | Contenido del sitio en formato apto para LLMs           |

Las rutas `/docs/*` existieron en una versión anterior del sitio; `public/_redirects` las
redirige (301) a su equivalente sin el prefijo, para no perder SEO de URLs ya indexadas ni
dejar contenido duplicado.

## SEO

El sitio incluye buenas prácticas de SEO: metadata por página, JSON-LD
(`BlogPosting`, etc.) en posts del blog, imágenes OG dinámicas por
ruta y contenido expuesto en `llms.txt`/`llms-full.txt` para
descubribilidad por asistentes de IA. La configuración central de metadata
(nombre del sitio, descripción, URL canónica) vive en `lib/shared.ts`. Las redirecciones
301 de rutas legadas viven en `public/_redirects` (formato Cloudflare Pages)

## Contenido

Los textos del perfil (`content/docs/*.mdx`) y del blog (`content/blog/*.mdx`)
se editan directamente como MDX. El orden y las secciones visibles en el perfil
se controlan en `content/docs/meta.json`.

## Enlaces

- Sitio: https://petervargas.com
- Proyecto principal: https://divisioncero.com
- GitHub: https://github.com/PetterVargas
