# std::iter_swap(std::reverse_iterator)

```cpp
template< std::indirectly_swappable<Iter> Iter2 >
friend constexpr void iter_swap( const reverse_iterator& x,
const std::reverse_iterator<Iter2>& y )
noexcept(/* see below */);  // (desde C++20)
```

  
Troca os objetos apontados por dois iteradores subjacentes ajustados.

Equivalente a auto tmp_x = x.base();  
auto tmp_y = y.base();  
[ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(\--tmp_x, \--tmp_y);.

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;Iter&gt; é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  iteradores reversos para os elementos a serem trocados   
  
### Complexidade

Constante.

### Exceções

Especificação `noexcept`: 

noexcept(  

[std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;Iter&gt; &&  
[std::is_nothrow_copy_constructible_v](<#/doc/types/is_copy_constructible>)&lt;Iter2&gt; &&  
noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(\--[std::declval](<#/doc/utility/declval>)<Iter&>(), \--[std::declval](<#/doc/utility/declval>)<Iter2&>()))  

)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    int main()
    {
        std::vector v{1, 2, 3};
        std::list l{4, 5, 6};
    
        std::reverse_iterator<std::vector<int>::iterator> r1{v.rbegin()};
        std::reverse_iterator<std::list<int>::iterator> r2{l.rbegin()};
    
        std::cout << *r1 << ' ' << *r2 << '\n';
    
        iter_swap(r1, r2); // ADL
    
        std::cout << *r1 << ' ' << *r2 << '\n';
    }
```

Saída: 
```
    3 6
    6 3
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
[ iter_swap](<#/doc/iterator/move_iterator/iter_swap>)(C++20) |  troca os objetos apontados por dois iteradores subjacentes   
(template de função)