---
applyTo: "**"
---

# Funções

Sempre prefira declarações `function` nomeadas em vez de `const` com arrow function.

Use `function` para hooks, funções de serviço, handlers e qualquer lógica exportada ou de nível superior.

`const` com arrow function é aceitável apenas para callbacks inline (ex: dentro de `map`, `filter`, event handlers passados inline) ou quando exigido por uma API específica.

```ts
// ✅ correto
export function useAuth() { ... }
export function formatDate(date: Date): string { ... }
export function Hero() { ... }

// ❌ proibido
export const useAuth = () => { ... }
export const Hero = () => { ... }
```

## Separação de hooks

Em módulos de hook, separe as responsabilidades em dois tipos:

- **State hooks**: seletores somente-leitura que retornam estado (ex: `useIsAuthenticated`, `useCurrentUser`)
- **Action hooks**: hooks que retornam funções que acionam serviços ou mutações (ex: `useAuthService`, `usePostService`)

```ts
// ✅ state hook — apenas leitura
export function useCurrentUser() {
  const { user } = useContext(AuthContext);
  return user;
}

// ✅ action hook — retorna funções que chamam serviços
export function useAuthService() {
  function login(credentials: { email: string; password: string }) {
    return fetch("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) });
  }
  function logout() {
    return fetch("/api/auth/logout", { method: "POST" });
  }
  return { login, logout };
}
```
