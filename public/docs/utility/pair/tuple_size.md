# std::tuple_size&lt;std::pair&gt;

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T1, class T2 >
struct tuple_size<std::pair<T1, T2>>
: std::integral_constant<std::size_t, 2> { };
```

A especialização parcial de `[std::tuple_size](<#/doc/utility/tuple_size>)` para `pair`s fornece uma maneira em tempo de compilação de obter o número de elementos em um `pair`, que é sempre 2, usando sintaxe similar a tupla.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

`value`[static] | o valor constante 2
(constante membro estática pública)

### Funções membro

`operator std::size_t` | converte o objeto para `[std::size_t](<#/doc/types/size_t>)`, retorna `value`
(função membro pública)
`operator()`(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | `[std::size_t](<#/doc/types/size_t>)`
`type` | `[std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <tuple>
    #include <utility>
     
    template<class T>
    void test([[maybe_unused]]T t)
    {
        [[maybe_unused]]
        int a[std::tuple_size<T>::value]; // can be used at compile time
        std::cout << std::tuple_size<T>::value << '\n'; // or at run time
    }
     
    int main()
    {
        test(std::make_tuple(1, 2, 3.14));
        test(std::make_pair(1, 3.14));
    }
```

Saída:
```
    3
    2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2313](<https://cplusplus.github.io/LWG/issue2313>) | C++11 | especializações para `pair` não eram exigidas para serem derivadas de `integral_constant` | exigido

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ tuple_size](<#/doc/utility/tuple_size>)(C++11) | obtém o número de elementos de um tipo similar a tupla
(modelo de classe)
[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(C++11) | obtém o tamanho de um `array`
(especialização de modelo de classe)
[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(C++11) | obtém o tamanho de uma `tuple`
(especialização de modelo de classe)
[ std::tuple_size<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_size>)(C++20) | obtém o tamanho de um `[std::ranges::subrange](<#/doc/ranges/subrange>)`
(especialização de modelo de classe)
[ std::tuple_element<std::pair>](<#/doc/utility/pair/tuple_element>)(C++11) | obtém o tipo dos elementos de `pair`
(especialização de modelo de classe)