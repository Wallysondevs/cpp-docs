# std::common_comparison_category

Definido no cabeçalho `[<compare>](<#/doc/header/compare>)`

```c
template< class... Ts >
struct common_comparison_category
{
using type = /* see below */ ;
};
```

O template de classe `std::common_comparison_category` fornece um alias (como o typedef de membro `type`) para a categoria de comparação mais forte para a qual todos os argumentos de template `Ts...` podem ser convertidos.

Em detalhe, o tipo de comparação comum de uma lista de n tipos `T`0...`T`n-1 é definido como segue:

*   Se qualquer `T`i não for um tipo de categoria de comparação ([`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>), [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>), [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>)), `U` é void.
*   Caso contrário, se pelo menos um `T`i for [`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>), `U` é [`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>).
*   Caso contrário, se pelo menos um `T`i for [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>), `U` é [`std::weak_ordering`](<#/doc/utility/compare/weak_ordering>).
*   Caso contrário (se todo `T`i for [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>), ou se a lista estiver vazia), `U` é [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>).

### Template parameters

- **...Ts** — uma lista de tipos possivelmente vazia

### Helper template

```cpp
template< class... Ts >
using common_comparison_category_t = common_comparison_category<Ts...>::type;  // (desde C++20)
```

### Member types

Member type | Definition
---|---
`type` | a categoria de comparação comum mais forte (conforme definido acima)

### Possible implementation
```cpp
    namespace detail
    {
        template<unsigned int>
        struct common_cmpcat_base     { using type = void; };
        template<>
        struct common_cmpcat_base<0u> { using type = std::strong_ordering; };
        template<>
        struct common_cmpcat_base<2u> { using type = std::partial_ordering; };
        template<>
        struct common_cmpcat_base<4u> { using type = std::weak_ordering; };
        template<>
        struct common_cmpcat_base<6u> { using type = std::partial_ordering; };
    } // namespace detail

    template<class...Ts>
    struct common_comparison_category :
        detail::common_cmpcat_base<(0u | ... |
            (std::is_same_v<Ts, std::strong_ordering>  ? 0u :
             std::is_same_v<Ts, std::weak_ordering>    ? 4u :
             std::is_same_v<Ts, std::partial_ordering> ? 2u : 1u)
        )> {};
```

---

### Example

| Esta seção está incompleta
Razão: sem exemplo

### See also

[ strong_ordering](<#/doc/utility/compare/strong_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e é substituível
(class)
[ weak_ordering](<#/doc/utility/compare/weak_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores e não é substituível
(class)
[ partial_ordering](<#/doc/utility/compare/partial_ordering>)(C++20) | o tipo de resultado de comparação de 3 vias que suporta todos os 6 operadores, não é substituível e permite valores incomparáveis
(class)