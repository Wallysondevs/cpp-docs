# std::tuple_size

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
Definido no cabeçalho `<tuple>`
Definido no cabeçalho `<utility>`
Definido no cabeçalho `<ranges>`
Definido no cabeçalho `<complex>`
template< class T >
struct tuple_size; // not defined
template< class T >
struct tuple_size< const T >
: std::integral_constant<std::size_t, std::tuple_size<T>::value> {};
template< class T >
struct tuple_size< volatile T >
: std::integral_constant<std::size_t, std::tuple_size<T>::value> {};
(obsoleto em C++20)
template< class T >
struct tuple_size< const volatile T >
: std::integral_constant<std::size_t, std::tuple_size<T>::value> {};
(obsoleto em C++20)
```

Fornece acesso ao número de elementos em um tipo [tuple-like](<#/doc/utility/tuple/tuple-like>) como uma expressão constante em tempo de compilação.

1) O template primário não é definido. Uma especialização explícita (completa) ou parcial é necessária para tornar um tipo tuple-like.

2-4) Especializações para tipos cv-qualified reutilizam o valor das versões cv-unqualified correspondentes por padrão.

`std::tuple_size` interage com a linguagem principal: ele pode fornecer suporte a [structured binding](<#/doc/language/structured_binding>) no caso tuple-like. (2-4) são SFINAE-friendly: se `std::tuple_size<T>::value` for malformado quando tratado como um operando não avaliado, eles não fornecem o membro `value`. A verificação de acesso é realizada como se estivesse em um contexto não relacionado a `tuple_size` e `T`. Apenas a validade do contexto imediato da expressão é considerada. Isso permite
```cpp
    #include <utility>
    
    struct X { int a, b; };
    const auto [x, y] = X(); // a declaração de structured binding primeiro tenta
                             // tuple_size<const X> que tenta usar tuple_size<X>::value,
                             // então um erro suave é encontrado, e vincula-se aos membros de dados públicos
```

| (desde C++17)

### Especializações

A biblioteca padrão fornece as seguintes especializações para tipos da biblioteca padrão:

[ std::tuple_size<std::tuple>](<#/doc/utility/tuple/tuple_size>)(C++11) | obtém o tamanho de uma `tuple`
(especialização de template de classe)
[ std::tuple_size<std::pair>](<#/doc/utility/pair/tuple_size>)(C++11) | obtém o tamanho de um `pair`
(especialização de template de classe)
[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(C++11) | obtém o tamanho de um `array`
(especialização de template de classe)
[ std::tuple_size<std::ranges::subrange>](<#/doc/ranges/subrange/tuple_size>)(C++20) | obtém o tamanho de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(especialização de template de classe)
[ std::tuple_size<std::complex>](<#/doc/numeric/complex/tuple_size>)(C++26) | obtém o tamanho de um [std::complex](<#/doc/numeric/complex>)
(especialização de template de classe)

Todas as especializações de `std::tuple_size` satisfazem [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com a _característica base_ [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), N> para algum `N`.

Usuários podem especializar `std::tuple_size` para tipos definidos pelo programa para torná-los tuple-like. Especializações definidas pelo programa devem atender aos requisitos acima.

Geralmente, apenas especializações para tipos cv-unqualified precisam ser personalizadas.

### Template de variável auxiliar

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class T >
constexpr std::size_t tuple_size_v = tuple_size<T>::value;
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[estático] | para uma especialização padrão, o número de elementos no tipo tuple-like `T`
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
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
    #include <cstddef>
    #include <ranges>
    #include <tuple>
    #include <utility>
    
    template<class T, std::size_t Size> struct Arr { T data[Size]; };
    
    // Especialização definida pelo programa de std::tuple_size:
    template<class T, std::size_t Size> struct std::tuple_size<Arr<T, Size>>
        : public integral_constant<std::size_t, Size> {};
    
    int main()
    {
        using tuple1 = std::tuple<int, char, double>;
        static_assert(3 == std::tuple_size_v<tuple1>); // usa template using (C++17)
    
        using array3x4 = std::array<std::array<int, 3>, 4>;
        static_assert(4 == std::tuple_size<array3x4>{}); // usa operator std::size_t
    
        using pair = std::pair<tuple1, array3x4>;
        static_assert(2 == std::tuple_size<pair>()); // usa operator()
    
        using sub = std::ranges::subrange<char*, char*>;
        static_assert(2 == std::tuple_size<sub>::value);
    
        using Arr5 = Arr<int, 5>;
        static_assert(5 == std::tuple_size_v<Arr5>);
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2212](<https://cplusplus.github.io/LWG/issue2212>) | C++11 | especializações para tipos cv não eram exigidas em alguns cabeçalhos, o que levava à ambiguidade | exigido

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tuple do inicializador
---|---
[ tuple_element](<#/doc/utility/tuple_element>)(C++11) | obtém os tipos de elemento de um tipo tuple-like
(template de classe)
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) | cria uma `tuple` concatenando qualquer número de tuples
(template de função)