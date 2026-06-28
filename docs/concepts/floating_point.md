# std::floating_point

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept floating_point = std::is_floating_point_v<T>;
```

O concept floating_point&lt;T&gt; é satisfeito se e somente se `T` for um tipo de ponto flutuante.

### Exemplo

Execute este código
```cpp
    #include <concepts>
    #include <iostream>
    #include <type_traits>
    
    constexpr std::floating_point auto x2(std::floating_point auto x)
    {
        return x + x;
    }
    
    constexpr std::integral auto x2(std::integral auto x)
    {
        return x << 1;
    }
    
    int main()
    {
        constexpr auto d = x2(1.1);
        static_assert(std::is_same_v<double const, decltype(d)>);
        std::cout << d << '\n';
    
        constexpr auto f = x2(2.2f);
        static_assert(std::is_same_v<float const, decltype(f)>);
        std::cout << f << '\n';
    
        constexpr auto i = x2(444);
        static_assert(std::is_same_v<int const, decltype(i)>);
        std::cout << i << '\n';
    }
```

Saída:
```
    2.2
    4.4
    888
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.4.7 Conceitos aritméticos [concepts.arithmetic]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.4.7 Conceitos aritméticos [concepts.arithmetic]

### Veja também

[ is_floating_point](<#/doc/types/is_floating_point>)(C++11) | verifica se um tipo é um tipo de ponto flutuante
(modelo de classe)