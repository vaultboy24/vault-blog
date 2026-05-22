---
applyTo: "**"
---

# Git Flow

## Branches

Cada tarefa tem sua própria branch. A base padrão é `develop`:

```
git checkout develop
git checkout -b feat/<nome-da-tarefa>
```

Nomenclatura segue o tipo do commit: `feat/`, `fix/`, `refactor/`, etc.

## Commits

- Todo commit passa pelo hook de pre-commit do Husky: os testes são executados automaticamente antes de cada commit. Se algum teste falhar, o commit é bloqueado
- Um commit por mudança lógica — pequeno e descritivo
- Formato: `feat: ...`, `fix: ...`, `refactor: ...` — sem escopo entre parênteses
- Nunca inclua `Co-Authored-By` ou atribuição de IA nas mensagens
- Múltiplos commits por PR são aceitos quando as mudanças são distintas

## Pull Requests

Crie PRs via `gh` CLI:

```
git push -u origin <branch>
gh pr create --title "..." --base develop --head <branch> --body "..."
gh pr view --web
```

A branch base padrão para PRs é `develop`. Use `main` apenas se explicitamente solicitado.

Após aprovação, faça merge em `develop`. Nunca faça merge em `main` sem solicitação explícita.

O corpo do PR deve ser escrito em **português** e incluir:
- O que foi feito
- Quais arquivos foram alterados e por quê
- Observações relevantes de comportamento
