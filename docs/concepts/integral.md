# std::integral

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept integral = std::is_integral_v<T>;
```

O concept integral&lt;T&gt; é satisfeito se e somente se `T` for um tipo integral.

### Exemplo

Execute este código
```cpp
    #include <concepts>
    #include <iostream>
    
    void print(std::integral auto i)
    {
        std::cout << "Integral: " << i << '\n';
    }
    
    void print(auto x)
    {
        std::cout << "Non-integral: " << x << '\n';
    }
    
    int main()
    {
        std::cout << std::boolalpha;
    
        static_assert(std::integral<bool>);
        print(true);
    
        static_assert(std::integral<char>);
        print('o');
    
        static_assert(std::integral<int>);
        print(007);
    
        static_assert( ! std::integral<double> );
        print(2e2);
    
        static_assert( ! std::integral<decltype("")> );
        print("∫∫∫");
    }
```

Saída:
```
    Integral: true
    Integral: o
    Integral: 7
    Non-integral: 200
    Non-integral: ∫∫∫
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.4.7 Arithmetic concepts [concepts.arithmetic]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.4.7 Arithmetic concepts [concepts.arithmetic]

### Veja também

[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(modelo de classe)