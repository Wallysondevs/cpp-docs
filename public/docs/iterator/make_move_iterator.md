# std::make_move_iterator

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter >
std::move_iterator<Iter> make_move_iterator( Iter i );
(constexpr desde C++17)
```

`make_move_iterator` é um function template de conveniência que constrói um [std::move_iterator](<#/doc/iterator/move_iterator>) para o iterator `i` fornecido com o tipo deduzido do tipo do argumento.

### Parâmetros

- **i** — iterator de entrada a ser convertido para move iterator

### Valor de retorno

[std::move_iterator](<#/doc/iterator/move_iterator>)&lt;Iter&gt;(std::move(i))

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <string>
    #include <vector>
    
    auto print = 
    {
        for (std::cout << rem; const auto& str : seq)
            std::cout << std::quoted(str) << ' ';
        std::cout << '\n';
    };
    
    int main()
    {
        std::list<std::string> s{"one", "two", "three"};
    
        std::vector<std::string> v1(s.begin(), s.end()); // copy
    
        std::vector<std::string> v2(std::make_move_iterator(s.begin()),
                                    std::make_move_iterator(s.end())); // move
    
        print("v1 now holds: ", v1);
        print("v2 now holds: ", v2);
        print("original list now holds: ", s);
    }
```

Saída possível:
```
    v1 now holds: "one" "two" "three" 
    v2 now holds: "one" "two" "three" 
    original list now holds: "" "" ""
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2061](<https://cplusplus.github.io/LWG/issue2061>) | C++11 | `make_move_iterator` não convertia argumentos de array para ponteiros | feito para converter

### Veja também

[ move_iterator](<#/doc/iterator/move_iterator>)(C++11) | adaptador de iterator que desreferencia para um rvalue
(class template)
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(function template)