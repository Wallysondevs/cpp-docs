# iter_move(std::move_iterator)

```cpp
friend constexpr std::iter_rvalue_reference_t<Iter>
iter_move( const std::move_iterator& i ) noexcept(/* see below */);  // (desde C++20)
```

  
Converte o resultado da desreferenciação do iterator subjacente para seu tipo de referência rvalue associado.

Equivalente a `return std::[ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.base());`.

Este modelo de função não é visível para [unqualified lookup](<#/doc/language/unqualified_lookup>) ou [qualified lookup](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando `std::move_iterator<Iter>` é uma classe associada dos argumentos.

### Parameters

i  |  \-  |  um iterator de movimento de origem
  
### Return value

Uma referência rvalue ou um temporário prvalue.

### Complexity

Constante.

### Exceptions

Especificação `noexcept`:

`noexcept(noexcept([ranges::iter_move](<#/doc/iterator/ranges/iter_move>)(i.base())))`

### Example

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    void print(const auto& rem, const auto& v)
    {
        std::cout << rem << '[' << size(v) << "] { ";
        for (char comma[]{0, ' ', 0}; const auto& s : v)
            std::cout << comma << std::quoted(s), comma[0] = ',';
        std::cout << " }\n";
    }
    
    int main()
    {
        std::vector<std::string> p{"Andromeda", "Cassiopeia", "Phoenix"}, q;
    
        print("p", p), print("q", q);
    
        using MI = std::move_iterator<std::vector<std::string>>::iterator>;
    
        for (MI first{p.begin()}, last{p.end()}; first != last; ++first)
            q.emplace_back(/* ADL */ iter_move(first));
    
        print("p", p), print("q", q);
    }
```

Saída possível:
```
    p[3] { "Andromeda", "Cassiopeia", "Phoenix" }
    q[0] {  }
    p[3] { "", "", "" }
    q[3] { "Andromeda", "Cassiopeia", "Phoenix" }
```

### See also

[ iter_move](<#/doc/iterator/ranges/iter_move>)(desde C++20) | converte o resultado da desreferenciação de um objeto para seu tipo de referência rvalue associado
(objeto de ponto de customização)
[ iter_move](<#/doc/iterator/reverse_iterator/iter_move>)(desde C++20) | converte o resultado da desreferenciação do iterator subjacente ajustado para seu tipo de referência rvalue associado
(função)
[ move](<#/doc/utility/move>)(desde C++11) | converte o argumento para um xvalue
(modelo de função)
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(desde C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar exceções
(modelo de função)
[ forward](<#/doc/utility/forward>)(desde C++11) | encaminha um argumento de função e usa o argumento de tipo do template para preservar sua categoria de valor
(modelo de função)
[ ranges::move](<#/doc/algorithm/ranges/move>)(desde C++20) | move um range de elementos para um novo local
(objeto de função de algoritmo)
[ ranges::move_backward](<#/doc/algorithm/ranges/move_backward>)(desde C++20) | move um range de elementos para um novo local em ordem inversa
(objeto de função de algoritmo)