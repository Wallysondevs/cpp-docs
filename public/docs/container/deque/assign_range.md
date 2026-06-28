# std::deque&lt;T,Allocator&gt;::assign_range

```cpp
template< container-compatible-range<T> R >
void assign_range( R&& rg );  // (desde C++23)
```

  
Substitui os elementos no container por uma cópia de cada elemento em rg.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) e todas as referências aos elementos são invalidados.

Cada iterator no range rg é desreferenciado exatamente uma vez.

O comportamento é indefinido se rg se sobrepõe ao container.

### Parâmetros

rg  |  \-  |  um [`input_range`](<#/doc/ranges/input_range>) com tipo de referência conversível para o tipo de elemento do container   
Requisitos de tipo   
- [`std::assignable_from`](<#/doc/concepts/assignable_from>)<T&, [`ranges::range_reference_t`](<#/doc/ranges/range_reference_t>)&lt;R&gt;> deve ser modelado. Caso contrário, o programa é malformado.   
- `T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) no container a partir de *[`ranges::begin`](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>)   
  
### Exemplo

Run this code
```
    #include <algorithm>
    #include <cassert>
    #include <deque>
    #include <list>
     
    int main()
    {
        const auto source = std::list{2, 7, 1};
        auto destination = std::deque{3, 1, 4};
    #ifdef __cpp_lib_containers_ranges
        destination.assign_range(source);
    #else
        destination.assign(source.cbegin(), source.cend());
    #endif
        assert(std::ranges::equal(source, destination));
    }
```

### Veja também

[ insert_range](<#/doc/container/deque/insert_range>)(C++23) | insere um range de elementos   
(função membro pública)  
[ prepend_range](<#/doc/container/deque/prepend_range>)(C++23) | adiciona um range de elementos ao início   
(função membro pública)  
[ append_range](<#/doc/container/deque/append_range>)(C++23) | adiciona um range de elementos ao final   
(função membro pública)  
[ assign](<#/doc/container/deque/assign>) | atribui valores ao container   
(função membro pública)  
[ operator=](<#/>) | atribui valores ao container   
(função membro pública)