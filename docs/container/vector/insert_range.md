# std::vector&lt;T,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<T> R >
constexpr iterator insert_range( const_iterator pos, R&& rg );  // (desde C++23)
```

  
Insere, em ordem não-reversa, cópias dos elementos em `rg` antes de `pos`.

Se após a operação o novo [`size()`](<#/doc/container/vector/size>) for maior que o antigo [`capacity()`](<#/doc/container/vector/capacity>), uma realocação ocorre, caso em que todos os iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e todas as referências aos elementos são invalidados. Caso contrário, apenas os iterators e referências antes do ponto de inserção permanecem válidos.

Cada iterator no range `rg` é desreferenciado exatamente uma vez.

`rg` não deve se sobrepor ao container. Caso contrário, o comportamento é indefinido.

### Parâmetros

pos  |  \-  |  iterator antes do qual o conteúdo será inserido (`pos` pode ser o iterator [`end()`](<#/doc/container/vector/end>))   
---|---|---
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `vector` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Além disso, `T` deve ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `vector` e `T` deve satisfazer [MoveConstructible](<#/doc/named_req/MoveConstructible>), [MoveAssignable](<#/doc/named_req/MoveAssignable>), e [Swappable](<#/doc/named_req/Swappable>). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

Um [`iterator`](<#/doc/container/vector>) que aponta para a cópia do primeiro elemento inserido no `vector` ou para `pos` se `rg` estiver vazio.

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <iterator>
    #include <vector>
    #include <list>
     
    int main()
    {
        auto container = std::vector{1, 2, 3, 4};
        auto pos = std::next(container.begin(), 2);
        assert(*pos == 3);
        const auto rg = std::list{-1, -2, -3};
     
    #ifdef __cpp_lib_containers_ranges
        container.insert_range(pos, rg);
    #else
        container.insert(pos, rg.cbegin(), rg.cend());
    #endif
        assert(std::ranges::equal(container, std::vector{1, 2, -1, -2, -3, 3, 4}));
    }
```

### Veja também

[ insert](<#/doc/container/vector/insert>) |  insere elementos   
(função membro pública)  
[ append_range](<#/doc/container/vector/append_range>)(C++23) |  adiciona um range de elementos ao final   
(função membro pública)