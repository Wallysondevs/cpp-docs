# std::begin(std::initializer_list)

Definido no cabeçalho `[<initializer_list>](<#/doc/header/initializer_list>)`

```c
template< class E >
const E* begin( std::initializer_list<E> il ) noexcept;
(constexpr desde C++14)
```

  
A sobrecarga de [std::begin](<#/doc/iterator/begin>) para `initializer_list` retorna um ponteiro para o primeiro elemento de il. 

### Parâmetros

il  |  \-  |  um `initializer_list`  
  
### Valor de retorno

il.begin()

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        std::initializer_list<char> ϕ = {'1', '.', '6', '1', '8', '0'};
    
        std::copy(std::begin(ϕ),
                  std::end(ϕ),
                  std::ostream_iterator<char>(std::cout, ""));
    
        std::cout << '\n';
    }
```

Saída: 
```
    1.6180
```

### Veja também

[ begin](<#/doc/utility/initializer_list/begin>) |  retorna um ponteiro para o primeiro elemento   
(função membro pública)  