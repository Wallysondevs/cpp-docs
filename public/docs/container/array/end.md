# std::array&lt;T,N&gt;::end, std::array&lt;T,N&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++11)
(constexpr desde C++17)
const_iterator end() const noexcept;  // (2) (desde C++11)
(constexpr desde C++17)
const_iterator cend() const noexcept;  // (3) (desde C++11)
(constexpr desde C++17)
```

  
Retorna um iterator para o elemento que segue o último elemento do `array`. 

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o elemento que segue o último elemento. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iomanip>
    #include <iostream>
     
    int main()
    {
        std::cout << std::boolalpha;
     
        std::array<int, 0> empty;
        std::cout << "1) "
                  << (empty.begin() == empty.end()) << ' '     // verdadeiro
                  << (empty.cbegin() == empty.cend()) << '\n'; // verdadeiro
        // *(empty.begin()) = 42; // => comportamento indefinido em tempo de execução
     
     
        std::array<int, 4> numbers{5, 2, 3, 4};
        std::cout << "2) "
                  << (numbers.begin() == numbers.end()) << ' '    // falso
                  << (numbers.cbegin() == numbers.cend()) << '\n' // falso
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

[ begincbegin](<#/doc/container/array/begin>) |  retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) |  retorna um iterator para o fim de um container ou array   
(modelo de função)