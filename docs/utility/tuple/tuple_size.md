# std::tuple_size&lt;std::tuple&gt;

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class... Types >
struct tuple_size< std::tuple<Types...> >
: std::integral_constant<std::size_t, sizeof...(Types)> { };
```

Fornece acesso ao número de elementos em uma tupla como uma expressão constante em tempo de compilação.

### Template de variável auxiliar

```cpp
template< class T >
constexpr std::size_t tuple_size_v = tuple_size<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `sizeof...(Types)`
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
    #include <iostream>
    #include <tuple>
    
    template <class T>
    void test(T value)
    {
        int a[std::tuple_size_v<T>]; // can be used at compile time
    
        std::cout << std::tuple_size<T>{} << ' ' // or at run time
                  << sizeof a << ' '
                  << sizeof value << '\n';
    }
    
    int main()
    {
        test(std::make_tuple(1, 2, 3.14));
    }
```

Saída possível:
```
    3 12 16
```

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ tuple_size](<#/doc/utility/tuple_size>)(C++11) | obtém o número de elementos de um tipo similar a tupla
(template de classe)
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(C++11) | obtém o tamanho de um `pair`
(especialização de template de classe)
[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(C++11) | obtém o tamanho de um `array`
(especialização de template de classe)
[ std::tuple_size<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_size>)(C++20) | obtém o tamanho de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de template de classe)
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) | tupla acessa o elemento especificado
(template de função)