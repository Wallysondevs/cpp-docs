# std::tuple_size&lt;std::array&gt;

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
template< class T, std::size_t N >
struct tuple_size< std::array<T, N> > :
std::integral_constant<std::size_t, N>
{ };
```

Fornece acesso ao número de elementos em um [std::array](<#/doc/container/array>) como uma expressão constante em tempo de compilação.

### Template de variável auxiliar

```cpp
template< class T >
constexpr std::size_t tuple_size_v = tuple_size<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `N`, o número de elementos no array
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
    
    int main()
    {
        auto arr = std::to_array("ABBA");
        static_assert(std::tuple_size<decltype(arr)>{} == 5);
    }
```

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (desde C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ tuple_size](<#/doc/utility/tuple_size>)(desde C++11) | obtém o número de elementos de um tipo similar a tupla
(template de classe)
[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(desde C++11) | obtém o tamanho de uma `tuple`
(especialização de template de classe)
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(desde C++11) | obtém o tamanho de um `pair`
(especialização de template de classe)
[ std::tuple_size<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_size>)(desde C++20) | obtém o tamanho de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de template de classe)