# std::forward_list&lt;T,Allocator&gt;::prepend_range

```cpp
template< container-compatible-range<T> R >
void prepend_range( R&& rg );  // (desde C++23)
```

  
Insere, em ordem não invertida, cópias dos elementos em `rg` antes de [`begin()`](<#/doc/container/forward_list/begin>). Cada iterator no range `rg` é desreferenciado exatamente uma vez.

Nenhum iterator ou referência é invalidado.

### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), isto é, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `forward_list` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum)

### Complexidade

Linear no tamanho de `rg`.

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [sensíveis a ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <forward_list>
    #include <vector>
     
    int main()
    {
        auto container = std::forward_list{0, 1, 2, 3};
        const auto rg = std::vector{-3, -2, -1};
     
    #if __cpp_lib_containers_ranges
        container.prepend_range(rg);
    #else
        container.insert_after(container.before_begin(), rg.cbegin(), rg.cend());
    #endif
        assert(std::ranges::equal(container, std::forward_list{-3, -2, -1, 0, 1, 2, 3}));
    }
```

### Veja também

[ insert_range](<https://en.cppreference.com/mwiki/index.php?title=cpp/container/forward_list/insert_range&action=edit&redlink=1> "cpp/container/forward list/insert range (page does not exist)")(C++23) | insere um range de elementos   
(função membro pública)  
[ insert_range_after](<#/doc/container/forward_list/insert_range_after>)(C++23) | insere um range de elementos após um elemento   
(função membro pública)  
[ push_front](<#/doc/container/forward_list/push_front>) | insere um elemento no início   
(função membro pública)  
[ emplace_front](<#/doc/container/forward_list/emplace_front>) | constrói um elemento no local no início   
(função membro pública)