# std::ranges::replace, std::ranges::replace_if

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
Assinatura da chamada
  // (1)
template< std::input_iterator I, std::sentinel_for<I> S,
class T1, class T2, class Proj = std::identity >
requires std::indirectly_writable<I, const T2&> &&
std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T1*>
constexpr I replace( I first, S last, const T1& old_value,
const T2& new_value, Proj proj = {} );  // (desde C++20)
(até C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T1 = std::projected_value_t<I, Proj>, class T2 = T1 >
requires std::indirectly_writable<I, const T2&> &&
std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T1*>
constexpr I replace( I first, S last, const T1& old_value,
const T2& new_value, Proj proj = {} );  // (desde C++26)
  // (2)
template< ranges::input_range R,
class T1, class T2, class Proj = std::identity >
requires std::indirectly_writable<ranges::iterator_t<R>, const T2&> &&
std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T1*>
constexpr ranges::borrowed_iterator_t<R>
replace( R&& r, const T1& old_value,
const T2& new_value, Proj proj = {} );  // (desde C++20)
(até C++26)
template< ranges::input_range R,
class Proj = std::identity,
class T1 = std::projected_value_t<ranges::iterator_t<R>, Proj>,
class T2 = T1 >
requires std::indirectly_writable<ranges::iterator_t<R>, const T2&> &&
std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T1*>
constexpr ranges::borrowed_iterator_t<R>
replace( R&& r, const T1& old_value,
const T2& new_value, Proj proj = {} );  // (desde C++26)
  // (3)
template< std::input_iterator I, std::sentinel_for<I> S,
class T, class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
requires std::indirectly_writable<I, const T&>
constexpr I replace_if( I first, S last, Pred pred,
const T& new_value, Proj proj = {} );  // (desde C++20)
(até C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj>,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
requires std::indirectly_writable<I, const T&>
constexpr I replace_if( I first, S last, Pred pred,
const T& new_value, Proj proj = {} );  // (desde C++26)
  // (4)
template< ranges::input_range R, class T, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
requires std::indirectly_writable<ranges::iterator_t<R>, const T&>
constexpr ranges::borrowed_iterator_t<R>
replace_if( R&& r, Pred pred, const T& new_value, Proj proj = {} );  // (desde C++20)
(até C++26)
template< ranges::input_range R, class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj>,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
requires std::indirectly_writable<ranges::iterator_t<R>, const T&>
constexpr ranges::borrowed_iterator_t<R>
replace_if( R&& r, Pred pred, const T& new_value, Proj proj = {} );  // (desde C++26)
```

Substitui todos os elementos que satisfazem critérios específicos por `new_value` no range `[`first`, `last`)`.

1) Substitui todos os elementos que são iguais a `old_value`, usando [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i) == old_value para comparar.

3) Substitui todos os elementos para os quais o predicado `pred` avalia como verdadeiro, onde a expressão de avaliação é [std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)).

2,4) O mesmo que (1,3), mas usa `r` como o range, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a processar
- **r** — o range de elementos a processar
- **old_value** — o valor dos elementos a substituir
- **new_value** — o valor a ser usado como substituto
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

Um iterator igual a `last`.

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações do predicado `comp` correspondente e de qualquer projeção `proj`.

### Observações

Como o algoritmo recebe `old_value` e `new_value` por referência, ele pode ter comportamento inesperado se um deles for uma referência a um elemento do range `[`first`, `last`)`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [List-initialization](<#/doc/language/list_initialization>) para algoritmos ([1-4](<#/doc/algorithm/ranges/replace>))

### Implementação possível

[replace](<#/doc/algorithm/ranges/replace>)
```cpp
    struct replace_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 class T1 = std::projected_value_t<I, Proj>, class T2 = T1>
        requires std::indirectly_writable<I, const T2&> && 
                 std::indirect_binary_predicate
                     <ranges::equal_to, std::projected<I, Proj>, const T1*>
        constexpr I operator()(I first, S last, const T1& old_value,
                               const T2& new_value, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (old_value == std::invoke(proj, *first))
                    *first = new_value;
            return first;
        }
    
        template<ranges::input_range R, class Proj = std::identity
                 class T1 = std::projected_value_t<ranges::iterator_t<R>, Proj>,
                 class T2 = T1>
        requires std::indirectly_writable<ranges::iterator_t<R>, const T2&> &&
                 std::indirect_binary_predicate<ranges::equal_to,
                 std::projected<ranges::iterator_t<R>, Proj>, const T1*>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, const T1& old_value,
                       const T2& new_value, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), old_value,
                           new_value, std::move(proj));
        }
    };
    
    inline constexpr replace_fn replace {};
```

[replace_if](<#/doc/algorithm/ranges/replace>)
```cpp
    struct replace_if_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity, class T = std::projected_value_t<I, Proj>,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        requires std::indirectly_writable<I, const T&>
        constexpr I operator()(I first, S last, Pred pred,
                               const T& new_value, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (!!std::invoke(pred, std::invoke(proj, *first)))
                    *first = new_value;
            return std::move(first);
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>
                 std::indirect_unary_predicate
                     <std::projected<ranges::iterator_t<R>, Proj>> Pred>
        requires std::indirectly_writable<ranges::iterator_t<R>, const T&>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Pred pred, const T& new_value, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(pred),
                           new_value, std::move(proj));
        }
    };
    
    inline constexpr replace_if_fn replace_if {};
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <complex>
    #include <iostream>
    
    void println(const auto& v)
    {
        for (const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        namespace ranges = std::ranges;
    
        std::array p{1, 6, 1, 6, 1, 6};
        println(p);
        ranges::replace(p, 6, 9);
        println(p);
    
        std::array q{1, 2, 3, 6, 7, 8, 4, 5};
        println(q);
        ranges::replace_if(q,  { return 5 < x; }, 5);
        println(q);
    
        std::array<std::complex<double>, 2> nums{{{1, 3}, {1, 3}}};
        println(nums);
        #ifdef __cpp_lib_algorithm_default_value_type
            ranges::replace(nums, {1, 3}, {4, 2});
        #else
            ranges::replace(nums, std::complex<double>{1, 3}, std::complex<double>{4, 2});
        #endif
        println(nums);
    }
```

Saída:
```
    1 6 1 6 1 6
    1 9 1 9 1 9
    1 2 3 6 7 8 4 5
    1 2 3 5 5 5 4 5
    (1,3) (1,3)
    (4,2) (4,2)
```

### Veja também

[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(objeto de função de algoritmo)
[ replacereplace_if](<#/doc/algorithm/replace>) | substitui todos os valores que satisfazem critérios específicos por outro valor
(modelo de função)