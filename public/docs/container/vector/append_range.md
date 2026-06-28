# std::vector&lt;T,Allocator&gt;::append_range

```cpp
template< container-compatible-range<T> R >
constexpr void append_range( R&& rg );  // (desde C++23)
```

  
Insere cópias de elementos do range rg antes de [`end()`](<#/doc/container/vector/end>), em ordem não invertida. 

Se após a operação o novo [`size()`](<#/doc/container/vector/size>) for maior que o antigo [`capacity()`](<#/doc/container/vector/capacity>), ocorre uma realocação, caso em que todos os iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e todas as referências aos elementos são invalidados. Caso contrário, apenas o iterator [`end()`](<#/doc/container/vector/end>) é invalidado. 

Cada iterator em rg é desreferenciado exatamente uma vez. 

### Parâmetros

rg  |  \-  |  um [container compatible range](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `vector` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Além disso, `T` deve ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) em `vector`. Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

Se ocorrer realocação, linear no número de elementos do `vector` resultante; caso contrário, linear no número de elementos inseridos mais a distância até [`end()`](<#/doc/container/vector/end>). 

### Exceções

Se uma exceção for lançada que não seja pelo construtor de cópia, construtor de movimento, operador de atribuição ou operador de atribuição de movimento de `T` ou por qualquer operação de `InputIterator`, não há efeitos. Se uma exceção for lançada ao inserir um único elemento no final e `T` for [CopyInsertable](<#/doc/named_req/CopyInsertable>) ou [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)`<T>` for verdadeiro, não há efeitos. Caso contrário, se uma exceção for lançada pelo construtor de movimento de um `T` não [CopyInsertable](<#/doc/named_req/CopyInsertable>), os efeitos são não especificados. 

### Notas

Teste de recurso macro | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção [compatíveis com ranges](<#/doc/ranges/to>)   
  
### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <vector>
    #include <list>
     
    int main()
    {
        auto head = std::vector{1, 2, 3, 4};
        const auto tail = std::list{-5, -6, -7};
    #ifdef __cpp_lib_containers_ranges
        head.append_range(tail);
    #else
        head.insert(head.end(), tail.cbegin(), tail.cend());
    #endif
        assert((head == std::vector{1, 2, 3, 4, -5, -6, -7}));
    }
```

### Veja também

[ insert_range](<#/doc/container/vector/insert_range>)(C++23) | insere um range de elementos   
(função membro pública)  
[ push_back](<#/doc/container/vector/push_back>) | adiciona um elemento ao final   
(função membro pública)  
[ emplace_back](<#/doc/container/vector/emplace_back>)(desde C++11) | constrói um elemento no local no final   
(função membro pública)