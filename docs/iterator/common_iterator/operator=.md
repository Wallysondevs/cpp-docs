# std::common_iterator&lt;I,S&gt;::operator=

```cpp
template< class I2, class S2 >
requires std::convertible_to<const I2&, I> &&
std::convertible_to<const S2&, S> &&
std::assignable_from<I&, const I2&> &&
std::assignable_from<S&, const S2&>
constexpr common_iterator& operator=( const common_iterator<I2, S2>& x );  // (desde C++20)
```

  
Atribui o objeto membro [std::variant](<#/doc/utility/variant>) subjacente `_var_` a partir do de x.

Seja `i` igual a x.var.index(). Então, esta atribuição é equivalente a:

  * std::get<i>(var) = std::get<i>(x.var), se var.index() == i,
  * var.emplace<i>(std::get<i>(x.var)) caso contrário.

O comportamento é indefinido se x estiver em um estado inválido, ou seja, x.var.valueless_by_exception() for igual a true.

### Parâmetros

x  |  \-  |  adaptador de iterator para atribuir   
  
### Valor de retorno

*this

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        const auto il = {1, 2, 3, 4, 5, 6};
        using CI = std::common_iterator<
                       std::counted_iterator<std::initializer_list<int>::iterator>,
                       std::default_sentinel_t>;
        CI first{std::counted_iterator{std::next(begin(il), 1), ssize(il) - 1}};
        const CI first2{std::counted_iterator{std::next(begin(il), 2), ssize(il) - 2}};
        const CI last{std::default_sentinel};
        std::copy(first, last, std::ostream_iterator<int>{std::cout, " "});
        std::cout << '\n';
        first = first2;
        std::copy(first, last, std::ostream_iterator<int>{std::cout, " "});
        std::cout << '\n';
    }
```

Saída: 
```
    2 3 4 5 6 
    3 4 5 6
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3574](<https://cplusplus.github.io/LWG/issue3574>) | C++20  | `variant` era totalmente constexpr (P2231R1) mas `common_iterator` não era  | também foi tornado constexpr   
  
### Veja também

[ (constructor)](<#/doc/iterator/common_iterator/common_iterator>)(C++20) |  constrói um novo adaptador de iterator   
(função membro pública)  