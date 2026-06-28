# std::tuple_size&lt;std:ranges::subrange&gt;

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class I, class S, ranges::subrange_kind K >
struct tuple_size<ranges::subrange<I, S, K>>
: std::integral_constant<std::size_t, 2> {};
```

A especialização parcial de [`std::tuple_size`](<#/doc/utility/tuple_size>) para [std::ranges::subrange](<#/doc/ranges/subrange>) fornece uma maneira em tempo de compilação de obter o número de componentes de um `subrange`, que é sempre 2, usando sintaxe semelhante a tupla. É fornecido para suporte a structured binding.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | o valor constante 2
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | [std::size_t](<#/doc/types/size_t>)
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <iterator>
    #include <ranges>
    
    int main()
    {
        static_assert(2 == std::tuple_size_v<std::ranges::subrange<int*, int*>>);
    
        using array5 = std::array<int, 5>;
    
        static_assert(2 == std::tuple_size<std::ranges::subrange<
            array5::const_iterator, array5::const_iterator>>{});
    
        constexpr array5 a{1, 2, 3, 4, 5};
    
        std::ranges::subrange sub_a1{a};
    
        for (std::cout << "sub_a1: { "; int e : sub_a1)
            std::cout << e << ' ';
        std::cout << "}\n";
    
        std::ranges::subrange sub_a2{std::next(cbegin(a)), std::prev(cend(a))};
    
        const auto [first, last] = sub_a2;
        std::cout << "sub_a2 size = " << std::distance(first, last) << '\n';
    
        for (std::cout << "sub_a2: { "; int e : sub_a2)
            std::cout << e << ' ';
        std::cout << "}\n";
    }
```

Saída:
```
    sub_a1: { 1 2 3 4 5 }
    sub_a2 size = 3
    sub_a2: { 2 3 4 }
```

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ tuple_size](<#/doc/utility/tuple_size>)(C++11) | obtém o número de elementos de um tipo semelhante a tupla
(modelo de classe)
[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(C++11) | obtém o tamanho de uma `tuple`
(especialização de modelo de classe)
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(C++11) | obtém o tamanho de um `pair`
(especialização de modelo de classe)
[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(C++11) | obtém o tamanho de um `array`
(especialização de modelo de classe)
[ std::tuple_element<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_element>)(C++20) | obtém o tipo do iterator ou do sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de modelo de classe)