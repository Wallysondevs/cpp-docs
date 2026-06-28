# iter_swap(std::common_iterator)

```cpp
template< std::indirectly_swappable<I> I2, class S2 >
friend constexpr void
iter_swap( const common_iterator& x,
const std::common_iterator<I2, S2>& y ) noexcept(/*ver abaixo*/);  // (desde C++20)
```

  
Troca os objetos apontados por dois iterators subjacentes. O comportamento é indefinido se x não contiver um objeto `I` ou y não contiver um objeto `I2` (ou seja, pelo menos um de x e y não contiver um iterator).

O corpo da função é equivalente a [ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)(std::get&lt;I&gt;(x.var), std::get&lt;I2&gt;(y.var)).

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando std::common_iterator<I,S> é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  os iterators para os elementos a serem trocados   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exceções

Especificação `noexcept`: 

noexcept(noexcept([ranges::iter_swap](<#/doc/iterator/ranges/iter_swap>)([std::declval](<#/doc/utility/declval>)&lt;const I&&gt;(), [std::declval](<#/doc/utility/declval>)&lt;const I2&&gt;())))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::vector<std::string> v1{"1", "2", "3", "4", "5"},
                                 v2{"α", "β", "γ", "δ", "ε"};
    
        using CI = std::common_iterator<
                       std::counted_iterator<std::vector<std::string>::iterator>,
                       std::default_sentinel_t
                       >;
    
        CI first1{std::counted_iterator{v1.begin(), 3}};
        CI first2{std::counted_iterator{v2.begin(), 4}};
        CI last{std::default_sentinel};
    
        auto print = &
        {
            std::cout << rem << "v1 = ";
            std::ranges::copy(v1, std::ostream_iterator<std::string>{std::cout, " "});
            std::cout << "\nv2 = ";
            std::ranges::copy(v2, std::ostream_iterator<std::string>{std::cout, " "});
            std::cout << '\n';
        };
    
        print("Before iter_swap:\n");
    
        for (; first1 != last && first2 != last; ++first1, ++first2)
            iter_swap(first1, first2); // ADL
    
        print("After iter_swap:\n");
    }
```

Saída: 
```
    Before iter_swap:
    v1 = 1 2 3 4 5 
    v2 = α β γ δ ε 
    After iter_swap:
    v1 = α β γ 4 5 
    v2 = 1 2 3 δ ε
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3574](<https://cplusplus.github.io/LWG/issue3574>) | C++20  | `variant` era totalmente constexpr (P2231R1) mas `common_iterator` não era  | também foi tornado constexpr   
  
### Ver também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(template de função)  
[ swap_ranges](<#/doc/algorithm/swap_ranges>) |  troca dois ranges de elementos   
(template de função)  
[ iter_swap](<#/doc/algorithm/iter_swap>) |  troca os elementos apontados por dois iterators   
(template de função)  
[ iter_swap](<#/doc/iterator/ranges/iter_swap>)(C++20) |  troca os valores referenciados por dois objetos dereferenciáveis  
(objeto de ponto de customização)  
[ iter_swap](<#/doc/iterator/counted_iterator/iter_swap>)(C++20) |  troca os objetos apontados por dois iterators subjacentes   
(template de função)