# std::ranges::subrange&lt;I,S,K&gt;::prev

```cpp
constexpr subrange prev( std::iter_difference_t<I> n = 1 ) const
requires std::bidirectional_iterator<I>;  // (desde C++20)
```

  
Retorna uma cópia de *this cujo `_[begin_](<#/doc/ranges/subrange>)_` é decrementado (ou incrementado se n for negativo). A operação de decremento (ou incremento) real é realizada por [`advance()`](<#/doc/ranges/subrange/advance>). 

Equivalente a:auto tmp = *this;  
tmp.advance(-n);  
return tmp;. 

### Parâmetros

n  |  \-  |  número de decrementos do iterator   
  
### Valor de retorno

Conforme descrito acima. 

### Observações

A diferença entre esta função e [`advance()`](<#/doc/ranges/subrange/advance>) é que esta última realiza o decremento (ou incremento) no local. 

### Exemplo

Execute este código
```
    #include <iterator>
    #include <list>
    #include <print>
    #include <ranges>
     
    int main()
    {
        std::list list{1, 2, 3, 4, 5};
        std::ranges::subrange sub{std::next(list.begin(), 2), std::prev(list.end(), 2)};
        std::println("{} {} {}", sub, sub.prev(), sub.prev(2));
    }
```

Saída: 
```
    [3] [2, 3] [1, 2, 3]
```

### Ver também

[ next](<#/doc/ranges/subrange/next>) |  obtém uma cópia do `subrange` com seu iterator avançado por uma dada distância   
(função membro pública)  
[ advance](<#/doc/ranges/subrange/advance>) |  avança o iterator por uma dada distância   
(função membro pública)  
[ prev](<#/doc/iterator/prev>)(C++11) |  decrementa um iterator   
(modelo de função)  
[ ranges::prev](<#/doc/iterator/ranges/prev>)(C++20) |  decrementa um iterator por uma dada distância ou até um limite  
(objeto de função de algoritmo)