# std::bit_not&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class bit_not<void>;
```

[std::bit_not](<#/doc/utility/functional/bit_not>)&lt;void&gt; é uma especialização de [std::bit_not](<#/doc/utility/functional/bit_not>) com tipo de parâmetro e de retorno deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | aplica `operator~` ao seu argumento
(função membro pública)

## std::bit_not&lt;void&gt;::operator()

template< class T >
constexpr auto operator()( T&& arg ) const
-> decltype(~[std::forward](<#/doc/utility/forward>)&lt;T&gt;(arg));

Retorna o resultado de ~[std::forward](<#/doc/utility/forward>)&lt;T&gt;(arg).

### Parâmetros

- **arg** — valor para NOT bit a bit

### Valor de retorno

~[std::forward](<#/doc/utility/forward>)&lt;T&gt;(arg).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo