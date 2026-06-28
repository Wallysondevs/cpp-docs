# std::suspend_always

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
struct suspend_always;
```

`suspend_always` é uma classe vazia que pode ser usada para indicar que uma [expressão await](<#/doc/language/coroutines>) sempre suspende e não produz um valor.

### Funções membro

await_ready | indica que uma expressão await sempre suspende
(função membro pública)
await_suspend | no-op
(função membro pública)
await_resume | no-op
(função membro pública)

## std::suspend_always::await_ready

constexpr bool await_ready() const noexcept { return false; }

Sempre retorna false, indicando que uma expressão await sempre suspende.

## std::suspend_always::await_suspend

constexpr void await_suspend( [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<> ) const noexcept {}

Não faz nada.

## std::suspend_always::await_resume

constexpr void await_resume() const noexcept {}

Não faz nada. Uma expressão await não produz um valor se `suspend_always` for usado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ suspend_never](<#/doc/coroutine/suspend_never>)(C++20) | indica que uma await-expression nunca deve suspender
(classe)