# std::list&lt;T,Allocator&gt;::append_range

```cpp
template< container-compatible-range<T> R >
void append_range( R&& rg );  // (desde C++23)
```

  
Insere cópias de elementos do range rg antes de [`end()`](<#/doc/container/list/end>), em ordem não invertida. 

Nenhum iterator ou referência é invalidado. 

Cada iterator em rg é desreferenciado exatamente uma vez. 

### Parâmetros

rg  |  \-  |  um [container compatible range](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `list` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

Linear no tamanho de rg. O número de chamadas ao construtor de `T` é exatamente igual a std::[ranges::size](<#/doc/ranges/size>)(rg)). 

### Exceções

Se uma exceção for lançada por qualquer motivo, esta função não tem efeito ([garantia de segurança forte contra exceções](<#/doc/language/exceptions>)). 

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <list>
    #include <vector>
     
    int main()
    {
        auto head = std::list{1, 2, 3, 4};
        const auto tail = std::vector{-5, -6, -7};
    #ifdef __cpp_lib_containers_ranges
        head.append_range(tail);
    #else
        head.insert(head.end(), tail.cbegin(), tail.cend());
    #endif
        assert((head == std::list{1, 2, 3, 4, -5, -6, -7}));
    }
```

### Veja também

[ prepend_range](<#/doc/container/list/prepend_range>)(C++23) | adiciona um range de elementos ao início   
(função membro pública)  
[ insert_range](<#/doc/container/list/insert_range>)(C++23) | insere um range de elementos   
(função membro pública)  
[ push_back](<#/doc/container/list/push_back>) | adiciona um elemento ao final   
(função membro pública)  
[ emplace_back](<#/doc/container/list/emplace_back>)(C++11) | constrói um elemento no local no final   
(função membro pública)