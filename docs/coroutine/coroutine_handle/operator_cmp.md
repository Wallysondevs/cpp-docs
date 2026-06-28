# operator==, operator&lt;=&gt;(std::coroutine_handle)

Definido no cabeçalho `[<coroutine>](<#/doc/header/coroutine>)`

```c
constexpr bool
operator==( std::coroutine_handle<> x, std::coroutine_handle<> y ) noexcept;
constexpr std::strong_ordering
operator<=>( std::coroutine_handle<> x, std::coroutine_handle<> y ) noexcept;
```

Compara dois valores [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<> x e y de acordo com seus endereços subjacentes.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de operator<=> e operator==, respectivamente.

### Parâmetros

- **x, y** — Valores [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<> para comparar

### Valor de retorno

1) x.address() == y.address()

2) [std::compare_three_way](<#/doc/utility/compare/compare_three_way>){}(x.address(), y.address())

### Observações

Embora esses operadores sejam sobrecarregados apenas para [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<>, outras especializações de [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>) também são comparáveis por igualdade (equality comparable) e comparáveis de três vias (three-way comparable), porque são implicitamente conversíveis para [std::coroutine_handle](<#/doc/coroutine/coroutine_handle>)<>.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo