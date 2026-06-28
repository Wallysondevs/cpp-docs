# std::ranges::fold_left_with_iter, std::ranges::fold_left_with_iter_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S, class T,
/* indirectly-binary-left-foldable */<T, I> F >
constexpr /* veja a descrição */
fold_left_with_iter( I first, S last, T init, F f );
(até C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class T = std::iter_value_t<I>,
/* indirectly-binary-left-foldable */<T, I> F >
constexpr /* veja a descrição */
fold_left_with_iter( I first, S last, T init, F f );
template< ranges::input_range R, class T,
/* indirectly-binary-left-foldable */
<T, ranges::iterator_t<R>> F >
constexpr /* veja a descrição */
fold_left_with_iter( R&& r, T init, F f );
(até C++26)
template< ranges::input_range R, class T = ranges::range_value_t<R>,
/* indirectly-binary-left-foldable */
<T, ranges::iterator_t<R>> F >
constexpr /* veja a descrição */
fold_left_with_iter( R&& r, T init, F f );
Conceitos auxiliares
template< class F, class T, class I >
concept /* indirectly-binary-left-foldable */ = /* veja a descrição */;
Modelo de classe auxiliar
template< class I, class T >
using fold_left_with_iter_result = ranges::in_value_result<I, T>;
```

[Dobra](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda os elementos do range dado, ou seja, retorna o resultado da avaliação da expressão em cadeia:
`f(f(f(f(init, x1), x2), ...), xn)`, onde `x1`, `x2`, ..., `xn` são elementos do range.

Informalmente, `ranges::fold_left_with_iter` se comporta como a sobrecarga de [std::accumulate](<#/doc/algorithm/accumulate>) que aceita um predicado binário.

O comportamento é indefinido se `[`first`, `last`)` não for um range válido.

1) O range é `[`first`, `last`)`.

2) O mesmo que (1), exceto que usa r como o range, como se usando [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

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

4) O alias do tipo de retorno. Veja a seção "[Valor de retorno](<#/doc/algorithm/ranges/fold_left_with_iter>)" para detalhes.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para a [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado pela [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — o range de elementos a dobrar
- **r** — o range de elementos a dobrar
- **init** — o valor inicial da dobra
- **f** — o objeto de função binária

### Valor de retorno

Seja U [std::decay_t](<#/doc/types/decay>)<[std::invoke_result_t](<#/doc/types/result_of>)<F&, T, [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;>>.

1) Um objeto do tipo ranges::fold_left_with_iter_result<I, U>.

*   O membro ranges::in_value_result::in contém um iterator para o final do range.
*   O membro ranges::in_value_result::value contém o resultado da [dobra](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda do range dado sobre f.

Se o range estiver vazio, o valor de retorno é obtido através da expressão equivalente a return {std::move(first), U(std::move(init))};.

2) O mesmo que (1), exceto que o tipo de retorno é ranges::fold_left_with_iter_result<[ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;, U>.

### Possíveis implementações
```cpp
    class fold_left_with_iter_fn
    {
        template<class O, class I, class S, class T, class F>
        constexpr auto impl(I&& first, S&& last, T&& init, F f) const
        {
            using U = std::decay_t<std::invoke_result_t<F&, T, std::iter_reference_t<I>>>;
            using Ret = ranges::fold_left_with_iter_result<O, U>;
            if (first == last)
                return Ret{std::move(first), U(std::move(init))};
            U accum = std::invoke(f, std::move(init), *first);
            for (++first; first != last; ++first)
                accum = std::invoke(f, std::move(accum), *first);
            return Ret{std::move(first), std::move(accum)};
        }
    public:
        template<std::input_iterator I, std::sentinel_for<I> S, class T = std::iter_value_t<I>,
                 /* indirectly-binary-left-foldable */<T, I> F>
        constexpr auto operator()(I first, S last, T init, F f) const
        {
            return impl<I>(std::move(first), std::move(last), std::move(init), std::ref(f));
        }
    
        template<ranges::input_range R, class T = ranges::range_value_t<R>,
                 /* indirectly-binary-left-foldable */<T, ranges::iterator_t<R>> F>
        constexpr auto operator()(R&& r, T init, F f) const
        {
            return impl<ranges::borrowed_iterator_t<R>>
            (
                ranges::begin(r), ranges::end(r), std::move(init), std::ref(f)
            );
        }
    };
    
    inline constexpr fold_left_with_iter_fn fold_left_with_iter;
```

---

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações do objeto de função f.

### Notas

A tabela a seguir compara todos os algoritmos de dobra restritos:

Modelo de função de dobra | Começa de | Valor inicial | Tipo de retorno
---|---|---|---
[ranges::fold_left](<#/doc/algorithm/ranges/fold_left>) | left | init | U
[ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>) | left | first element | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_right](<#/doc/algorithm/ranges/fold_right>) | right | init | U
[ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>) | right | last element | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
ranges::fold_left_with_iter | left | init | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, U> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, U>, where BR is [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
[ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>) | left | first element | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> where BR is [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
`__cpp_lib_ranges_fold` | `202207L` | (C++23) | `std::ranges` [algoritmos de dobra](<#/doc/algorithm/ranges>)
`__cpp_lib_algorithm_default_value_type` | `202403L` | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/fold_left_with_iter>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <functional>
    #include <ranges>
    #include <utility>
    #include <vector>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        std::vector v{1, 2, 3, 4, 5, 6, 7, 8};
    
        auto sum = ranges::fold_left_with_iter(v.begin(), v.end(), 6, std::plus<int>());
        assert(sum.value == 42);
        assert(sum.in == v.end());
    
        auto mul = ranges::fold_left_with_iter(v, 0X69, std::multiplies<int>());
        assert(mul.value == 4233600);
        assert(mul.in == v.end());
    
        // Get the product of the std::pair::second of all pairs in the vector:
        std::vector<std::pair<char, float>> data {{'A', 2.f}, {'B', 3.f}, {'C', 3.5f}};
        auto sec = ranges::fold_left_with_iter
        (
            data | ranges::views::values, 2.0f, std::multiplies<>()
        );
        assert(sec.value == 42);
    
        // Use a program defined function object (lambda-expression):
        auto lambda = { return x + 0B110 + y; };
        auto val = ranges::fold_left_with_iter(v, -42, lambda);
        assert(val.value == 42);
        assert(val.in == v.end());
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 1}, {2, 0}, {3, 0}};
        #ifdef __cpp_lib_algorithm_default_value_type
            auto res = ranges::fold_left_with_iter(nums, {7, 0}, std::multiplies{});
        #else
            auto res = ranges::fold_left_with_iter(nums, CD{7, 0}, std::multiplies{});
        #endif
        assert((res.value == CD{42, 42}));
    }
```

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

*   27.6.18 Dobra [alg.fold]

### Veja também

[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | dobra à esquerda um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>)(C++23) | dobra à esquerda um range de elementos usando o primeiro elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_right](<#/doc/algorithm/ranges/fold_right>)(C++23) | dobra à direita um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>)(C++23) | dobra à direita um range de elementos usando o último elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | dobra à esquerda um range de elementos usando o primeiro elemento como valor inicial, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, [optional](<#/doc/utility/optional>))
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou dobra um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto fora de ordem
(modelo de função)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com uma entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão