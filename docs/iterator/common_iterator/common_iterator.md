# std::common_iterator&lt;I,S&gt;::common_iterator

```cpp
constexpr common_iterator() requires std::default_initializable<I> = default;  // (1) (desde C++20)
constexpr common_iterator( I i );  // (2) (desde C++20)
constexpr common_iterator( S s );  // (3) (desde C++20)
template< class I2, class S2 >
requires std::convertible_to<const I2&, I> &&
std::convertible_to<const S2&, S>
constexpr common_iterator( const common_iterator<I2, S2>& x );  // (4) (desde C++20)
```

  
Constrói um novo adaptador de iterator, inicializa efetivamente o objeto membro [std::variant](<#/doc/utility/variant>)<I, S> subjacente `_var_` para armazenar um objeto `I` (iterator) ou `S` (sentinel).

1) Construtor padrão. Inicializa `_var_` por padrão. Após a construção, `_var_` armazena um objeto `I` inicializado por valor. As operações no adaptador de iterator resultante têm comportamento definido se e somente se as operações correspondentes em um `I` inicializado por valor também tiverem comportamento definido.

2) Após a construção, `_var_` armazena um objeto `I` construído por move a partir de `i`.

3) Após a construção, `_var_` armazena um objeto `S` construído por move a partir de `s`.

4) Após a construção, `_var_` armazena um objeto `I` ou `S` inicializado a partir do `I2` ou `S2` armazenado por `x.var`, se `x.var` armazenar essa alternativa, respectivamente. O comportamento é indefinido se `x` estiver em um estado inválido, ou seja, `x.var.valueless_by_exception()` for igual a `true`.

### Parâmetros

i  |  \-  |  iterator a ser adaptado   
---|---|---
s  |  \-  |  sentinel a ser adaptado   
x  |  \-  |  adaptador de iterator a ser copiado   
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
     
    int main()
    {
        std::vector v{3, 1, 4, 1, 5, 9, 2};
     
        using CI = std::common_iterator<
                       std::counted_iterator<std::vector<int>::iterator>,
                       std::default_sentinel_t>;
        CI unused; // (1)
        CI start{std::counted_iterator{std::next(begin(v)), ssize(v) - 2}}; // (2)
        CI finish{std::default_sentinel}; // (3)
        CI first{start}; // (4)
        CI last{finish}; // (4)
     
        std::copy(first, last, std::ostream_iterator<int>{std::cout, " "});
        std::cout << '\n';
     
        std::common_iterator<
            std::counted_iterator<
                std::ostream_iterator<double>>,
                std::default_sentinel_t>
                beg{std::counted_iterator{std::ostream_iterator<double>{std::cout,";  "}, 5}},
                end{std::default_sentinel};
        std::iota(beg, end, 3.1);
        std::cout << '\n';
    }
```

Saída: 
```
    1 4 1 5 9
    3.1;  4.1;  5.1;  6.1;  7.1;
```

### Veja também

[ operator=](<#/>)(C++20) |  atribui outro adaptador de iterator   
(função membro pública)  