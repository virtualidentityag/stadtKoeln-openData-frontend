# Stadt Koeln - Open Data Frontend

## Tech stack

- [Vituum](https://vituum.dev/)
- [ViteTwig](https://github.com/vituum/vite-plugin-twig)
- [Bootstrap](https://getbootstrap.com/)

## Getting Started

You need PNPM installed.

### Installing Dependencies

```sh
pnpm i
```

### Run development mode

```sh
pnpm dev
```

### Build and preview

```sh
pnpm build
pnpm preview
```

## Folder Structure

```sh
stadtkoeln-opendata-frontend
📁 public # Contains publicly accessible files. Serve static assets
📁 src
  📁 layouts # Layout templates that define the structure of pages.
  📁 pages # Actual content pages. These are use to generate final HTML.
  📁 partials # Reusable components.
  📁 styles # SCSS Stylesheets.
```

## Standards

### Code Quality

The repository is setup with Prettier for formatting. Run `pnpm format` to run prettier.
