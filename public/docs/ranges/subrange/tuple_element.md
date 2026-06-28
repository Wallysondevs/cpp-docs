# std::tuple_element&lt;std::ranges::subrange&gt;

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
template< class I, class S, ranges::subrange_kind K >
struct tuple_element<0, ranges::subrange<I, S, K>>;
template< class I, class S, ranges::subrange_kind K >
struct tuple_element<0, const ranges::subrange<I, S, K>>;
template< class I, class S, ranges::subrange_kind K >
struct tuple_element<1, ranges::subrange<I, S, K>>;
template< class I, class S, ranges::subrange_kind K >
struct tuple_element<1, const ranges::subrange<I, S, K>>;
```

As especializações parciais de [`std::tuple_element`](<#/doc/utility/tuple_element>) para [std::ranges::subrange](<#/doc/ranges/subrange>) fornecem acesso em tempo de compilação ao tipo de iterator ou sentinel de um `subrange`, usando sintaxe tipo tupla. Elas são fornecidas para suporte a structured binding.

1,2) Obtém o tipo do iterator, isto é, `I`.

3,4) Obtém o tipo do sentinel, isto é, `S`.

### Tipos de membros

Tipo de membro | Definição
---|---
`type` | (1,2) `I`
(3,4) `S`

### Observações

Como as funções [`get`](<#/doc/ranges/subrange/get>) para `subrange` retornam iterators e sentinels por valor, o qualificador `const` não é adicionado aos tipos de resultado quando o `subrange` é `const`-qualificado (mas não `volatile`-qualificado).

Se o `subrange` é `volatile`-qualificado, os tipos de resultado também são `volatile`-qualificados porque as especializações parciais para tipos `volatile` ou `const volatile` são usadas. Tal uso é obsoleto.

### Exemplo

Execute este código
```cpp
    #include <iterator>
    #include <list>
    #include <ranges>
    #include <type_traits>
    
    int main()
    {
        std::list<int> list{3, 1, 4, 1, 5, 9, 2, 6};
    
        std::ranges::subrange subrange
        {
            std::counted_iterator{std::begin(list), 4},
            std::default_sentinel
        };
    
        static_assert(
            std::is_same_v<
                std::tuple_element_t<0, decltype(subrange)>,
                // implementation-defined type:
                std::counted_iterator<std::_List_iterator<int>>
                >);
    
        static_assert(
            std::is_same_v<
                std::tuple_element_t<1, decltype(subrange)>,
                std::default_sentinel_t
                >);
    }
```

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ tuple_element](<#/doc/utility/tuple_element>)(C++11) | obtém os tipos de elemento de um tipo tipo-tupla
(modelo de classe)
[ std::tuple_size<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_size>)(C++20) | obtém o tamanho de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de modelo de classe)