# std::uses_allocator&lt;std::experimental::packaged_task&gt;

Definido no cabeçalho `[<experimental/future>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/future&action=edit&redlink=1> "cpp/header/experimental/future \(page does not exist\)")`

```c
template< class R, class Alloc >
struct uses_allocator<std::experimental::packaged_task<R>, Alloc>
: std::true_type {};
```

Esta especialização de [std::uses_allocator](<#/doc/memory/uses_allocator>) informa outros componentes da biblioteca que todos os objetos do tipo std::experimental::packaged_task suportam a _construção com alocador_.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna o valor
(função membro pública)
operator()(C++14) | retorna o valor
(função membro pública)

### Tipos membro

Type | Definition
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Ver também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta a construção com alocador
(modelo de classe)