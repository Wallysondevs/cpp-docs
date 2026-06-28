# std::uses_allocator&lt;std::tuple&gt;

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class... Types, class Alloc >
struct uses_allocator< std::tuple<Types...>, Alloc > : std::true_type { };
```

Esta especialização de [std::uses_allocator](<#/doc/memory/uses_allocator>) informa outros componentes da biblioteca que tuplas suportam *construção com alocador*, mesmo que não possuam um `allocator_type` aninhado.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | verdadeiro
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

### Exemplo
```cpp
    // myalloc é um Allocator com estado e um construtor de um único argumento
    // que recebe um int. Não possui construtor padrão.
     
        using innervector_t = std::vector<int, myalloc<int>>;
        using elem_t = std::tuple<int, innervector_t>;
        using Alloc = std::scoped_allocator_adaptor< myalloc<elem_t>, myalloc<int>>;
     
        Alloc a(1,2);
        std::vector<elem_t, Alloc> v(a);
        v.resize(1);                  // usa o alocador #1 para elementos de v
        std::get<1>(v[0]).resize(10); // usa o alocador #2 para innervector_t
```

### Ver também

[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção com alocador
(modelo de classe)