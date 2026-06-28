# std::ranges::all_of, std::ranges::any_of, std::ranges::none_of

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr bool all_of( I first, S last, Pred pred, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>,Proj>> Pred >
constexpr bool all_of( R&& r, Pred pred, Proj proj = {} );
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr bool any_of( I first, S last, Pred pred, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>,Proj>> Pred >
constexpr bool any_of( R&& r, Pred pred, Proj proj = {} );
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr bool none_of( I first, S last, Pred pred, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>,Proj>> Pred >
constexpr bool none_of( R&& r, Pred pred, Proj proj = {} );
```

1) Verifica se o predicado unário `pred` retorna `false` para pelo menos um elemento no range `[`first`, `last`)` (após projetar com a projeção `proj`).

3) Verifica se o predicado unário `pred` retorna `true` para pelo menos um elemento no range `[`first`, `last`)` (após projetar com a projeção `proj`).

5) Verifica se o predicado unário `pred` retorna `true` para nenhum dos elementos no range `[`first`, `last`)` (após projetar com a projeção `proj`).

2,4,6) O mesmo que (1,3,5), mas usa `r` como o range de origem, como se estivesse usando `[ranges::begin](<#/doc/ranges/begin>)(r)` como `first` e `[ranges::end](<#/doc/ranges/end>)(r)` como `last`.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range dos elementos a examinar
- **r** — o range dos elementos a examinar
- **pred** — predicado a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1,2) `true` se `[std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)) != false` para cada iterador `i` no range, `false` caso contrário. Retorna `true` se o range estiver vazio.

3,4) `true` se `[std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)) != false` para pelo menos um iterador `i` no range, `false` caso contrário. Retorna `false` se o range estiver vazio.

5,6) `true` se `[std::invoke](<#/doc/utility/functional/invoke>)(pred, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *i)) == false` para cada iterador `i` no range, `false` caso contrário. Retorna `true` se o range estiver vazio.

Tem elemento verdadeiro | Sim | Não
---|---|---|---|---
Tem elemento falso | Sim | Não | Sim | Não[1](<#/doc/algorithm/ranges/all_any_none_of>)
[`all_of`](<#/doc/algorithm/ranges/all_any_none_of>) | false | true | false | true
[`any_of`](<#/doc/algorithm/ranges/all_any_none_of>) | true | true | false | false
[`none_of`](<#/doc/algorithm/ranges/all_any_none_of>) | false | false | true | true

1.  [↑](<#/doc/algorithm/ranges/all_any_none_of>) O range está vazio neste caso.

### Complexidade

No máximo `last - first` aplicações do predicado e da projeção.

### Implementação possível

[all_of (1,2)](<#/doc/algorithm/ranges/all_any_none_of>)
---
```cpp
    struct all_of_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr bool operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            return ranges::find_if_not(first, last, std::ref(pred), std::ref(proj)) == last;
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>,Proj>> Pred>
        constexpr bool operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return operator()(ranges::begin(r), ranges::end(r),
                              std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr all_of_fn all_of;
```

[any_of (3,4)](<#/doc/algorithm/ranges/all_any_none_of>)
```cpp
    struct any_of_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr bool operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            return ranges::find_if(first, last, std::ref(pred), std::ref(proj)) != last;
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>,Proj>> Pred>
        constexpr bool operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return operator()(ranges::begin(r), ranges::end(r),
                              std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr any_of_fn any_of;
```

[none_of (5,6)](<#/doc/algorithm/ranges/all_any_none_of>)
```cpp
    struct none_of_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr bool operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            return ranges::find_if(first, last, std::ref(pred), std::ref(proj)) == last;
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>,Proj>> Pred>
        constexpr bool operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return operator()(ranges::begin(r), ranges::end(r),
                              std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr none_of_fn none_of;
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
    
    namespace ranges = std::ranges;
    
    constexpr bool some_of(auto&& r, auto&& pred) // some but not all
    {
        return not (ranges::all_of(r, pred) or ranges::none_of(r, pred));
    }
    
    constexpr auto w = {1, 2, 3};
    static_assert(!some_of(w,  { return x < 1; }));
    static_assert( some_of(w,  { return x < 2; }));
    static_assert(!some_of(w,  { return x < 4; }));
    
    int main()
    {
        std::vector<int> v(10, 2);
        std::partial_sum(v.cbegin(), v.cend(), v.begin());
        std::cout << "Among the numbers: ";
        ranges::copy(v, std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        if (ranges::all_of(v.cbegin(), v.cend(),  { return i % 2 == 0; }))
            std::cout << "All numbers are even\n";
    
        if (ranges::none_of(v, std::bind(std::modulus<int>(), std::placeholders::_1, 2)))
            std::cout << "None of them are odd\n";
    
        auto DivisibleBy = 
        {
            return d { return m % d == 0; };
        };
    
        if (ranges::any_of(v, DivisibleBy(7)))
            std::cout << "At least one number is divisible by 7\n";
    }
```

Saída:
```
    Among the numbers: 2 4 6 8 10 12 14 16 18 20
    All numbers are even
    None of them are odd
    At least one number is divisible by 7
```

### Ver também

[ all_ofany_ofnone_of](<#/doc/algorithm/all_any_none_of>)(C++11)(C++11)(C++11) | verifica se um predicado é verdadeiro para todos, qualquer ou nenhum dos elementos em um range
(modelo de função)