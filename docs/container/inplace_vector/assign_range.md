# std::inplace_vector&lt;T,N&gt;::assign_range

```cpp
template< container-compatible-range<T> R >
constexpr void assign_range( R&& rg );  // (desde C++26)
```

  
Substitui os elementos no container por uma cópia de cada elemento em rg.

| Esta seção está incompleta   
  
Cada iterator no range rg é desreferenciado exatamente uma vez.

O comportamento é indefinido se rg se sobrepõe ao container.

### Parameters

rg  |  \-  |  um [`input_range`](<#/doc/ranges/input_range>) com tipo de referência conversível para o tipo de elemento do container   
Type requirements   
-[std::assignable_from](<#/doc/concepts/assignable_from>)<T&, [ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;R&gt;> deve ser modelado. Caso contrário, o programa é malformado.   
-`T` deve ser [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) no container a partir de *[ranges::begin](<#/doc/ranges/begin>)(rg). Caso contrário, o comportamento é indefinido.   
  
### Return value

(none) 

### Exceptions

  * bad_alloc, se std::[ranges::distance](<#/doc/iterator/ranges/distance>)(rg) > capacity(). 
  * Qualquer exceção lançada pela inicialização do elemento inserido. 

### Example

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <initializer_list>
    #include <inplace_vector>
    #include <iostream>
    #include <new>
     
    int main()
    {
        const auto source = {1, 2, 3};
        std::inplace_vector<int, 4> destination{4, 5};
        destination.assign_range(source);
        assert(std::ranges::equal(destination, source));
     
        try
        {
            const auto bad = {-1, -2, -3, -4, -5};
            destination.assign_range(bad); // throws: bad.size() > destination.capacity()
        }
        catch(const std::bad_alloc& ex)
        {
            std::cout << ex.what() << '\n';
        }
    }
```

Saída possível: 
```
    std::bad_alloc
```

### Veja também

[ insert_range](<#/doc/container/inplace_vector/insert_range>) | insere um range de elementos   
(função membro pública)  
[ append_range](<#/doc/container/inplace_vector/append_range>) | adiciona um range de elementos ao final   
(função membro pública)  
[ assign](<#/doc/container/inplace_vector/assign>) | atribui valores ao container   
(função membro pública)  
[ operator=](<#/>) | atribui valores ao container   
(função membro pública)