---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript

## Type assertions

Nunca use `as` para fazer type cast. Sempre modele o tipo correto explicitamente.

```ts
// ❌ proibido
const user = response as UserCredentials;

// ✅ correto — tipar na fronteira
const user: UserCredentials = {
  token: response.token,
  name: response.name,
};
```

Se um cast com `as` parecer necessário, pare e corrija o tipo subjacente.

Isso inclui `as const` — nunca use. Em vez disso, tipifique o valor explicitamente com um tipo ou interface adequado.

```ts
// ❌ proibido
const directions = ["left", "right"] as const;

// ✅ correto
type Direction = "left" | "right";
const directions: Direction[] = ["left", "right"];
```
