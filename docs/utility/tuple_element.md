# std::tuple_element

Definido no header `[<tuple>](<#/doc/header/tuple>)`

```cpp
Definido no header `<array>`
Definido no header `<utility>`
Definido no header `<ranges>`  // (desde C++20)
Definido no header `<complex>`  // (desde C++26)
template< std::size_t I, class T >
struct tuple_element; // não definido  // (1) (desde C++11)
template< std::size_t I, class T >
struct tuple_element< I, const T > {
using type = typename
std::add_const<typename std::tuple_element<I, T>::type>::type;
};  // (2) (desde C++11)
template< std::size_t I, class T >
struct tuple_element< I, volatile T > {
using type = typename
std::add_volatile<typename std::tuple_element<I, T>::type>::type;
};  // (3) (desde C++11)
(obsoleto desde C++20)
template< std::size_t I, class T >
struct tuple_element< I, const volatile T > {
using type = typename
std::add_cv<typename std::tuple_element<I, T>::type>::type;
};  // (4) (desde C++11)
(obsoleto desde C++20)
```

Fornece acesso indexado em tempo de compilação aos tipos dos elementos de um tipo [tuple-like](<#/doc/utility/tuple/tuple-like>).

1) O template primário não é definido. Uma especialização explícita (completa) ou parcial é necessária para tornar um tipo tuple-like.

2-4) Especializações para tipos cv-qualified simplesmente adicionam os qualificadores cv correspondentes por padrão.

`std::tuple_element` interage com a linguagem central: ele pode fornecer suporte a [structured binding](<#/doc/language/structured_binding>) no caso de tipos tuple-like. | (desde C++17)

### Especializações

A standard library fornece as seguintes especializações para tipos da standard library:

[ std::tuple_element<std::tuple>](<#/doc/utility/tuple/tuple_element>)(C++11) | obtém o tipo do elemento especificado
(especialização de template de classe)
[ std::tuple_element<std::pair>](<#/doc/utility/pair/tuple_element>)(C++11) | obtém o tipo dos elementos de `pair`
(especialização de template de classe)
[ std::tuple_element<std::array>](<#/doc/container/array/tuple_element>)(C++11) | obtém o tipo dos elementos de `array`
(especialização de template de classe)
[ std::tuple_element<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_element>)(C++20) | obtém o tipo do iterator ou do sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de template de classe)
[ std::tuple_element<std::complex>](<#/doc/numeric/complex/tuple_element>)(C++26) | obtém o tipo numérico real e imaginário subjacente de um [std::complex](<#/doc/numeric/complex>)
(especialização de template de classe)

Usuários podem especializar `std::tuple_element` para tipos definidos pelo programa para torná-los tuple-like.

Em casos normais onde as funções `get` retornam membros de referência ou referência a subobjetos, apenas especializações para tipos cv-unqualified precisam ser customizadas.

### Tipos membros

Tipo membro | Definição
---|---
type | para uma especialização padrão, o tipo do `I`-ésimo elemento do tipo [tuple-like](<#/doc/utility/tuple/tuple-like>) `T`, onde `I` está em `[`​0​`, `[std::tuple_size](<#/doc/utility/tuple_size>)&lt;T&gt;::value`)`

### Tipos auxiliares

Definido no header `[<tuple>](<#/doc/header/tuple>)`

```cpp
template< std::size_t I, class T >
using tuple_element_t = typename tuple_element<I, T>::type;  // (desde C++14)
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_tuple_element_t`](<#/doc/feature_test>) | [`201402L`](<#/>) | (C++14) | `std::tuple_element_t`

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cstddef>
    #include <iostream>
    #include <ranges>
    #include <tuple>
    #include <type_traits>
    #include <utility>
    
    template<typename T1, typename T2, typename T3>
    struct Triple
    {
        T1 t1;
        T2 t2;
        T3 t3;
    };
    
    // A specialization of std::tuple_element for program-defined type Triple:
    template<std::size_t I, typename T1, typename T2, typename T3>
        struct std::tuple_element<I, Triple<T1, T2, T3>>
        { static_assert(false, "Invalid index"); }; 
    template<typename T1, typename T2, typename T3>
        struct std::tuple_element<0, Triple<T1, T2, T3>> { using type = T1; };
    template<typename T1, typename T2, typename T3>
        struct std::tuple_element<1, Triple<T1, T2, T3>> { using type = T2; };
    template<typename T1, typename T2, typename T3>
        struct std::tuple_element<2, Triple<T1, T2, T3>> { using type = T3; };
    
    
    template<typename... Args> struct TripleTypes
    {
        static_assert(3 == sizeof...(Args), "Expected exactly 3 type names");
        template<std::size_t N>
        using type = typename std::tuple_element_t<N, Triple<Args...>>;
    };
    
    int main()
    {
        TripleTypes<char, int, float>::type<1> i{42};
        std::cout << i << '\n';
    
        using Tri = Triple<int, char, short>; // Tipo definido pelo programa
        static_assert(std::is_same_v<std::tuple_element_t<0, Tri>, int> &&
                      std::is_same_v<std::tuple_element_t<1, Tri>, char> &&
                      std::is_same_v<std::tuple_element_t<2, Tri>, short>);
    
        using Tuple = std::tuple<int, char, short>;
        static_assert(std::is_same_v<std::tuple_element_t<0, Tuple>, int> &&
                      std::is_same_v<std::tuple_element_t<1, Tuple>, char> &&
                      std::is_same_v<std::tuple_element_t<2, Tuple>, short>);
    
        using Array3 = std::array<int, 3>;
        static_assert(std::is_same_v<std::tuple_element_t<0, Array3>, int> &&
                      std::is_same_v<std::tuple_element_t<1, Array3>, int> &&
                      std::is_same_v<std::tuple_element_t<2, Array3>, int>);
    
        using Pair = std::pair<Tuple, Tri>;
        static_assert(std::is_same_v<std::tuple_element_t<0, Pair>, Tuple> &&
                      std::is_same_v<std::tuple_element_t<1, Pair>, Tri>);
    
        using Sub = std::ranges::subrange<int*, int*>;
        static_assert(std::is_same_v<std::tuple_element_t<0, Sub>, int*> &&
                      std::is_same_v<std::tuple_element_t<1, Sub>, int*>);
    }
```

Saída:
```
    42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2212](<https://cplusplus.github.io/LWG/issue2212>) | C++11 | especializações para tipos cv não eram exigidas em alguns headers, o que levava à ambiguidade | exigido

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tuple do inicializador
---|---
[ tuple_size](<#/doc/utility/tuple_size>)(C++11) | obtém o número de elementos de um tipo tuple-like
(template de classe)
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) | cria uma `tuple` concatenando qualquer número de tuples
(template de função)