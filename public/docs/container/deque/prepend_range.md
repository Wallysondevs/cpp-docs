# std::deque&lt;T,Allocator&gt;::prepend_range

```cpp
template< container-compatible-range<T> R >
void prepend_range( R&& rg );  // (desde C++23)
```

  
Insere, em ordem não-reversa, cópias dos elementos em `rg` antes de [`begin()`](<#/doc/container/deque/begin>). Cada iterator no range `rg` é desreferenciado exatamente uma vez.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) são invalidados. Nenhuma referência é invalidada.

### Parâmetros

rg  |  \-  |  um [container compatible range](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `deque` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Além disso, `T` deve ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `deque` e `T` satisfaz [MoveConstructible](<#/doc/named_req/MoveConstructible>), [MoveAssignable](<#/doc/named_req/MoveAssignable>), e [Swappable](<#/doc/named_req/Swappable>). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum)

### Complexidade

Linear no tamanho de `rg`.

### Notas

[Feature-test](<#/doc/utility/feature_test>) macro | Valor | Padrão | Funcionalidade   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [sensíveis a ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <deque>
    #include <vector>
    
    int main()
    {
        auto container = std::deque{0, 1, 2, 3};
        const auto rg = std::vector{-3, -2, -1};
    
#if __cpp_lib_containers_ranges
        container.prepend_range(rg);
#else
        container.insert(container.begin(), rg.cbegin(), rg.cend());
#endif
        assert(std::ranges::equal(container, std::deque{-3, -2, -1, 0, 1, 2, 3}));
    }
```

### Ver também

[ append_range](<#/doc/container/deque/append_range>)(C++23) |  adiciona um range de elementos ao final   
(função membro pública)  
[ insert_range](<#/doc/container/deque/insert_range>)(C++23) |  insere um range de elementos   
(função membro pública)  
[ push_front](<#/doc/container/deque/push_front>) |  insere um elemento no início   
(função membro pública)  
[ emplace_front](<#/doc/container/deque/emplace_front>)(C++11) |  constrói um elemento no local no início   
(função membro pública)