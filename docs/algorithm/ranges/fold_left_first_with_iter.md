# std::ranges::fold_left_first_with_iter, std::ranges::fold_left_first_with_iter_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
/*indirectly-binary-left-foldable*/<std::iter_value_t<I>, I> F >
requires std::constructible_from<
std::iter_value_t<I>, std::iter_reference_t<I>>
constexpr /* see description */
fold_left_first_with_iter( I first, S last, F f );
template< ranges::input_range R,
/*indirectly-binary-left-foldable*/<
ranges::range_value_t<R>, ranges::iterator_t<R>> F >
requires std::constructible_from<
ranges::range_value_t<R>, ranges::range_reference_t<R>>
constexpr /* see description */
fold_left_first_with_iter( R&& r, F f );
Conceitos auxiliares
template< class F, class T, class I >
concept /*indirectly-binary-left-foldable*/ = /* see description */;
Modelo de classe auxiliar
template< class I, class T >
using fold_left_first_with_iter_result = ranges::in_value_result<I, T>;
```

Realiza um [fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda dos elementos do dado range, ou seja, retorna o resultado da avaliação da expressão em cadeia:
`f(f(f(f(x1, x2), x3), ...), xn)`, onde `x1`, `x2`, ..., `xn` são elementos do range.

Informalmente, `ranges::fold_left_first_with_iter` se comporta como a sobrecarga de [std::accumulate](<#/doc/algorithm/accumulate>) que aceita um predicado binário, exceto que o *primeiro elemento* é usado internamente como um elemento inicial.

O comportamento é indefinido se `[`first`, `last`)` não for um range válido.

1) O range é `[`first`, `last`)`.

2) O mesmo que (1), exceto que usa `r` como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

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

4) O alias do tipo de retorno. Veja a seção "[Valor de retorno](<#/doc/algorithm/ranges/fold_left_first_with_iter>)" para detalhes.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — o range de elementos para realizar o fold
- **r** — o range de elementos para realizar o fold
- **f** — o objeto de função binária

### Valor de retorno

Seja U `decltype([ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(std::move(first), last, [std::iter_value_t](<#/doc/iterator/iter_t>)<I>(*first), f))`.

1) Um objeto do tipo `ranges::fold_left_first_with_iter_result<I, [std::optional](<#/doc/utility/optional>)<U>>`.

*   O membro `ranges::in_value_result::in` contém um iterator para o final do range.
*   O membro `ranges::in_value_result::value` contém o resultado do [fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda do dado range sobre `f`.

Se o range estiver vazio, o valor de retorno é `{std::move(first), [std::optional](<#/doc/utility/optional>)<U>()}`.

2) O mesmo que (1), exceto que o tipo de retorno é `ranges::fold_left_first_with_iter_result<[ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)<R>, [std::optional](<#/doc/utility/optional>)<U>>`.

### Possíveis implementações
```cpp
    class fold_left_first_with_iter_fn
    {
        template<class O, class I, class S, class F>
        constexpr auto impl(I&& first, S&& last, F f) const
        {
            using U = decltype(
                ranges::fold_left(std::move(first), last, std::iter_value_t<I>(*first), f)
            );
            using Ret = ranges::fold_left_first_with_iter_result<O, std::optional<U>>;
            if (first == last)
                return Ret{std::move(first), std::optional<U>()};
            std::optional<U> init(std::in_place, *first);
            for (++first; first != last; ++first)
                *init = std::invoke(f, std::move(*init), *first);
            return Ret{std::move(first), std::move(init)};
        }
    
    public:
        template<std::input_iterator I, std::sentinel_for<I> S,
                 /*indirectly-binary-left-foldable*/<std::iter_value_t<I>, I> F>
        requires std::constructible_from<std::iter_value_t<I>, std::iter_reference_t<I>>
        constexpr auto operator()(I first, S last, F f) const
        {
            return impl<I>(std::move(first), std::move(last), std::ref(f));
        }
    
        template<ranges::input_range R, /*indirectly-binary-left-foldable*/<
            ranges::range_value_t<R>, ranges::iterator_t<R>> F>
        requires
            std::constructible_from<ranges::range_value_t<R>, ranges::range_reference_t<R>>
        constexpr auto operator()(R&& r, F f) const
        {
            return impl<ranges::borrowed_iterator_t<R>>(
                ranges::begin(r), ranges::end(r), std::ref(f)
            );
        }
    };
    
    inline constexpr fold_left_first_with_iter_fn fold_left_first_with_iter;
```

---

### Complexidade

Exatamente `[ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) - 1` (assumindo que o range não esteja vazio) aplicações do objeto de função `f`.

### Notas

A tabela a seguir compara todos os algoritmos de fold restritos:

Modelo de função de Fold | Começa de | Valor inicial | Tipo de retorno
---|---|---|---
[ranges::fold_left](<#/doc/algorithm/ranges/fold_left>) | esquerda | init | U
[ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>) | esquerda | primeiro elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_right](<#/doc/algorithm/ranges/fold_right>) | direita | init | U
[ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>) | direita | último elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>) | esquerda | init | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, U> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, U>, onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
ranges::fold_left_first_with_iter | esquerda | primeiro elemento | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_lib_ranges_fold`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | `std::ranges` [fold algorithms](<#/doc/algorithm/ranges>)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <utility>
    #include <vector>
    
    int main()
    {
        std::vector v{1, 2, 3, 4, 5, 6, 7, 8};
    
        auto sum = std::ranges::fold_left_first_with_iter
        (
            v.begin(), v.end(), std::plus<int>()
        );
        std::cout << "sum: " << sum.value.value() << '\n';
        assert(sum.in == v.end());
    
        auto mul = std::ranges::fold_left_first_with_iter(v, std::multiplies<int>());
        std::cout << "mul: " << mul.value.value() << '\n';
        assert(mul.in == v.end());
    
        // get the product of the std::pair::second of all pairs in the vector:
        std::vector<std::pair<char, float>> data {{'A', 2.f}, {'B', 3.f}, {'C', 7.f}};
        auto sec = std::ranges::fold_left_first_with_iter
        (
            data | std::ranges::views::values, std::multiplies<>()
        );
        std::cout << "sec: " << sec.value.value() << '\n';
    
        // use a program defined function object (lambda-expression):
        auto lambda =  { return x + y + 2; };
        auto val = std::ranges::fold_left_first_with_iter(v, lambda);
        std::cout << "val: " << val.value.value() << '\n';
        assert(val.in == v.end());
    }
```

Saída:
```
    sum: 36
    mul: 40320
    sec: 42
    val: 50
```

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   27.6.18 Fold [alg.fold]

### Veja também

[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | realiza um fold à esquerda de um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>)(C++23) | realiza um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_right](<#/doc/algorithm/ranges/fold_right>)(C++23) | realiza um fold à direita de um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>)(C++23) | realiza um fold à direita de um range de elementos usando o último elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | realiza um fold à esquerda de um range de elementos, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, valor)
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou realiza um fold de um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto fora de ordem
(modelo de função)