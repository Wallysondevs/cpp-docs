# std::suspend_never

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
struct suspend_never;
```

`suspend_never` é uma classe vazia que pode ser usada para indicar que uma [expressão await](<#/doc/language/coroutines>) nunca suspende e não produz um valor.

### Funções Membro

await_ready | indica que uma expressão await nunca suspende
(função membro pública)
await_suspend | no-op
(função membro pública)
await_resume | no-op
(função membro pública)

## std::suspend_never::await_ready

constexpr bool await_ready() const noexcept { return true; }

Sempre retorna true, indicando que uma expressão await nunca suspende.

## std::suspend_never::await_suspend

constexpr void await_suspend( [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<> ) const noexcept {}

Não faz nada.

## std::suspend_never::await_resume

constexpr void await_resume() const noexcept {}

Não faz nada. Uma expressão await não produz um valor se `suspend_never` for usada.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ suspend_always](<#/doc/coroutine/suspend_always>)(C++20) | indica que uma await-expression deve sempre suspender
(classe)