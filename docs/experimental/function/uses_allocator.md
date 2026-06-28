# std::uses_allocator&lt;std::experimental::function&gt;

Definido no cabeçalho `[<experimental/functional>](<#/doc/header/experimental/functional>)`

```c
template< class R, class... ArgTypes, class Alloc >
struct uses_allocator<std::experimental::function<R(ArgTypes...)>, Alloc>
: std::true_type {};
(removido na library fundamentals TS v3)
```

Esta especialização de [std::uses_allocator](<#/doc/memory/uses_allocator>) informa outros componentes da biblioteca que todos os objetos do tipo std::experimental::function suportam _construção uses-allocator_.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Veja também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(modelo de classe)