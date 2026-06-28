# std::inplace_vector&lt;T,N&gt;::insert_range

```cpp
template< container-compatible-range<T> R >
constexpr iterator insert_range( const_iterator pos, R&& rg );  // (desde C++26)
```

  
Insere, em ordem não-reversa, cópias dos elementos em rg antes de pos. 

  

Cada iterator no range rg é desreferenciado exatamente uma vez. 

rg não deve se sobrepor ao container. Caso contrário, o comportamento é indefinido. 

### Parâmetros

pos  |  \-  |  iterator antes do qual o conteúdo será inserido (pos pode ser o iterator [`end()`](<#/doc/container/inplace_vector/end>))   
---|---|---
rg  |  \-  |  um [range compatível com container](<#/doc/ranges/to>), ou seja, um [`input_range`](<#/doc/ranges/input_range>) cujos elementos são conversíveis para `T`  
Requisitos de tipo   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) em `inplace_vector` a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Valor de retorno

Um [`iterator`](<#/doc/container/inplace_vector>) que aponta para a cópia do primeiro elemento inserido em `inplace_vector` ou para pos se rg estiver vazio. 

### Exceções

  * [std::bad_alloc](<#/doc/memory/new/bad_alloc>), se [ranges::distance](<#/doc/iterator/ranges/distance>)(rg) + size() > capacity(). Os elementos de *this não são modificados. 
  * Qualquer exceção lançada pela inserção (ou seja, por construtor de cópia/movimentação, operador de atribuição de movimentação/cópia de `T`) ou por qualquer operação de [LegacyInputIterator](<#/doc/named_req/InputIterator>). Os elementos de *this no range `[`​0​`, `pos`)` não são modificados. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <inplace_vector>
    #include <iterator>
    #include <new>
    #include <print>
     
    int main()
    {
        auto v = std::inplace_vector<int, 8>{0, 1, 2, 3};
        auto pos = std::next(v.begin(), 2);
        assert(*pos == 2);
        const auto rg = {-1, -2, -3};
        v.insert_range(pos, rg);
        std::println("{}", v);
     
        try
        {
            assert(v.size() + rg.size() > v.capacity());
            v.insert_range(pos, rg); // throws: no space
        }
        catch(const std::bad_alloc& ex)
        {
            std::println("{}", ex.what());
        }
    }
```

Saída possível: 
```
    [0, 1, -1, -2, -3, 2, 3]
    std::bad_alloc
```

### Veja também

[ insert](<#/doc/container/inplace_vector/insert>) |  insere elementos   
(função membro pública)  
[ append_range](<#/doc/container/inplace_vector/append_range>) |  adiciona um range de elementos ao final   
(função membro pública)  
[ try_append_range](<#/doc/container/inplace_vector/try_append_range>) |  tenta adicionar um range de elementos ao final   
(função membro pública)