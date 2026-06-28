# std::ranges::subrange&lt;I,S,K&gt;::size

```cpp
constexpr /*make-unsigned-like-t*/<std::iter_difference_t<I>> size() const
requires (K == ranges::subrange_kind::sized);  // (desde C++20)
```

  
Obtém o número de elementos no [`subrange`](<#/doc/ranges/subrange>): 

  * Se `_[StoreSize](<#/doc/ranges/subrange>)_` for true, retorna `_[size_](<#/doc/ranges/subrange>)_`. 
  * Caso contrário, retorna `_[to-unsigned-like](<#/doc/ranges>)_` ﻿(`_[end_](<#/doc/ranges/subrange>)_` `-` ` _[begin_](<#/doc/ranges/subrange>)_` ﻿). 

Para a definição de /*make-unsigned-like-t*/, veja `_[make-unsigned-like-t](<#/doc/ranges>)_` ﻿. 

### Valor de retorno

Conforme descrito acima. 

### Exemplo

Run this code
```cpp
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <utility>
    
    int main()
    {
        const auto v = {2, 2, 2, 7, 1, 1, 1, 1, 8, 2, 2, 2, 2, 2};
    
        // the value type of views::chunk_by is the ranges::subrange
    
        auto to_pair =  { return std::make_pair(sub[0], sub.size()); };
                                                                     /* ^^^^ */
        auto pairs = v | std::views::chunk_by(std::equal_to{})
                       | std::views::transform(to_pair);
    
        for (auto x : pairs bitor std::views::keys)
            std::cout << x << ' ';
        std::cout << '\n';
        for (auto x : pairs bitor std::views::values)
            std::cout << x << ' ';
        std::cout << '\n';
    }
```

Output: 
```
    2 7 1 8 2
    3 1 4 1 5
```

### Veja também

[ empty](<#/doc/ranges/subrange/empty>) |  verifica se o `subrange` está vazio   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)  
[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)