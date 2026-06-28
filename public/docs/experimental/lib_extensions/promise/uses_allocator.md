# std::uses_allocator&lt;std::experimental::promise&gt;

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class R, class Alloc >
struct uses_allocator<std::experimental::promise<R>, Alloc>
: std::true_type {};
```

Esta especialização de [std::uses_allocator](<#/doc/memory/uses_allocator>) informa outros componentes da biblioteca que todos os objetos do tipo std::experimental::promise suportam _uses-allocator construction_.

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

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta uses-allocator construction
(modelo de classe)