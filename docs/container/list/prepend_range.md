# std::list&lt;T,Allocator&gt;::prepend_range

```cpp
template< container-compatible-range<T> R >
void prepend_range( R&& rg );  // (desde C++23)
```

  
Insere, em ordem não-reversa, cópias dos elementos em rg antes de [`begin()`](<#/doc/container/list/begin>). Cada iterator no range rg é desreferenciado exatamente uma vez. 

Nenhum iterator ou referência é invalidado. 

### Parâmetros

rg  |  \-  |  um [container compatible range](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `list` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

Linear no tamanho de rg. 

### Notas

Macro de teste de recurso | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [Ranges-aware](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <cassert>
    #include <list>
    #include <vector>
    
    int main()
    {
        auto container = std::list{0, 1, 2, 3};
        const auto rg = std::vector{-3, -2, -1};
    
    #if __cpp_lib_containers_ranges
        container.prepend_range(rg);
    #else
        container.insert(container.begin(), rg.cbegin(), rg.cend());
    #endif
        assert(std::ranges::equal(container, std::list{-3, -2, -1, 0, 1, 2, 3}));
    }
```

### Veja também

[ append_range](<#/doc/container/list/append_range>)(C++23) |  adiciona um range de elementos ao final   
(função membro pública)  
[ insert_range](<#/doc/container/list/insert_range>)(C++23) |  insere um range de elementos   
(função membro pública)  
[ push_front](<#/doc/container/list/push_front>) |  insere um elemento no início   
(função membro pública)  
[ emplace_front](<#/doc/container/list/emplace_front>)(C++11) |  constrói um elemento no local no início   
(função membro pública)