# std::bit_or&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class bit_or<void>;
```

`[std::bit_or](<#/doc/utility/functional/bit_or>)<void>` é uma especialização de `[std::bit_or](<#/doc/utility/functional/bit_or>)` com tipo de parâmetro e de retorno deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | `[unspecified](<#/doc/utility/functional>)`

### Funções membro

** operator()** | aplica `operator|` a lhs e rhs
(função membro pública)

## std::bit_or&lt;void&gt;::operator()

template< class T, class U >
constexpr auto operator()( T&& lhs, U&& rhs ) const
-> decltype([std::forward](<#/doc/utility/forward>)&lt;T&gt;(lhs) | [std::forward](<#/doc/utility/forward>)&lt;U&gt;(rhs));

Retorna o resultado de `[std::forward](<#/doc/utility/forward>)<T>(lhs) | [std::forward](<#/doc/utility/forward>)<U>(rhs)`.

### Parâmetros

- **lhs, rhs** — valores para OR bit a bit

### Valor de retorno

`[std::forward](<#/doc/utility/forward>)<T>(lhs) | [std::forward](<#/doc/utility/forward>)<U>(rhs)`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo