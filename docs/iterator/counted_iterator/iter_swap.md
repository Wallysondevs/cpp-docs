# iter_swap(std::counted_iterator)

```cpp
template< std::indirectly_swappable<I> I2 >
friend constexpr void
iter_swap( const counted_iterator& x, const std::counted_iterator<I2>& y )
noexcept(noexcept(ranges::iter_swap(x.base(), y.base())));  // (desde C++20)
```

  
Troca os objetos apontados por dois iteradores subjacentes. O comportamento é indefinido se x.count() ou y.count() for igual a 0.

O corpo da função é equivalente a: [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.base(), y.base());.

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando [std::counted_iterator](<#/doc/iterator/counted_iterator>)&lt;I&gt; é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  adaptadores de iterator para os elementos a serem trocados   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    int main()
    {
        std::vector p{1, 2, 3, 4},
                    q{5, 6, 7, 8};
    
        std::counted_iterator<std::vector<int>::iterator> ip{p.begin(), 2};
        std::counted_iterator<std::vector<int>::iterator> iq{q.begin(), 3};
    
        std::cout << *ip << ' ' << *iq << '\n';
        iter_swap(ip, iq); // ADL
        std::cout << *ip << ' ' << *iq << '\n';
    
        std::list x{0, 1, 3};
        std::counted_iterator<std::list<int>::iterator> ix{x.begin(), 2};
    //  iter_swap(ip, ix); // error: not indirectly swappable
    }
```

Saída: 
```
    1 5
    5 1
```

### Veja também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(template de função)  
[ swap_ranges](<#/doc/algorithm/swap_ranges>) |  troca dois ranges de elementos   
(template de função)  
[ iter_swap](<#/doc/algorithm/iter_swap>) |  troca os elementos apontados por dois iteradores   
(template de função)  
[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) |  troca os valores referenciados por dois objetos desreferenciáveis  
(objeto de ponto de customização)  
[ iter_move](<#/doc/iterator/counted_iterator/iter_move>)(C++20) |  converte o resultado da desreferência do iterator subjacente para seu tipo de referência rvalue associado   
(função)