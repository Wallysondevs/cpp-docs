# std::inplace_vector&lt;T,N&gt;::try_append_range

```cpp
template< container-compatible-range<T> R >
constexpr std::ranges::borrowed_iterator_t<R> try_append_range( R&& rg );  // (desde C++26)
```

  
Adiciona cópias dos elementos iniciais em `rg` antes de [`end()`](<#/doc/container/inplace_vector/end>), até que todos os elementos sejam inseridos ou o armazenamento interno esteja esgotado (ou seja, `size() == capacity()` é verdadeiro).

Todos os iterators e referências permanecem válidos. O iterator [`end()`](<#/doc/container/inplace_vector/end>) é invalidado.

Cada iterator em `rg` é desreferenciado no máximo uma vez.

### Parameters

rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `inplace_vector` a partir de `*[ranges::begin](<#/doc/ranges/begin>)(rg)`. Caso contrário, o comportamento é indefinido.   
  
### Return value

Um iterator apontando para o primeiro elemento de `rg` que não foi inserido em `*this`, ou `[ranges::end](<#/doc/ranges/end>)(rg)` se tal elemento não existir.

### Complexity

Linear no número de elementos inseridos.

### Exceptions

Qualquer exceção lançada pela inicialização do elemento inserido.

`inplace_vector` fornece a _garantia básica de segurança de exceção_ , ou seja, todos os elementos do container antes da chamada são preservados, e todos os elementos já inseridos (antes da exceção, se houver) também são preservados.

### Notes

| Esta seção está incompleta  
Razão: Explicar o propósito desta API.   
  
### Example

Execute este código
```
    #include <cassert>
    #include <initializer_list>
    #include <inplace_vector>
     
    int main()
    {
        using I = std::inplace_vector<int, 8>;
        auto nums = I{1, 2, 3};
        const auto rg = {-1, -2, -3};
     
        auto it = nums.try_append_range(rg);
        assert(nums.size() == 6);
        assert((nums == I{1, 2, 3, -1, -2, -3}));
        assert(it == rg.end());
     
        it = nums.try_append_range(rg);
        assert(nums.size() == 8);
        assert((nums == I{1, 2, 3, -1, -2, -3, -1, -2}));
        assert(it == rg.begin() + 2);
    }
```

### See also

[ append_range](<#/doc/container/inplace_vector/append_range>) |  adiciona um range de elementos ao final   
(função membro pública)  
[ push_back](<#/doc/container/inplace_vector/push_back>) |  adiciona um elemento ao final   
(função membro pública)  
[ try_push_back](<#/doc/container/inplace_vector/try_push_back>) |  tenta adicionar um elemento ao final   
(função membro pública)  
[ unchecked_push_back](<#/doc/container/inplace_vector/unchecked_push_back>) |  adiciona incondicionalmente um elemento ao final   
(função membro pública)  
[ emplace_back](<#/doc/container/inplace_vector/emplace_back>) |  constrói um elemento in-place no final   
(função membro pública)  
[ try_emplace_back](<#/doc/container/inplace_vector/try_emplace_back>) |  tenta construir um elemento in-place no final   
(função membro pública)  
[ unchecked_emplace_back](<#/doc/container/inplace_vector/unchecked_emplace_back>) |  constrói incondicionalmente um elemento in-place no final   
(função membro pública)  
[ pop_back](<#/doc/container/inplace_vector/pop_back>) |  remove o último elemento   
(função membro pública)  
[ back_inserter](<#/doc/iterator/back_inserter>) |  cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento   
(template de função)