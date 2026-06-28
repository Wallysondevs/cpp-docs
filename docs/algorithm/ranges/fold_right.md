# std::ranges::fold_right

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::bidirectional_iterator I, std::sentinel_for<I> S, class T,
/* indirectly-binary-right-foldable */<T, I> F >
constexpr auto fold_right( I first, S last, T init, F f );
(até C++26)
template< std::bidirectional_iterator I, std::sentinel_for<I> S,
class T = std::iter_value_t<I>,
/* indirectly-binary-right-foldable */<T, I> F >
constexpr auto fold_right( I first, S last, T init, F f );
template< ranges::bidirectional_range R, class T,
/* indirectly-binary-right-foldable */
<T, ranges::iterator_t<R>> F >
constexpr auto fold_right( R&& r, T init, F f );
(até C++26)
template< ranges::bidirectional_range R, class T = ranges::range_value_t<R>,
/* indirectly-binary-right-foldable */
<T, ranges::iterator_t<R>> F >
constexpr auto fold_right( R&& r, T init, F f );
Conceitos auxiliares
template< class F, class T, class I >
concept /* indirectly-binary-left-foldable */ = /* veja a descrição */;
template< class F, class T, class I >
concept /* indirectly-binary-right-foldable */ = /* veja a descrição */;
```

[Dobra](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à direita os elementos do range fornecido, ou seja, retorna o resultado da avaliação da expressão em cadeia:
`f(x1, f(x2, ...f(xn, init)))`, onde `x1`, `x2`, ..., `xn` são elementos do range.

Informalmente, `ranges::fold_right` comporta-se como std::fold_left([ranges::reverse](<#/doc/algorithm/ranges/reverse>)(r), init, /* invertido */(f)).

O comportamento é indefinido se `[`first`, `last`)` não for um range válido.

1) O range é `[`first`, `last`)`.

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

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para o [lookup dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [lookup não qualificado normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [lookup dependente de argumento](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a dobrar
- **r** — o range de elementos a dobrar
- **init** — o valor inicial da dobra
- **f** — o objeto de função binária

### Valor de retorno

Um objeto do tipo U que contém o resultado da [dobra](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à direita do range fornecido sobre f, onde U é equivalente a [std::decay_t](<#/doc/types/decay>)<[std::invoke_result_t](<#/doc/types/result_of>)<F&, [std::iter_reference_t](<#/doc/iterator/iter_t>)&lt;I&gt;, T>>;.

Se o range estiver vazio, U(std::move(init)) é retornado.

### Implementações possíveis
```cpp
    struct fold_right_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S,
                 class T = std::iter_value_t<I>,
                 /* indirectly-binary-right-foldable */<T, I> F>
        constexpr auto operator()(I first, S last, T init, F f) const
        {
            using U = std::decay_t<std::invoke_result_t<F&, std::iter_reference_t<I>, T>>;
            if (first == last)
                return U(std::move(init));
            I tail = ranges::next(first, last);
            U accum = std::invoke(f, *--tail, std::move(init));
            while (first != tail)
                accum = std::invoke(f, *--tail, std::move(accum));
            return accum;
        }
    
        template<ranges::bidirectional_range R, class T = ranges::range_value_t<R>,
                 /* indirectly-binary-right-foldable */<T, ranges::iterator_t<R>> F>
        constexpr auto operator()(R&& r, T init, F f) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(init), std::ref(f));
        }
    };
    
    inline constexpr fold_right_fn fold_right;
```

---

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações do objeto de função f.

### Observações

A tabela a seguir compara todos os algoritmos de dobra restritos:

Modelo de função de dobra | Começa de | Valor inicial | Tipo de retorno
---|---|---|---
[ranges::fold_left](<#/doc/algorithm/ranges/fold_left>) | esquerda | init | U
[ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>) | esquerda | primeiro elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
ranges::fold_right | direita | init | U
[ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>) | direita | último elemento | [std::optional](<#/doc/utility/optional>)&lt;U&gt;
[ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>) | esquerda | init | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, U> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, U>, onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
[ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>) | esquerda | primeiro elemento | (1) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<I, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> (2) [ranges::in_value_result](<#/doc/algorithm/ranges/return_types/in_value_result>)<BR, [std::optional](<#/doc/utility/optional>)&lt;U&gt;> onde BR é [ranges::borrowed_iterator_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_lib_ranges_fold`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | algoritmos de [dobra](<#/doc/algorithm/ranges>) de `std::ranges`
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/fold_right>))
*   [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
*   [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão

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
    
    using namespace std::literals;
    namespace ranges = std::ranges;
    
    int main()
    {
        auto v = {1, 2, 3, 4, 5, 6, 7, 8};
        std::vector<std::string> vs{"A", "B", "C", "D"};
    
        auto r1 = ranges::fold_right(v.begin(), v.end(), 6, std::plus<>()); // (1)
        std::cout << "r1: " << r1 << '\n';
    
        auto r2 = ranges::fold_right(vs, "!"s, std::plus<>()); // (2)
        std::cout << "r2: " << r2 << '\n';
    
        // Use um objeto de função definido pelo programa (expressão lambda):
        std::string r3 = ranges::fold_right
        (
            v, "A",  s) { return s + ':' + std::to_string(x); }
        );
        std::cout << "r3: " << r3 << '\n';
    
        // Obtenha o produto do std::pair::second de todos os pares no vetor:
        std::vector<std::pair<char, float>> data{{'A', 2.f}, {'B', 3.f}, {'C', 3.5f}};
        float r4 = ranges::fold_right
        (
            data | ranges::views::values, 2.0f, std::multiplies<>()
        );
        std::cout << "r4: " << r4 << '\n';
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 1}, {2, 0}, {3, 0}};
        #ifdef __cpp_lib_algorithm_default_value_type
            auto r5 = ranges::fold_right(nums, {7, 0}, std::multiplies{});
        #else
            auto r5 = ranges::fold_right(nums, CD{7, 0}, std::multiplies{});
        #endif
        std::cout << "r5: " << r5 << '\n';
    }
```

Saída:
```
    r1: 42
    r2: ABCD!
    r3: A:8:7:6:5:4:3:2:1
    r4: 42
    r5: (42,42)
```

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   27.6.18 Dobra [alg.fold]

### Veja também

[ ranges::fold_right_last](<#/doc/algorithm/ranges/fold_right_last>)(C++23) | dobra à direita um range de elementos usando o último elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | dobra à esquerda um range de elementos
(objeto de função de algoritmo)
[ ranges::fold_left_first](<#/doc/algorithm/ranges/fold_left_first>)(C++23) | dobra à esquerda um range de elementos usando o primeiro elemento como valor inicial
(objeto de função de algoritmo)
[ ranges::fold_left_with_iter](<#/doc/algorithm/ranges/fold_left_with_iter>)(C++23) | dobra à esquerda um range de elementos, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, valor)
(objeto de função de algoritmo)
[ ranges::fold_left_first_with_iter](<#/doc/algorithm/ranges/fold_left_first_with_iter>)(C++23) | dobra à esquerda um range de elementos usando o primeiro elemento como valor inicial, e retorna um [par](<#/doc/algorithm/ranges/return_types/in_value_result>) (iterator, [optional](<#/doc/utility/optional>))
(objeto de função de algoritmo)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou dobra um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a [std::accumulate](<#/doc/algorithm/accumulate>), exceto fora de ordem
(modelo de função)