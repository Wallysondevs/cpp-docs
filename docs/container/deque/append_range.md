# std::deque&lt;T,Allocator&gt;::append_range

```cpp
template< container-compatible-range<T> R >
void append_range( R&& rg );  // (desde C++23)
```

  
Insere cópias de elementos do range rg antes de [`end()`](<#/doc/container/deque/end>), em ordem não-reversa.

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) são invalidados. Nenhuma referência é invalidada.

Cada iterator em rg é desreferenciado exatamente uma vez.

### Parâmetros

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `deque` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

Linear no tamanho de rg. O número de chamadas ao construtor de `T` é exatamente igual a std::[ranges::size](<#/doc/ranges/size>)(rg)). 

### Exceções

Se uma exceção for lançada que não seja pelo construtor de cópia, construtor de movimento, operador de atribuição ou operador de atribuição de movimento de `T`, não há efeitos. Se uma exceção for lançada ao inserir um único elemento em qualquer extremidade, não há efeitos. Caso contrário, se uma exceção for lançada pelo construtor de movimento de um `T` não-[CopyInsertable](<#/doc/named_req/CopyInsertable>), os efeitos são não especificados. 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com Ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <deque>
    #include <list>
     
    int main()
    {
        auto head = std::deque{1, 2, 3, 4};
        const auto tail = std::list{-5, -6, -7};
    #ifdef __cpp_lib_containers_ranges
        head.append_range(tail);
    #else
        head.insert(head.end(), tail.cbegin(), tail.cend());
    #endif
        assert((head == std::deque{1, 2, 3, 4, -5, -6, -7}));
    }
```

### Veja também

[ prepend_range](<#/doc/container/deque/prepend_range>)(C++23) | adiciona um range de elementos ao início   
(função membro pública)  
[ insert_range](<#/doc/container/deque/insert_range>)(C++23) | insere um range de elementos   
(função membro pública)  
[ push_back](<#/doc/container/deque/push_back>) | adiciona um elemento ao final   
(função membro pública)  
[ emplace_back](<#/doc/container/deque/emplace_back>)(desde C++11) | constrói um elemento no local no final   
(função membro pública)