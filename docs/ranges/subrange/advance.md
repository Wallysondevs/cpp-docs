# std::ranges::subrange&lt;I,S,K&gt;::advance

```cpp
constexpr subrange& advance( std::iter_difference_t<I> n );  // (desde C++20)
```

  
Incrementa ou decrementa `_[begin_](<#/doc/ranges/subrange>)_` ﻿: 

  * Se `I` modela [`bidirectional_iterator`](<#/doc/iterator/bidirectional_iterator>) e n < 0 for verdadeiro, decrementa `_[begin_](<#/doc/ranges/subrange>)_` em -n elementos. 

     Equivalente a: [ranges::advance](<#/doc/iterator/ranges/advance>)(`_[begin_](<#/doc/ranges/subrange>)_` ﻿, n);  
if constexpr (`_[StoreSize](<#/doc/ranges/subrange>)_` ﻿)  
` ` _[size_](<#/doc/ranges/subrange>)_` `+=` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(-n);  
return *this;. 

  * Caso contrário, incrementa `_[begin_](<#/doc/ranges/subrange>)_` em n elementos, ou até que `_[end_](<#/doc/ranges/subrange>)_` seja alcançado. 

     Equivalente a: auto d = n - [ranges::advance](<#/doc/iterator/ranges/advance>)(`_[begin_](<#/doc/ranges/subrange>)_` ﻿, n,` ` _[end_](<#/doc/ranges/subrange>)_` ﻿);  
if constexpr (`_[StoreSize](<#/doc/ranges/subrange>)_` ﻿)  
` ` _[size_](<#/doc/ranges/subrange>)_` `-=` ` _[to-unsigned-like](<#/doc/ranges>)_` ﻿(d);  
return *this;. 

  
De acordo com as pré-condições de [ranges::advance](<#/doc/iterator/ranges/advance>), se n < 0 for verdadeiro e `_[begin_](<#/doc/ranges/subrange>)_` não puder ser decrementado em -n elementos, o comportamento é indefinido. 

### Parâmetros

n  |  \-  |  número de incrementos máximos do iterator   
  
### Valor de retorno

*this

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <iterator>
    #include <ranges>
     
    void print(auto name, auto const sub)
    {
        std::cout << name << ".size() == " << sub.size() << "; { ";
        std::ranges::for_each(sub,  { std::cout << x << ' '; });
        std::cout << "}\n";
    };
     
    int main()
    {
        std::array arr{1, 2, 3, 4, 5, 6, 7};
        std::ranges::subrange sub{std::next(arr.begin()), std::prev(arr.end())};
        print("1) sub", sub);
        print("2) sub", sub.advance(3));
        print("3) sub", sub.advance(-2));
    }
```

Saída: 
```
    1) sub.size() == 5; { 2 3 4 5 6 }
    2) sub.size() == 2; { 5 6 }
    3) sub.size() == 4; { 3 4 5 6 }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3433](<https://cplusplus.github.io/LWG/issue3433>) | C++20  | o comportamento era indefinido se n < 0 | tornou-se bem-definido se `_begin__` puder ser decrementado   
  
### Veja também

[ next](<#/doc/ranges/subrange/next>) | obtém uma cópia do `subrange` com seu iterator avançado por uma dada distância   
(função membro pública)  
[ prev](<#/doc/ranges/subrange/prev>) | obtém uma cópia do `subrange` com seu iterator decrementado por uma dada distância   
(função membro pública)  
[ advance](<#/doc/iterator/advance>) | avança um iterator por uma dada distância   
(modelo de função)  
[ ranges::advance](<#/doc/iterator/ranges/advance>)(C++20) | avança um iterator por uma dada distância ou até um limite dado  
(objeto de função de algoritmo)