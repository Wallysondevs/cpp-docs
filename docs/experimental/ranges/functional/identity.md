# std::experimental::ranges::identity

Definido no cabeçalho `[<experimental/ranges/functional>](<#/doc/header/experimental/ranges/functional>)`

```c
struct identity;
```

`ranges::identity` é um tipo de objeto de função cujo operator() retorna seu argumento inalterado. É usado como a projeção padrão para todos os algoritmos do Ranges TS.

### Tipos aninhados

Tipo aninhado | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções membro

** operator()** | retorna o argumento inalterado
(função membro pública)

## std::experimental::ranges::identity::operator()

template< class T >
constexpr T&& operator()( T&& t ) const noexcept;

Retorna [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t).

### Parâmetros

- **t** — argumento a ser retornado

### Valor de retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(t).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo