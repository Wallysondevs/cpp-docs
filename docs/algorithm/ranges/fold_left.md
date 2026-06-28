# std::ranges::fold_left

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S, class T,
/* indirectly-binary-left-foldable */<T, I> F >
constexpr auto fold_left( I first, S last, T init, F f );
(até C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class T = std::iter_value_t<I>,
/* indirectly-binary-left-foldable */<T, I> F >
constexpr auto fold_left( I first, S last, T init, F f );
template< ranges::input_range R, class T,
/* indirectly-binary-left-foldable */
<T, ranges::iterator_t<R>> F >
constexpr auto fold_left( R&& r, T init, F f );
(até C++26)
template< ranges::input_range R, class T = ranges::range_value_t<R>,
/* indirectly-binary-left-foldable */
<T, ranges::iterator_t<R>> F >
constexpr auto fold_left( R&& r, T init, F f );
Conceitos auxiliares
template< class F, class T, class I >
concept /* indirectly-binary-left-foldable */ = /* see description */;
```

Realiza um [fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda dos elementos do range fornecido, ou seja, retorna o resultado da avaliação da expressão em cadeia:
`f(f(f(f(init, x1), x2), ...), xn)`, onde `x1`, `x2`, ..., `xn` são elementos do range.

Informalmente, `ranges::fold_left` se comporta como a sobrecarga de [std::accumulate](<#/doc/algorithm/accumulate>) que aceita um predicado binário.

O comportamento é indefinido se `[`first`, `last`)` não for um range válido.

1) O range é `[`first`, `last`)`. Equivalente a retornar [ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(std::move(first), last, std::move(init), f).value.

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

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos para realizar o fold
- **r** — o range de elementos para realizar o fold
- **init** — o valor inicial do fold
- **f** — o objeto de função binária

### Valor de retorno

Um objeto do tipo U que contém o resultado do [fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda do range fornecido sobre f, onde U é equivalente a [std::decay_t](<#/doc/types/decay>)<[std::invoke_result_t](<#/doc/types/result_of>)<F&, T, [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>>.

Se o range estiver vazio, U(std::move(init)) é retornado.

### Implementações possíveis
```cpp
    struct fold_left_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class T = std::iter_value_t<I>,
                 /* indirectly-binary-left-foldable */<T, I> F>
        constexpr auto operator()(I first, S last, T init, F f) const
        {
            using U = std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>;
            if (first == last)
                return U(std::move(init));
            U accum = std::invoke(f, std::move(init), *first);
            for (++first; first != last; ++first)
                accum = std::invoke(f, std::move(accum), *first);
            return std::move(accum);
        }
    
        template<ranges::input_range R, class T = ranges::range_value_t<R>,
                 /* indirectly-binary-left-foldable */<T, ranges::iterator_t<R>> F>
        constexpr auto operator()(R&& r, T init, F f) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(init), std::ref(f));
        }
    };
    
    inline constexpr fold_left_fn fold_left;
```

---

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações do objeto de função f.

### Notas

A tabela a seguir compara todos os algoritmos de fold restritos:

Template de função fold | Começa de | Valor inicial | Tipo de retorno
---|---|---|---
ranges::fold_left | esquerda | init | U
[ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>) | esquerda | primeiro elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_right](<#/doc/algorithm/ranges/fold_right>) | direita | init | U
[ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>) | direita | último elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>) | esquerda | init | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, U> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, U>, onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
[ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>) | esquerda | primeiro elemento | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_lib_ranges_fold`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | algoritmos fold de `std::ranges`
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | Inicialização por lista para algoritmos ([1,2](<#/doc/algorithm/ranges/fold_left>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <string>
    #include <utility>
    #include <vector>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        std::vector v{1, 2, 3, 4, 5, 6, 7, 8};
    
        int sum = ranges::fold_left(v.begin(), v.end(), 0, std::plus<int>()); // (1)
        std::cout << "sum: " << sum << '\n';
    
        int mul = ranges::fold_left(v, 1, std::multiplies<int>()); // (2)
        std::cout << "mul: " << mul << '\n';
    
        // get the product of the std::pair::second of all pairs in the vector:
        std::vector<std::pair<char, float>> data {{'A', 2.f}, {'B', 3.f}, {'C', 3.5f}};
        float sec = ranges::fold_left
        (
            data | ranges::views::values, 2.0f, std::multiplies<>()
        );
        std::cout << "sec: " << sec << '\n';
    
        // use a program defined function object (lambda-expression):
        std::string str = ranges::fold_left
        (
            v, "A",  s, int x) { return s + ':' + std::to_string(x); }
        );
        std::cout << "str: " << str << '\n';
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 1}, {2, 0}, {3, 0}};
        #ifdef __cpp_lib_algorithm_default_value_type
            auto res = ranges::fold_left(nums, {7, 0}, std::multiplies{}); // (2)
        #else
            auto res = ranges::fold_left(nums, CD{7, 0}, std::multiplies{}); // (2)
        #endif
        std::cout << "res: " << res << '\n';
    }
```

Saída:
```
    sum: 36
    mul: 40320
    sec: 42
    str: A:1:2:3:4:5:6:7:8
    res: (42,42)
```

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   27.6.18 Fold [alg.fold]

### Veja também

[ ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>)(C++23) | realiza um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_right](<#/doc/algorithm/ranges/fold_right>)(C++23) | realiza um fold à direita de um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>)(C++23) | realiza um fold à direita de um range de elementos usando o último elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | realiza um fold à esquerda de um range de elementos, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, valor)
(objeto de função de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | realiza um fold à esquerda de um range de elementos usando o primeiro elemento como valor inicial, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, [optional](<#/doc/utility/optional>))
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou realiza um fold de um range de elementos
(template de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto pela ordem
(template de função)