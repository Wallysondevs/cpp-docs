# std::ranges::fold_left_first

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
/*indirectly-binary-left-foldable*/<std::iter_value_t<I>, I> F >
requires std::constructible_from<std::iter_value_t<I>, std::iter_reference_t<I>>
constexpr auto
fold_left_first( I first, S last, F f );
template< ranges::input_range R,
/*indirectly-binary-left-foldable*/<
ranges::range_value_t<R>, ranges::iterator_t<R>> F >
requires std::constructible_from<
ranges::range_value_t<R>, ranges::range_reference_t<R>>
constexpr auto
fold_left_first( R&& r, F f );
Conceitos auxiliares
template< class F, class T, class I >
concept /*indirectly-binary-left-foldable*/ = /* see description */;
```

Realiza um [fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda dos elementos do range fornecido, ou seja, retorna o resultado da avaliação da expressão em cadeia:
`f(f(f(f(x1, x2), x3), ...), xn)`, onde `x1`, `x2`, ..., `xn` são elementos do range.

Informalmente, `ranges::fold_left_first` se comporta como a sobrecarga de [std::accumulate](<#/doc/algorithm/accumulate>) que aceita um predicado binário, exceto que o *primeiro elemento é usado internamente como um elemento inicial.

O comportamento é indefinido se `[`first`, `last`)` não for um range válido.

1) O range é `[`first`, `last`)`. Equivalente a retornar [ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(std::move(first), last, f).value.

2) O mesmo que (1), exceto que usa r como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

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

As entidades semelhantes a funções descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para a [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado pela [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — o range de elementos para reduzir
- **r** — o range de elementos para reduzir
- **f** — o objeto de função binária

### Valor de retorno

Um objeto do tipo [std::optional](<#/doc/utility/optional>)&lt;U&gt; que contém o resultado do [fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda do range fornecido sobre f, onde U é equivalente a decltype([ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(std::move(first), last, [std::iter_value_t](<#/doc/iterator/iter_t>)&lt;I&gt;(*first), f)).

Se o range estiver vazio, [std::optional](<#/doc/utility/optional>)&lt;U&gt;() é retornado.

### Implementações possíveis
```cpp
    struct fold_left_first_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 /*indirectly-binary-left-foldable*/<std::iter_value_t<I>, I> F>
        requires
            std::constructible_from<std::iter_value_t<I>, std::iter_reference_t<I>>
        constexpr auto operator()(I first, S last, F f) const
        {
            using U = decltype(
                ranges::fold_left(std::move(first), last, std::iter_value_t<I>(*first), f)
            );
            if (first == last)
                return std::optional<U>();
            std::optional<U> init(std::in_place, *first);
            for (++first; first != last; ++first)
                *init = std::invoke(f, std::move(*init), *first);
            return std::move(init);
        }
    
        template<ranges::input_range R,
                 /*indirectly-binary-left-foldable*/<
                     ranges::range_value_t<R>, ranges::iterator_t<R>> F>
        requires
            std::constructible_from<ranges::range_value_t<R>, ranges::range_reference_t<R>>
        constexpr auto operator()(R&& r, F f) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(f));
        }
    };
    
    inline constexpr fold_left_first_fn fold_left_first;
```

---

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) - 1 (assumindo que o range não está vazio) aplicações do objeto de função f.

### Notas

A tabela a seguir compara todos os algoritmos de fold restritos:

Template de função fold | Começa de | Valor inicial | Tipo de retorno
---|---|---|---
[ranges::fold_left](<#/doc/algorithm/ranges/fold_left>) | esquerda | init | U
ranges::fold_left_first | esquerda | primeiro elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_right](<#/doc/algorithm/ranges/fold_right>) | direita | init | U
[ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>) | direita | último elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>) | esquerda | init | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, U> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, U>, onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
[ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>) | esquerda | primeiro elemento | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_lib_ranges_fold`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::ranges` [algoritmos de fold](<#/doc/algorithm/ranges>)

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
        std::vector v{1, 2, 3, 4, 5, 6, 7, 8};
    
        auto sum = std::ranges::fold_left_first(v.begin(), v.end(), std::plus<int>()); // (1)
        std::cout << "*sum: " << sum.value() << '\n';
    
        auto mul = std::ranges::fold_left_first(v, std::multiplies<int>()); // (2)
        std::cout << "*mul: " << mul.value() << '\n';
    
        // get the product of the std::pair::second of all pairs in the vector:
        std::vector<std::pair<char, float>> data {{'A', 3.f}, {'B', 3.5f}, {'C', 4.f}};
        auto sec = std::ranges::fold_left_first
        (
            data | std::ranges::views::values, std::multiplies<>()
        );
        std::cout << "*sec: " << *sec << '\n';
    
        // use a program defined function object (lambda-expression):
        auto val = std::ranges::fold_left_first(v,  { return x + y + 13; });
        std::cout << "*val: " << *val << '\n';
    }
```

Saída:
```
    *sum: 36
    *mul: 40320
    *sec: 42
    *val: 127
```

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   27.6.18 Fold [alg.fold]

### Veja também

[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | reduz à esquerda um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_right](<#/doc/algorithm/ranges/fold_right>)(C++23) | reduz à direita um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>)(C++23) | reduz à direita um range de elementos usando o último elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | reduz à esquerda um range de elementos, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, valor)
(objeto de função de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | reduz à esquerda um range de elementos usando o primeiro elemento como valor inicial, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, [optional](<#/doc/utility/optional>))
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou reduz um range de elementos
(template de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | semelhante a [std::accumulate](<#/doc/algorithm/accumulate>), exceto pela ordem
(template de função)