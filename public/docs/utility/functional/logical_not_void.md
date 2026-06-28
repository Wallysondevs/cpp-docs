# std::logical_not&lt;void&gt;

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template<>
class logical_not<void>;
```

[std::logical_not](<#/doc/utility/functional/logical_not>)&lt;void&gt; é uma especialização de [std::logical_not](<#/doc/utility/functional/logical_not>) com tipo de parâmetro e de retorno deduzidos.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | aplica `operator!` ao seu argumento
(função membro pública)

## std::logical_not&lt;void&gt;::operator()

template< class T >
constexpr auto operator()( T&& arg ) const
-> decltype(![std::forward](<#/doc/utility/forward>)&lt;T&gt;(arg));

Retorna o resultado de ![std::forward](<#/doc/utility/forward>)&lt;T&gt;(arg).

### Parâmetros

- **arg** — valor para aplicar o NOT lógico

### Valor de retorno

![std::forward](<#/>)&lt;T&gt;(arg).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo