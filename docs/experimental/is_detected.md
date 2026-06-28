# std::experimental::is_detected, std::experimental::detected_t, std::experimental::detected_or

Definido no cabeçalho `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")

```c
template< template<class...> class Op, class... Args >
using is_detected = /* veja abaixo */;
template< template<class...> class Op, class... Args >
using detected_t = /* veja abaixo */;
template< class Default, template<class...> class Op, class... Args >
using detected_or = /* veja abaixo */;
```

O alias template `detected_or` é um alias para um tipo de classe não especificado com dois typedefs de membro públicos `value_t` e `type`, que são definidos da seguinte forma:

*   Se o _template-id_ Op<Args...> denota um tipo válido, então `value_t` é um alias para [std::true_type](<#/doc/types/integral_constant>), e `type` é um alias para Op<Args...>;
*   Caso contrário, `value_t` é um alias para [std::false_type](<#/doc/types/integral_constant>) e `type` é um alias para `Default`.

O alias template `is_detected` é equivalente a typename detected_or<[std::experimental::nonesuch](<#/doc/experimental/nonesuch>), Op, Args...>::value_t. É um alias para [std::true_type](<#/doc/types/integral_constant>) se o _template-id_ Op<Args...> denota um tipo válido; caso contrário, é um alias para [std::false_type](<#/doc/types/integral_constant>).

O alias template `detected_t` é equivalente a typename detected_or<[std::experimental::nonesuch](<#/doc/experimental/nonesuch>), Op, Args...>::type. É um alias para Op<Args...> se esse _template-id_ denota um tipo válido; caso contrário, é um alias para a classe [`std::experimental::nonesuch`](<#/doc/experimental/nonesuch>).

### Utilitários adicionais

template< template<class...> class Op, class... Args >
constexpr bool is_detected_v = is_detected<Op, Args...>::value; | | (library fundamentals TS v2)
template< template<class...> class Op, class... Args >
constexpr inline bool is_detected_v = is_detected<Op, Args...>::value; | | (library fundamentals TS v3)
template< class Default, template<class...> class Op, class... Args >
using detected_or_t = typename detected_or<Default, Op, Args...>::type; | | (library fundamentals TS v2)
template< class Expected, template<class...> class Op, class... Args >
using is_detected_exact = [std::is_same](<#/doc/types/is_same>)<Expected, detected_t<Op, Args...>>; | | (library fundamentals TS v2)
template< class Expected, template<class...> class Op, class... Args >
constexpr bool is_detected_exact_v =
is_detected_exact<Expected, Op, Args...>::value; | | (library fundamentals TS v2)
template< class Expected, template<class...> class Op, class... Args >
constexpr inline bool is_detected_exact_v =
is_detected_exact<Expected, Op, Args...>::value; | | (library fundamentals TS v3)
template< class To, template<class...> class Op, class... Args >
using is_detected_convertible =
[std::is_convertible](<#/doc/types/is_convertible>)<detected_t<Op, Args...>, To>; | | (library fundamentals TS v2)
template< class To, template<class...> class Op, class... Args >
constexpr bool is_detected_convertible_v =
is_detected_convertible<To, Op, Args...>::value; | | (library fundamentals TS v2)
template< class To, template<class...> class Op, class... Args >
constexpr inline bool is_detected_convertible_v =
is_detected_convertible<To, Op, Args...>::value; | | (library fundamentals TS v3)

O alias template `is_detected_exact` verifica se detected_t<Op, Args...> é `Expected`.

O alias template `is_detected_convertible` verifica se detected_t<Op, Args...> é conversível para `To`.

### Possível implementação
```cpp
    namespace detail
    {
        template<class Default, class AlwaysVoid, template<class...> class Op, class... Args>
        struct detector
        {
            using value_t = std::false_type;
            using type = Default;
        };
    
        template<class Default, template<class...> class Op, class... Args>
        struct detector<Default, std::void_t<Op<Args...>>, Op, Args...>
        {
            using value_t = std::true_type;
            using type = Op<Args...>;
        };
    } // namespace detail
    
    template<template<class...> class Op, class... Args>
    using is_detected = typename detail::detector<nonesuch, void, Op, Args...>::value_t;
    
    template<template<class...> class Op, class... Args>
    using detected_t = typename detail::detector<nonesuch, void, Op, Args...>::type;
    
    template<class Default, template<class...> class Op, class... Args>
    using detected_or = detail::detector<Default, void, Op, Args...>;
```

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <experimental/type_traits>
    
    template<class T>
    using copy_assign_t = decltype(std::declval<T&>() = std::declval<const T&>());
    
    struct Meow {};
    struct Purr { void operator=(const Purr&) = delete; };
    
    static_assert(std::experimental::is_detected<copy_assign_t, Meow>::value,
                  "Meow deve ser atribuível por cópia!");
    static_assert(!std::experimental::is_detected_v<copy_assign_t, Purr>,
                  "Purr não deve ser atribuível por cópia!");
    static_assert(std::experimental::is_detected_exact_v<Meow&, copy_assign_t, Meow>,
                  "A atribuição por cópia de Meow deve retornar Meow&!");
    
    template<class T>
    using diff_t = typename T::difference_type;
    
    template<class Ptr>
    using difference_type = std::experimental::detected_or_t<std::ptrdiff_t, diff_t, Ptr>;
    
    struct Woof { using difference_type = int; };
    struct Bark {};
    
    static_assert(std::is_same<difference_type<Woof>, int>::value,
                  "O difference_type de Woof deve ser int!");
    static_assert(std::is_same<difference_type<Bark>, std::ptrdiff_t>::value,
                  "O difference_type de Bark deve ser ptrdiff_t!");
    
    int main() {}
```