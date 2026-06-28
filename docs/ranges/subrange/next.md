# std::ranges::subrange&lt;I,S,K&gt;::next

```cpp
constexpr subrange next( std::iter_difference_t<I> n = 1 ) const&
requires std::forward_iterator<I>;  // (1) (desde C++20)
constexpr subrange next( std::iter_difference_t<I> n = 1 ) &&;  // (2) (desde C++20)
```

  
Retorna um [`subrange`](<#/doc/ranges/subrange>) cujo `_[begin_](<#/doc/ranges/subrange>)_` é incrementado (ou decrementado se n for negativo). A operação de incremento (ou decremento) real é realizada por [`advance()`](<#/doc/ranges/subrange/advance>). 

1) Retorna uma cópia de *this.

Equivalente a: auto tmp = *this;  
tmp.advance(n);  
return tmp;.

2) Retorna um `subrange` movido de *this.

Equivalente a: advance(n);  
return std::move(*this);.

### Parâmetro

n  |  \-  |  número de incrementos máximos do iterator   
  
### Valor de retorno

Conforme descrito acima. 

### Observações

A diferença entre esta função e [`advance()`](<#/doc/ranges/subrange/advance>) é que esta última realiza o incremento (ou decremento) no local. 

### Exemplo

Execute este código
```
    #include <array>
    #include <iterator>
    #include <print>
    #include <ranges>
     
    int main()
    {
        std::array arr{1, 2, 3, 4, 5, 6, 7};
        std::ranges::subrange sub{std::next(arr.begin(), 2), std::prev(arr.end(), 2)};
        std::println("1) sub: {}", sub);
        std::println("2) sub: {}", sub.next());
        std::println("3) sub: {}", sub.next(2));
    }
```

Output: 
```
    1) sub: [3, 4, 5]
    2) sub: [4, 5]
    3) sub: [5]
```

### Veja também

[ prev](<#/doc/ranges/subrange/prev>) | obtém uma cópia do `subrange` com seu iterator decrementado por uma dada distância   
(função membro pública)  
[ advance](<#/doc/ranges/subrange/advance>) | avança o iterator por uma dada distância   
(função membro pública)  
[ next](<#/doc/iterator/next>)(C++11) | incrementa um iterator   
(modelo de função)  
[ ranges::next](<#/doc/iterator/ranges/next>)(C++20) | incrementa um iterator por uma dada distância ou até um limite  
(objeto de função de algoritmo)