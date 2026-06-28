# std::vector&lt;T,Allocator&gt;::assign_range

```cpp
template< container-compatible-range<T> R >
constexpr void assign_range( R&& rg );  // (desde C++23)
```

  
Substitui os elementos no container por uma cópia de cada elemento em rg.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e todas as referências aos elementos são invalidados.

Cada iterator no range rg é desreferenciado exatamente uma vez.

O comportamento é indefinido se rg se sobrepõe ao container.

### Parameters

rg  |  \-  |  um [`input_range`](<#/doc/ranges/input_range>) com tipo de referência conversível para o tipo de elemento do container
Type requirements
-[std::assignable_from](<#/doc/concepts/assignable_from>)<T&, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;> deve ser modelado. Caso contrário, o programa é malformado.
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) no container a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Se `R` não modela nem [`sized_range`](<#/doc/ranges/sized_range>) nem [`forward_range`](<#/doc/ranges/forward_range>), `T` também deve ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) no container. Caso contrário, o comportamento é indefinido.

### Return value

(nenhum)

### Notes

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>)

### Example

Run this code
```
    #include <algorithm>
    #include <cassert>
    #include <vector>
    #include <list>
    
    int main()
    {
        const auto source = std::list{2, 7, 1};
        auto destination = std::vector{3, 1, 4};
    #ifdef __cpp_lib_containers_ranges
        destination.assign_range(source);
    #else
        destination.assign(source.cbegin(), source.cend());
    #endif
        assert(std::ranges::equal(source, destination));
    }
```

### See also

[ insert_range](<#/doc/container/vector/insert_range>)(C++23) |  insere um range de elementos
(função membro pública)
[ append_range](<#/doc/container/vector/append_range>)(C++23) |  adiciona um range de elementos ao final
(função membro pública)
[ assign](<#/doc/container/vector/assign>) |  atribui valores ao container
(função membro pública)
[ operator=](<#/>) |  atribui valores ao container
(função membro pública)