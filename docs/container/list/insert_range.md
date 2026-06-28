# std::list&lt;T,Allocator&gt;::insert_range

```cpp
template< container-compatible-range<T> R >
iterator insert_range( const_iterator pos, R&& rg );  // (desde C++23)
```

  
Insere, em ordem não-reversa, cópias dos elementos em `rg` antes de `pos`.

Nenhum iterator ou referência é invalidado.

Cada iterator no range `rg` é desreferenciado exatamente uma vez.

`rg` não deve se sobrepor ao container. Caso contrário, o comportamento é indefinido.

### Parâmetros

pos  |  \-  |  iterator antes do qual o conteúdo será inserido (`pos` pode ser o iterator [`end()`](<#/doc/container/list/end>))   
---|---|---
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `list` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

Um [`iterator`](<#/doc/container/list>) que aponta para a cópia do primeiro elemento inserido na `list` ou para `pos` se `rg` estiver vazio.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção cientes de ranges   
  
### Exemplo

Run this code
```
    #include <algorithm>
    #include <cassert>
    #include <iterator>
    #include <list>
    #include <vector>
     
    int main()
    {
        auto container = std::list{1, 2, 3, 4};
        auto pos = std::next(container.begin(), 2);
        assert(*pos == 3);
        const auto rg = std::vector{-1, -2, -3};
     
    #ifdef __cpp_lib_containers_ranges
        container.insert_range(pos, rg);
    #else
        container.insert(pos, rg.cbegin(), rg.cend());
    #endif
        assert(std::ranges::equal(container, std::list{1, 2, -1, -2, -3, 3, 4}));
    }
```

### Veja também

[ insert](<#/doc/container/list/insert>) | insere elementos   
(função membro pública)  
[ prepend_range](<#/doc/container/list/prepend_range>)(C++23) | adiciona um range de elementos ao início   
(função membro pública)  
[ append_range](<#/doc/container/list/append_range>)(C++23) | adiciona um range de elementos ao final   
(função membro pública)