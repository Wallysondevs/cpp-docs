# std::ranges::fold_right_last

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I, std::sentinel_for<I> S,
/*indirectly-binary-right-foldable*/<std::iter_value_t<I>, I> F >
requires std::constructible_from<
std::iter_value_t<I>, std::iter_reference_t<I>>
constexpr auto
fold_right_last( I first, S last, F f );
template< ranges::bidirectional_range R,
/*indirectly-binary-right-foldable*/<
ranges::range_value_t<R>, ranges::iterator_t<R>> F >
requires std::constructible_from<
ranges::range_value_t<R>, ranges::range_reference_t<R>>
constexpr auto
fold_right_last( R&& r, F f );
Conceitos auxiliares
template< class F, class T, class I >
concept /*indirectly-binary-left-foldable*/ = /* see description */;
template< class F, class T, class I >
concept /*indirectly-binary-right-foldable*/ = /* see description */;
```

Realiza uma "dobra" (fold) à direita dos elementos do range fornecido, ou seja, retorna o resultado da avaliação da expressão em cadeia:
`f(x1, f(x2, ...f(xn-1, xn)))`, onde `x1`, `x2`, ..., `xn` são elementos do range.

Informalmente, `ranges::fold_right_last` se comporta como `std::fold_left(ranges::reverse(r), *--last, /*flipped*/(f))` (assumindo que o range não está vazio).

O comportamento é indefinido se `[`first`, `last`)` não for um range válido.

1) O range é `[`first`, `last`)`. Dado U como `decltype(ranges::fold_right(first, last, std::iter_value_t<I>(*first), f))`, equivalente a:
```cpp
    if (first == last)
        return std::optional<U>();
    I tail = ranges::prev(ranges::next(first, std::move(last)));
    return std::optional<U>(std::in_place, ranges::fold_right(std::move(first), tail,
        std::iter_value_t<I>(*tail), std::move(f)));
```

2) O mesmo que (1), exceto que usa `r` como o range, como se estivesse usando `ranges::begin(r)` como `first` e `ranges::end(r)` como `last`.

3) Equivalente a: Conceitos auxiliares
```cpp
template< class F, class T, class I, class U >
concept /*indirectly-binary-left-foldable-impl*/ =
std::movable<T> &&
std::movable<U> &&
std::convertible_to<T, U> &&
std::invocable<F&, U, std::iter_reference_t<I>> &&
std::assignable_from<U&,
std::invoke_result_t<F&, U, std::iter_reference_t<I>>>; | (3A)  // (apenas para exposição*)
template< class F, class T, class I >
concept /*indirectly-binary-left-foldable*/ =
std::copy_constructible<F> &&
std::indirectly_readable<I> &&
std::invocable<F&, T, std::iter_reference_t<I>> &&
std::convertible_to<std::invoke_result_t<F&, T, std::iter_reference_t<I>>,
std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>> &&
/*indirectly-binary-left-foldable-impl*/<F, T, I,
std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>>; | (3B)  // (apenas para exposição*)
```

4) Equivalente a: Conceitos auxiliares
```cpp
template< class F, class T, class I >
concept /*indirectly-binary-right-foldable*/ =
/*indirectly-binary-left-foldable*/</*flipped*/<F>, T, I>; | (4A)  // (apenas para exposição*)
Modelos de classe auxiliares
template< class F >
class /*flipped*/
{
F f; // apenas para exposição
public:
template< class T, class U >
requires std::invocable<F&, U, T>
std::invoke_result_t<F&, U, T> operator()( T&&, U&& );
}; | (4B)  // (apenas para exposição*)
```

As entidades tipo função descritas nesta página são _objetos de função de algoritmo_ (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para a pesquisa dependente de argumento (argument-dependent lookup).
  * Quando qualquer um deles é encontrado por pesquisa não qualificada normal (normal unqualified lookup) como o nome à esquerda do operador de chamada de função, a pesquisa dependente de argumento (argument-dependent lookup) é inibida.

### Parâmetros

- **first, last** — o range de elementos a serem dobrados
- **r** — o range de elementos a serem dobrados
- **f** — o objeto de função binária

### Valor de retorno

Um objeto do tipo `std::optional<U>` que contém o resultado da "dobra" (fold) à direita do range fornecido sobre `f`.

Se o range estiver vazio, `std::optional<U>()` é retornado.

### Possíveis implementações
```cpp
    struct fold_right_last_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S,
                 /*indirectly-binary-right-foldable*/<std::iter_value_t<I>, I> F>
        requires
            std::constructible_from<std::iter_value_t<I>, std::iter_reference_t<I>>
        constexpr auto operator()(I first, S last, F f) const
        {
            using U = decltype(
                ranges::fold_right(first, last, std::iter_value_t<I>(*first), f));
    
            if (first == last)
                return std::optional<U>();
            I tail = ranges::prev(ranges::next(first, std::move(last)));
            return std::optional<U>(std::in_place, ranges::fold_right(std::move(first), tail, std::iter_value_t<I>(*tail),
                                   std::move(f)));
        }
    
        template<ranges::bidirectional_range R,
                 /*indirectly_binary_right_foldable*/<
                     ranges::range_value_t<R>, ranges::iterator_t<R>> F>
        requires
            std::constructible_from<ranges::range_value_t<R>, ranges::range_reference_t<R>>
        constexpr auto operator()(R&& r, F f) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(f));
        }
    };
    
    inline constexpr fold_right_last_fn fold_right_last;
```

---

### Complexidade

Exatamente `ranges::distance(first, last)` aplicações do objeto de função `f`.

### Notas

A tabela a seguir compara todos os algoritmos de "dobra" (fold) restritos:

Modelo de função fold | Começa de | Valor inicial | Tipo de retorno
---|---|---|---
[ranges::fold_left](<#/doc/algorithm/ranges/fold_left>) | esquerda | init | U
[ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>) | esquerda | primeiro elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_right](<#/doc/algorithm/ranges/fold_right>) | direita | init | U
ranges::fold_right_last | direita | último elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>) | esquerda | init | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, U> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, U>, onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
[ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>) | esquerda | primeiro elemento | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
Macro de teste de recurso | Valor | Std | Recurso
[`__cpp_lib_ranges_fold`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | algoritmos fold de `std::ranges`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <utility>
    #include <vector>
    
    int main()
    {
        auto v = {1, 2, 3, 4, 5, 6, 7, 8};
        std::vector<std::string> vs {"A", "B", "C", "D"};
    
        auto r1 = std::ranges::fold_right_last(v.begin(), v.end(), std::plus<>()); // (1)
        std::cout << "*r1: " << *r1 << '\n';
    
        auto r2 = std::ranges::fold_right_last(vs, std::plus<>()); // (2)
        std::cout << "*r2: " << *r2 << '\n';
    
        // Use a program defined function object (lambda-expression):
        auto r3 = std::ranges::fold_right_last(v,  { return x + y + 99; });
        std::cout << "*r3: " << *r3 << '\n';
    
        // Get the product of the std::pair::second of all pairs in the vector:
        std::vector<std::pair<char, float>> data {{'A', 3.f}, {'B', 3.5f}, {'C', 4.f}};
        auto r4 = std::ranges::fold_right_last
        (
            data | std::ranges::views::values, std::multiplies<>()
        );
        std::cout << "*r4: " << *r4 << '\n';
    }
```

Saída:
```
    *r1: 36
    *r2: ABCD
    *r3: 729
    *r4: 42
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 27.6.18 Fold [alg.fold]

### Veja também

[ ranges::fold_right](<#/doc/algorithm/ranges/fold_right>)(C++23) | realiza uma "dobra" (fold) à direita de um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | realiza uma "dobra" (fold) à esquerda de um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>)(C++23) | realiza uma "dobra" (fold) à esquerda de um range de elementos usando o primeiro elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | realiza uma "dobra" (fold) à esquerda de um range de elementos, e retorna um par (iterator, valor)
(objeto de função de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | realiza uma "dobra" (fold) à esquerda de um range de elementos usando o primeiro elemento como valor inicial, e retorna um par (iterator, optional)
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou "dobra" (fold) um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto pela ordem
(modelo de função)