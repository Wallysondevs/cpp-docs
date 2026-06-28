# iter_swap(std::move_iterator)

```cpp
template< std::indirectly_swappable<Iter> Iter2 >
friend constexpr void iter_swap( const move_iterator& x,
const std::move_iterator<Iter2>& y )
noexcept(/* veja abaixo */);  // (desde C++20)
```

  
Troca os objetos apontados por dois iterators subjacentes. 

Equivalente a [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.base(), y.base());. 

Este function template não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando [std::move_iterator](<#/doc/iterator/move_iterator>)&lt;Iter&gt; é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  move iterators para os elementos a serem trocados   
  
### Complexidade

Constante. 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept(noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(x.base(), y.base())))

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::vector<std::string> p{"AA", "EE"},
                                 q{"ⱯⱯ", "ƎƎ"};
    
        std::move_iterator<std::vector<std::string>::iterator>
            x = std::make_move_iterator(p.begin()),
            y = std::make_move_iterator(q.begin());
    
        std::cout << *x << ' ' << *y << '\n';
    
        iter_swap(x, y); // ADL
    
        std::cout << *x << ' ' << *y << '\n';
    }
```

Saída: 
```
    AA ⱯⱯ
    ⱯⱯ AA
```

### Veja também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(function template)  
[ swap_ranges](<#/doc/algorithm/swap_ranges>) |  troca dois ranges de elementos   
(function template)  
[ iter_swap](<#/doc/algorithm/iter_swap>) |  troca os elementos apontados por dois iterators   
(function template)  
[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) |  troca os valores referenciados por dois objetos dereferenciáveis  
(customization point object)  
[ iter_swap](<#/doc/iterator/reverse_iterator/iter_swap>)(C++20) |  troca os objetos apontados por dois iterators subjacentes ajustados   
(function template)