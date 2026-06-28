# std::inplace_vector&lt;T,N&gt;::append_range

```cpp
template< container-compatible-range<T> R >
constexpr void append_range( R&& rg );  // (desde C++26)
```

  
Insere cópias de elementos do range rg antes de [`end()`](<#/doc/container/inplace_vector/end>), em ordem não-reversa.

Cada iterator em rg é desreferenciado exatamente uma vez.

### Parâmetros

rg  |  \-  |  um [container compatible range](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `inplace_vector` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

(nenhum) 

### Complexidade

Linear no tamanho de rg. O número de chamadas ao construtor de `T` é exatamente igual a std::[ranges::size](<#/doc/ranges/size>)(rg)). 

### Exceções

Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se std::[ranges::size](<#/doc/ranges/size>)(rg) > N. Se uma exceção for lançada que não seja pelo construtor de cópia, construtor de movimento, operador de atribuição, ou operador de atribuição de movimento de `T` ou por qualquer operação de `InputIterator`, não há efeitos. Caso contrário, se uma exceção for lançada, então size() >= n e os elementos no range `[`​0​`, `n`)` não são modificados, onde `n` é o valor de [`size()`](<#/doc/container/inplace_vector/size>) antes desta chamada. 

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <inplace_vector>
    #include <iostream>
    
    int main()
    {
        using I = std::inplace_vector<int, 8>;
        auto head = I{1, 2, 3, 4};
        const auto tail = {-5, -6, -7};
        head.append_range(tail);
        assert(head.size() == 7 and (head == I{1, 2, 3, 4, -5, -6, -7}));
        try
        {
            head.append_range(tail); // throws: no space
        }
        catch(const std::bad_alloc&)
        {
            std::cout << "std::bad_alloc\n";
        }
    }
```

Saída: 
```
    std::bad_alloc
```

### Veja também

[ try_append_range](<#/doc/container/inplace_vector/try_append_range>) |  tenta adicionar um range de elementos ao final   
(função membro pública)  
[ insert_range](<#/doc/container/inplace_vector/insert_range>) |  insere um range de elementos   
(função membro pública)  
[ push_back](<#/doc/container/inplace_vector/push_back>) |  adiciona um elemento ao final   
(função membro pública)  
[ emplace_back](<#/doc/container/inplace_vector/emplace_back>) |  constrói um elemento in-place no final   
(função membro pública)