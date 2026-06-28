# std::initializer_list&lt;T&gt;::initializer_list

```cpp
initializer_list() noexcept;  // (desde C++11)
(constexpr desde C++14)
```

Constrói uma initializer list vazia.

### Parâmetros

(nenhum)

### Complexidade

Constante

### Notas

Apesar da falta de construtores, é possível criar initializer lists não vazias. Instâncias de `std::initializer_list` são implicitamente construídas quando:

  * um _braced-init-list_ é usado em [list-initialization](<#/doc/language/list_initialization>), incluindo list initialization de chamada de função e expressões de atribuição (não confundir com [constructor initializer lists](<#/doc/language/initializer_list>))
  * um _braced-init-list_ é vinculado a auto, inclusive em um [ranged for loop](<#/doc/language/range-for>)

### Exemplo

Execute este código
```
    #include <initializer_list>
    #include <iostream>
     
    int main()
    {
        std::initializer_list<int> empty_list;
        std::cout << "empty_list.size(): " << empty_list.size() << '\n';
     
        // cria initializer lists usando list-initialization
        std::initializer_list<int> digits{1, 2, 3, 4, 5};
        std::cout << "digits.size(): " << digits.size() << '\n';
     
        // regra especial para auto significa que 'fractions' tem o
        // tipo std::initializer_list<double>
        auto fractions = {3.14159, 2.71828};
        std::cout << "fractions.size(): " << fractions.size() << '\n';
     
        // cria initializer list constexpr (desde C++14)
        static constexpr auto ab = {'a', 'b'};
        static_assert(ab.size() == 2 and *ab.begin() == 'a');
    }
```

Saída:
```
    empty_list.size(): 0
    digits.size(): 5
    fractions.size(): 2
```