# std::forward_list&lt;T,Allocator&gt;::insert_range_after

```cpp
template< container-compatible-range<T> R >
iterator insert_range_after( const_iterator pos, R&& rg );  // (desde C++23)
```

  
Insere, em ordem não-reversa, as cópias dos elementos em rg antes de pos. Cada iterator no range rg é desreferenciado exatamente uma vez.

pos deve ser qualquer iterator desreferenciável no range `[`[`begin()`](<#/doc/container/forward_list/begin>)`, `[`end()`](<#/doc/container/forward_list/end>)`)` ou o iterator [`before_begin()`](<#/doc/container/forward_list/before_begin>) (assim, [`end()`](<#/doc/container/forward_list/end>) não é um argumento válido para pos).

Nenhum iterator ou referência é invalidado.

O comportamento é indefinido se rg se sobrepõe ao container.

### Parâmetros

pos  |  \-  |  um iterator após o qual o conteúdo será inserido   
---|---|---
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `forward_list` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

Um [`iterator`](<#/doc/container/forward_list>) que aponta para a cópia do último elemento inserido em `forward_list` ou para pos se rg estiver vazio.

### Complexidade

Linear no tamanho de rg.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <cassert>
    #include <forward_list>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        auto container = std::forward_list{1, 2, 3, 4};
        auto pos = std::next(container.cbegin());
        assert(*pos == 2);
        const auto rg = std::vector{-1, -2, -3};
    
    #ifdef __cpp_lib_containers_ranges
        container.insert_range_after(pos, rg);
    #else
        container.insert_after(pos, rg.cbegin(), rg.cend());
    #endif
    
        assert(std::ranges::equal(container, std::vector{1, 2, -1, -2, -3, 3, 4}));
    }
```

### Veja também

[ prepend_range](<#/doc/container/forward_list/prepend_range>)(C++23) | adiciona um range de elementos ao início   
(função membro pública)  
[ insert_after](<#/doc/container/forward_list/insert_after>) | insere elementos após um elemento   
(função membro pública)  
[ emplace_after](<#/doc/container/forward_list/emplace_after>) | constrói elementos no local após um elemento   
(função membro pública)