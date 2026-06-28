# std::forward_list&lt;T,Allocator&gt;::assign_range

```cpp
template< container-compatible-range<T> R >
void assign_range( R&& rg );  // (desde C++23)
```

  
Substitui os elementos no container por uma cópia de cada elemento em rg.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/forward_list/end>)) e todas as referências aos elementos são invalidados.

Cada iterator no range rg é desreferenciado exatamente uma vez.

O comportamento é indefinido se rg se sobrepuser ao container.

### Parâmetros

rg  |  \-  |  um [`input_range`](<#/doc/ranges/input_range>) com tipo de referência conversível para o tipo de elemento do container   
Requisitos de tipo   
- [std::assignable_from](<#/doc/concepts/assignable_from>)<T&, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;> deve ser modelado. Caso contrário, o programa é malformado.   
- `T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) no container a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>)   
  
### Exemplo

Executar este código
```
    #include <algorithm>
    #include <cassert>
    #include <forward_list>
    #include <list>
     
    int main()
    {
        const auto source = std::list{2, 7, 1};
        auto destination = std::forward_list{3, 1, 4};
    #ifdef __cpp_lib_containers_ranges
        destination.assign_range(source);
    #else
        destination.assign(source.cbegin(), source.cend());
    #endif
        assert(std::ranges::equal(source, destination));
    }
```

### Ver também

[ insert_range_after](<#/doc/container/forward_list/insert_range_after>)(desde C++23) |  insere um range de elementos após um elemento   
(função membro pública)  
[ prepend_range](<#/doc/container/forward_list/prepend_range>)(desde C++23) |  adiciona um range de elementos ao início   
(função membro pública)  
[ assign](<#/doc/container/forward_list/assign>) |  atribui valores ao container   
(função membro pública)  
[ operator=](<#/>) |  atribui valores ao container   
(função membro pública)