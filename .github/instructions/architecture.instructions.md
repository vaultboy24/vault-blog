---
applyTo: "**"
---

# Arquitetura — Next.js App Router

Siga rigorosamente esta arquitetura de pastas e todas as convenções descritas abaixo em **todo código que gerar** para este projeto.

## Estrutura de Pastas

```
├── app/                           # App Router do Next.js
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── api/[feature]/route.ts
│   ├── config/                    # Configurações globais (env, constantes)
│   ├── context/                   # React Context providers globais
│   ├── hooks/                     # Custom hooks de UI
│   ├── services/                  # Funções de acesso a APIs externas
│   ├── utils/
│   │   └── enums/                 # Enums globais (ex: rotas)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/                    # Componentes React reutilizáveis
│   ├── ui/                        # Átomos sem lógica de negócio
│   │   ├── button.tsx
│   │   └── input.tsx
│   └── [feature]/                 # Componentes com lógica — padrão Controller/View
│       ├── index.tsx              # único ponto de export público
│       ├── types.ts               # tipos compartilhados
│       ├── controller/
│       │   └── [feature].controller.tsx
│       └── view/
│           └── [feature].view.tsx
│
├── lib/                           # Funções utilitárias puras
│   └── utils.ts
│
└── tests/                         # Testes — espelham a estrutura do projeto
    ├── app/
    │   ├── config/
    │   ├── context/
    │   ├── hooks/
    │   └── services/
    └── components/
        └── [feature]/
            ├── controller/
            └── view/
```

## Convenções de Nomenclatura

- Pastas → `kebab-case`
- Componentes React → `PascalCase` para o export: `Button`, `HeaderController`
- Arquivos de componente → `kebab-case` com sufixo do tipo: `header.controller.tsx`, `header.view.tsx`
- Hooks → `camelCase` com prefixo `use`: `useAuth.ts`
- Enums → `kebab-case` com sufixo `-url`, `-type`, etc.: `routes-url.ts`
- Testes → sufixo `.spec.tsx`: `header.controller.spec.tsx`

## Path Aliases

Use sempre o alias `@/` — nunca imports relativos com `../../`:

```ts
// ✅ correto
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RoutesUrls } from "@/app/utils/enums/routes-url";

// ❌ proibido
import { Header } from "../../components/header";
```

Alias configurado no `tsconfig.json`: `@/*` → `./*` (raiz do projeto).

## Regras por Diretório

**`app/`**
- Páginas e layouts do Next.js App Router
- `services/` — apenas chamadas a APIs externas, sem lógica de UI
- `hooks/` — apenas hooks que consomem `services/` ou `context/`
- `context/` — apenas React Context; sem lógica de negócio direta

**`components/ui/`**
- Sem lógica de negócio
- Sem chamadas a serviços ou contextos
- Recebem apenas props

**`components/[feature]/controller/`**
- Lógica, handlers e dados do componente
- Pode consumir `app/services/`, `app/hooks/`, `app/context/`
- Nunca renderiza HTML diretamente — delega para a View

**`components/[feature]/view/`**
- Apenas renderização
- Recebe tudo via props — zero lógica própria

**`lib/`**
- Funções puras sem estado
- Sem imports de React, Next.js ou qualquer serviço
