# std::format_kind

Definido no cabeçalho `[<format>](<#/doc/header/format>)`

```c
template< class R >
constexpr /* unspecified */ format_kind = /* unspecified */;
template< ranges::input_range R >
requires std::same_as<R, std::remove_cvref_t<R>>
constexpr range_format format_kind<R> = /* see description */;
```

O template de variável `format_kind` seleciona um `std::range_format` apropriado para um range `R`.

`std::format_kind<R>` é definido da seguinte forma:

*   Se `[std::same_as](<#/doc/concepts/same_as>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<R>>, R>` for verdadeiro, `std::format_kind<R>` é `std::range_format::disabled`.
*   Caso contrário, se `R::key_type` for válido e denotar um tipo:
    *   Se `R::mapped_type` for válido e denotar um tipo, seja `U` `[std::remove_cvref_t](<#/doc/types/remove_cvref>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)<R>>`.

    Se `U` for uma especialização de `[std::pair](<#/doc/utility/pair>)` ou `U` for uma especialização de `[std::tuple](<#/doc/utility/tuple>)` e `[std::tuple_size_v](<#/doc/utility/tuple_size>)<U> == 2`, `std::format_kind<R>` é `std::range_format::map`.

*   Caso contrário, `std::format_kind<R>` é `std::range_format::set`.

*   Caso contrário, `std::format_kind<R>` é `std::range_format::sequence`.

Um programa que instancia um template primário do template de variável `format_kind` é malformado.

Dado um [tipo definido pelo programa](<#/doc/language/type-id>) `T` não qualificado por cv que modela [`input_range`](<#/doc/ranges/input_range>), um programa pode especializar `format_kind` para `T`. Tais especializações são utilizáveis em expressões constantes e têm o tipo `const [std::range_format](<#/doc/utility/format/range_format>)`.

### Possível implementação
```cpp
    namespace detail
    {
        template< typename >
        constexpr bool is_pair_or_tuple_2 = false;
    
        template< typename T, typename U >
        constexpr bool is_pair_or_tuple_2<std::pair<T, U>> = true;
    
        template< typename T, typename U >
        constexpr bool is_pair_or_tuple_2<std::tuple<T, U>> = true;
    
        template < typename T >
            requires std::is_reference_v<T> || std::is_const_v<T>
        constexpr bool is_pair_or_tuple_2<T> =
            is_pair_or_tuple_2<std::remove_cvref_t<T>>;
    }
    
    template< class R >
    constexpr range_format format_kind = []
    {
        static_assert(false, "instantiating a primary template is not allowed");
        return range_format::disabled;
    }();
    
    template< ranges::input_range R >
        requires std::same_as<R, std::remove_cvref_t<R>>
    constexpr range_format format_kind<R> = []
    {
        if constexpr (std::same_as<std::remove_cvref_t<std::ranges::range_reference_t<R>>, R>)
            return range_format::disabled;
        else if constexpr (requires { typename R::key_type; })
        {
            if constexpr (requires { typename R::mapped_type; } &&
                          detail::is_pair_or_tuple_2<std::ranges::range_reference_t<R>>)
                return range_format::map;
            else
                return range_format::set;
        }
        else
            return range_format::sequence;
    }();
```

---

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <format>
    #include <map>
    #include <set>
    #include <vector>
    
    struct A {};
    
    static_assert(std::format_kind<std::vector<int>> == std::range_format::sequence);
    static_assert(std::format_kind<std::map<int>> == std::range_format::map);
    static_assert(std::format_kind<std::set<int>> == std::range_format::set);
    static_assert(std::format_kind<std::filesystem::path> == std::range_format::disabled);
    // ill-formed:
    // static_assert(std::format_kind<A> == std::range_format::disabled);
    
    int main() {}
```

### Veja também

[ range_format](<#/doc/utility/format/range_format>)(C++23) | especifica como um range deve ser formatado
(enum)
\*\[Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.