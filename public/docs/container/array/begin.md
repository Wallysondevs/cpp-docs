# std::array&lt;T,N&gt;::begin, std::array&lt;T,N&gt;::cbegin

```cpp
iterator begin() noexcept;  // (1) (desde C++11)
(constexpr desde C++17)
const_iterator begin() const noexcept;  // (2) (desde C++11)
(constexpr desde C++17)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
(constexpr desde C++17)
```

Retorna um iterator para o primeiro elemento do `array`.

Se o `array` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/array/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <array>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::cout << std::boolalpha;
    
        std::array<int, 0> empty;
        std::cout << "1) "
                  << (empty.begin() == empty.end()) << ' '     // true
                  << (empty.cbegin() == empty.cend()) << '\n'; // true
        // *(empty.begin()) = 42; // => comportamento indefinido em tempo de execução
    
    
        std::array<int, 4> numbers{5, 2, 3, 4};
        std::cout << "2) "
                  << (numbers.begin() == numbers.end()) << ' '    // false
                  << (numbers.cbegin() == numbers.cend()) << '\n' // false
                  << "3) "
                  << *(numbers.begin()) << ' '    // 5
                  << *(numbers.cbegin()) << '\n'; // 5
    
        *numbers.begin() = 1;
        std::cout << "4) " << *(numbers.begin()) << '\n'; // 1
        // *(numbers.cbegin()) = 42; // erro em tempo de compilação:
                                     // variável somente leitura não é atribuível
    
        // imprime todos os elementos
        std::cout << "5) ";
        std::for_each(numbers.cbegin(), numbers.cend(), 
        {
            std::cout << x << ' ';
        });
        std::cout << '\n';
    
        constexpr std::array constants{'A', 'B', 'C'};
        static_assert(constants.begin() != constants.end());   // OK
        static_assert(constants.cbegin() != constants.cend()); // OK
        static_assert(*constants.begin() == 'A');              // OK
        static_assert(*constants.cbegin() == 'A');             // OK
        // *constants.begin() = 'Z'; // erro em tempo de compilação:
                                     // variável somente leitura não é atribuível
    }
```

Saída:
```
    1) true true
    2) false false
    3) 5 5
    4) 1
    5) 1 2 3 4
```

### Veja também

[ endcend](<#/doc/container/array/end>) | retorna um iterator para o fim
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)