# std::counted_iterator&lt;I&gt;::operator[]

```cpp
constexpr decltype(auto) operator<I> n ) const
requires std::random_access_iterator<I>;  // (desde C++20)
```

  
Acessa o elemento na localização relativa especificada. O comportamento é indefinido se n não for menor que a distância registrada até o final. 

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

this->base()[n]

### Exemplo

Execute este código
```
    #include <array>
    #include <iostream>
    #include <iterator>
    #include <list>
    
    int main()
    {
        std::array array{'A', 'B', 'C', 'D', 'E'};
    
        std::counted_iterator it{array.begin() + 1, /*count:*/ 3};
    
        for (int i{}; i != it.count(); ++i)
            std::cout << it[i] << ' ';
        std::cout << '\n';
    
        for (int i{}; i != it.count(); ++i)
            it[i] += ('E' - 'A');
    
        for (int i{}; i != it.count(); ++i)
            std::cout << it[i] << ' ';
        std::cout << '\n';
    
        std::list list{'X', 'Y', 'Z', 'W'};
        std::counted_iterator it2{list.begin(), 3};
    //  char x = it2[0]; // Error: requirement `random_access_iterator` was not satisfied.
        std::cout << *it2 << '\n'; // OK
    }
```

Saída: 
```
    B C D
    F G H
    X
```

### Veja também

[ operator*operator->](<#/doc/iterator/counted_iterator/operator_star_>)(desde C++20) |  acessa o elemento apontado   
(função membro pública)  