# Vault Blog

Blog pessoal construído com Next.js App Router, seguindo arquitetura Controller/View e tipagem estrita com TypeScript.

## Concept

Vault Blog é uma plataforma de blog pessoal com foco em arquitetura limpa e manutenibilidade. O projeto adota o padrão Controller/View para separação de responsabilidades nos componentes, garantindo que lógica de negócio e renderização nunca se misturem. A estrutura de pastas reflete diretamente as responsabilidades de cada módulo, facilitando navegação e testes.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Primitives | [Base UI](https://base-ui.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| CSS Variants | [class-variance-authority](https://cva.style/) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| Testing | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Git Hooks | [Husky](https://typicode.github.io/husky/) |

## Getting Started

**Pré-requisitos:** Node.js 20+

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint |
| `npm test` | Executa os testes unitários |
| `npm run test:watch` | Executa os testes em modo watch |

## Project Structure

```
├── app/                    # App Router do Next.js
│   ├── (pages)/            # Páginas e layouts
│   ├── config/             # Configurações globais (env, constantes)
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom hooks de UI
│   ├── services/           # Funções de acesso a APIs externas
│   └── utils/              # Enums e mocks
├── components/             # Componentes React
│   ├── ui/                 # Átomos sem lógica de negócio
│   └── [feature]/          # Componentes com padrão Controller/View
├── lib/                    # Funções utilitárias puras
└── tests/                  # Testes — espelham a estrutura do projeto
```

## Architecture

O projeto segue o padrão **Controller/View** para todos os componentes de feature:

- **Controller** (`controller/[feature].controller.tsx`): contém lógica, handlers e consumo de serviços. Nunca renderiza HTML diretamente.
- **View** (`view/[feature].view.tsx`): apenas renderização via props. Zero lógica própria.
- **index.tsx**: único ponto de export público do componente.

Path aliases: use sempre `@/` — nunca imports relativos com `../../`.

```ts
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
```

## Testing

Os testes ficam em `tests/` espelhando a estrutura do projeto. Arquivos de teste usam sufixo `.spec.tsx`.

```bash
npm test             # executa todos os testes
npm run test:watch   # modo watch
```

O Husky executa os testes automaticamente no pre-commit — commits só passam se os testes passarem.

## CI/CD

O pipeline de CI é definido em `.github/workflows/workflow.ymal` e executa em todos os Pull Requests.

```
PR aberto
    │
    ▼
[test] — ubuntu-latest
  - Setup Node.js 20 (cache npm)
  - npm ci
  - npm test -- --run
```

**Cache:** dependências npm são cacheadas pelo `actions/setup-node`.

## Copilot Customizations

### Instructions

| Arquivo | applyTo | Descrição |
|---|---|---|
| `architecture.instructions.md` | `**` | Estrutura de pastas e padrão Controller/View |
| `code-style.instructions.md` | `**` | Proíbe comentários no código |
| `components.instructions.md` | `components/**,app/**` | Regras para criação de componentes |
| `errors.instructions.md` | `**` | Tratamento de erros e validação antes de entregar |
| `functions.instructions.md` | `**` | `function` vs `const arrow`, separação de hooks |
| `git-flow.instructions.md` | `**` | Branches, commits e criação de PRs |
| `readme.instructions.md` | `README.md` | Modelo obrigatório de README |
| `stack.instructions.md` | `**` | Package manager e tecnologias da stack |
| `typescript.instructions.md` | `**/*.ts,**/*.tsx` | Convenções TypeScript |

### Prompts

| Arquivo | Descrição |
|---|---|
| `create-pr.prompt.md` | Cria um Pull Request seguindo o git flow do projeto |
| `update-readme.prompt.md` | Reescreve o README lendo as fontes do projeto |

### Agentes

| Arquivo | Descrição | Tools |
|---|---|---|
| `architecture-guard.agent.md` | Revisa código em busca de violações arquiteturais | `read`, `search` |
| `customization-architect.agent.md` | Decide e cria o primitivo de customização correto | `read`, `search`, `edit`, `ask-questions` |
| `customization-auditor.agent.md` | Audita todos os primitivos e verifica classificação correta | `read`, `search` |

### Skills

| Nome | Descrição |
|---|---|
| `create-component` | Cria um feature component completo seguindo o padrão Controller/View |
| `create-tests` | Cria testes unitários para feature components, hooks, serviços e utilitários |

## Git Flow

Cada tarefa tem sua própria branch a partir de `develop`:

```bash
git checkout develop
git checkout -b feat/<nome-da-tarefa>
```

**Commits:** `feat: ...`, `fix: ...`, `refactor: ...`, `test: ...`, `docs: ...` — sem escopo entre parênteses, sem `Co-Authored-By`.

**Pull Requests:** base padrão é `develop`. Use `gh pr create` para criar via CLI. O corpo do PR deve ser escrito em português e incluir o que foi feito, arquivos alterados e observações relevantes.
