# std::deque&lt;T,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<T> R >
iterator insert_range( const_iterator pos, R&& rg );  // (desde C++23)
```

  
Insere, em ordem não-reversa, cópias dos elementos em `rg` antes de `pos`.

Todos os iteradores (incluindo o iterador [`end()`](<#/doc/container/deque/end>)) são invalidados. Referências também são invalidadas, a menos que `pos ==` `[`begin()`](<#/doc/container/deque/begin>) ou `pos ==` `[`end()`](<#/doc/container/deque/end>), caso em que não são invalidadas.

Cada iterador no range `rg` é desreferenciado exatamente uma vez.

`rg` não deve se sobrepor ao container. Caso contrário, o comportamento é indefinido.

### Parâmetros

pos  |  \-  |  iterador antes do qual o conteúdo será inserido (`pos` pode ser o iterador [`end()`](<#/doc/container/deque/end>))   
---|---|---
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `deque` a partir de `*[ranges::begin](<#/doc/ranges/begin>)(rg)`. Além disso, `T` deve ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `deque` e `T` deve satisfazer [MoveConstructible](<#/doc/named_req/MoveConstructible>), [MoveAssignable](<#/doc/named_req/MoveAssignable>), e [Swappable](<#/doc/named_req/Swappable>). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

Um [`iterator`](<#/doc/container/deque>) que aponta para a cópia do primeiro elemento inserido no `deque` ou para `pos` se `rg` estiver vazio.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>)   
  
### Exemplo

Run this code
```
    #include <algorithm>
    #include <cassert>
    #include <iterator>
    #include <deque>
    #include <list>
     
    int main()
    {
        auto container = std::deque{1, 2, 3, 4};
        auto pos = std::next(container.begin(), 2);
        assert(*pos == 3);
        const auto rg = std::list{-1, -2, -3};
     
    #ifdef __cpp_lib_containers_ranges
        container.insert_range(pos, rg);
    #else
        container.insert(pos, rg.cbegin(), rg.cend());
    #endif
        assert(std::ranges::equal(container, std::deque{1, 2, -1, -2, -3, 3, 4}));
    }
```

### Veja também

[ insert](<#/doc/container/deque/insert>) | insere elementos   
(função membro pública)  
[ prepend_range](<#/doc/container/deque/prepend_range>)(C++23) | adiciona um range de elementos ao início   
(função membro pública)  
[ append_range](<#/doc/container/deque/append_range>)(C++23) | adiciona um range de elementos ao final   
(função membro pública)