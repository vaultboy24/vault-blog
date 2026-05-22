---
applyTo: "components/**,app/**"
---

# Componentes

## Declaração

Sempre use `export function` nomeado para componentes. Nunca use `const` arrow function como export padrão.

## Estrutura de componente simples (UI)

Componentes atômicos reutilizáveis sem lógica de negócio ficam em `components/ui/`:

```
components/ui/
├── button.tsx
└── input.tsx
```

## Estrutura de componente com lógica (Controller/View)

Componentes com lógica de negócio ou handlers seguem o padrão Controller/View:

```
components/header/
├── index.tsx                        # único ponto de export público
├── types.ts                         # tipos compartilhados entre controller e view
├── controller/
│   └── header.controller.tsx        # lógica, handlers, dados
└── view/
    └── header.view.tsx              # apenas renderização, recebe props
```

O `index.tsx` re-exporta o Controller como nome público do componente:

```ts
import { HeaderController } from "./controller/header.controller";

export { HeaderController as Header };
```

## Variantes de estilo

Use `cva` (class-variance-authority) para variantes de estilo em componentes UI. Presets de variantes ficam no mesmo arquivo do componente.

```ts
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: { primary: "...", outline: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
```

## Testes

Testes ficam em `tests/` espelhando a estrutura de `components/`:

```
tests/components/header/controller/header.controller.spec.tsx
```

## Tema

Sempre use tokens do tema em vez de valores de cor hardcoded.

Para classes Tailwind, use tokens semânticos (ex: `text-foreground`, `bg-background`, `text-primary`) em vez de valores arbitrários (ex: `text-[#171717]`, `bg-white`).

Defina tokens no `globals.css` via CSS custom properties e os exponha ao Tailwind v4 via `@theme`.

```css
/* ✅ correto — globals.css */
@theme {
  --color-primary: #...;
  --color-foreground: #...;
}
```

```tsx
/* ✅ correto — componente */
<p className="text-foreground bg-background">
```
