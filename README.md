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
```

## Estructura del proyecto

```
app/
  (home)/         # Landing, blog y galería de fotos
    page.tsx
    blog/
    fotos/
  docs/           # Layout y páginas de documentación (Fumadocs)
  api/search/     # Route handler de búsqueda
  og/             # Generación de imágenes OG (docs/blog)
  llms.txt, llms-full.txt, llms.mdx/  # Salidas para consumo por LLMs

content/
  docs/           # index, proyectos, experiencia, educacion (MDX)
  blog/           # posts del blog (MDX)

components/       # UI: nav flotante, hero, galería, animaciones, mdx, search
lib/
  source.ts        # adaptador de contenido (loader de Fumadocs)
  shared.ts         # metadata del sitio (nombre, descripción, URLs, redes)
  layout.shared.tsx  # opciones de layout compartidas
```

### Secciones del sitio

| Ruta                    | Descripción                                                        |
| ------------------------ | ------------------------------------------------------------------- |
| `/`                      | Landing page                                                        |
| `/docs`                  | Perfil: proyectos, experiencia y educación                          |
| `/blog`                  | Notas sobre ciberseguridad, óptica personal y aprendizaje continuo   |
| `/fotos`                 | Galería de fotos                                                     |
| `/api/search`            | Endpoint de búsqueda (Fumadocs)                                     |
| `/og/docs`, `/og/blog`   | Imágenes Open Graph generadas dinámicamente                         |
| `/llms.txt`, `/llms-full.txt`, `/llms.mdx` | Contenido del sitio en formato apto para LLMs           |

## SEO

El sitio incluye buenas prácticas de SEO: metadata por página, JSON-LD
(`BlogPosting`, etc.) en posts del blog, imágenes OG dinámicas por
ruta y contenido expuesto en `llms.txt`/`llms-full.txt` para
descubribilidad por asistentes de IA. La configuración central de metadata
(nombre del sitio, descripción, URL canónica) vive en `lib/shared.ts`.

## Contenido

Los textos del perfil (`content/docs/*.mdx`) y del blog (`content/blog/*.mdx`)
se editan directamente como MDX. El orden y las secciones visibles en `/docs`
se controlan en `content/docs/meta.json`.

## Enlaces

- Sitio: https://petervargas.com
- Proyecto principal: https://divisioncero.com
- GitHub: https://github.com/PetterVargas
