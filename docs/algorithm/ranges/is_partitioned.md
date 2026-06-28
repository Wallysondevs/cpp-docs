# std::ranges::is_partitioned

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr bool
is_partitioned( I first, S last, Pred pred, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
constexpr bool
is_partitioned( R&& r, Pred pred, Proj proj = {} );
```

1) Retorna true se todos os elementos no range `[`first`, `last`)` que satisfazem o predicado `pred` após a projeção aparecerem antes de todos os elementos que não o satisfazem. Também retorna true se `[`first`, `last`)` estiver vazio.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse `ranges::begin(r)` como `first` e `ranges::end(r)` como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — par iterador-sentinela denotando o range de elementos a examinar
- **r** — o range de elementos a examinar
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

true se o range `[`first`, `last`)` estiver vazio ou for particionado por `pred`, false caso contrário.

### Complexidade

No máximo `ranges::distance(first, last)` aplicações de `pred` e `proj`.

### Possível implementação
```cpp
    struct is_partitioned_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr bool operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (!std::invoke(pred, std::invoke(proj, *first)))
                    break;
    
            for (; first != last; ++first)
                if (std::invoke(pred, std::invoke(proj, *first)))
                    return false;
    
            return true;
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<ranges::iterator_t<R>, Proj>> Pred>
        constexpr bool operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr auto is_partitioned = is_partitioned_fn();
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <numeric>
    #include <utility>
    
    int main()
    {
        std::array<int, 9> v;
    
        auto print = &v
        {
            for (int x : v)
                std::cout << x << ' ';
            std::cout << (o ? "=> " : "=> not ") << "partitioned\n";
        };
    
        auto is_even =  { return i % 2 == 0; };
    
        std::iota(v.begin(), v.end(), 1); // or std::ranges::iota(v, 1);
        print(std::ranges::is_partitioned(v, is_even));
    
        std::ranges::partition(v, is_even);
        print(std::ranges::is_partitioned(std::as_const(v), is_even));
    
        std::ranges::reverse(v);
        print(std::ranges::is_partitioned(v.cbegin(), v.cend(), is_even));
        print(std::ranges::is_partitioned(v.crbegin(), v.crend(), is_even));
    }
```

Saída:
```
    1 2 3 4 5 6 7 8 9 => not partitioned
    2 4 6 8 5 3 7 1 9 => partitioned
    9 1 7 3 5 8 6 4 2 => not partitioned
    9 1 7 3 5 8 6 4 2 => partitioned
```

### Veja também

[ ranges::partition](<#/doc/algorithm/ranges/partition>)(desde C++20) | divide um range de elementos em dois grupos
(objeto de função de algoritmo)
[ ranges::partition_point](<#/doc/algorithm/ranges/partition_point>)(desde C++20) | localiza o ponto de partição de um range particionado
(objeto de função de algoritmo)
[ is_partitioned](<#/doc/algorithm/is_partitioned>)(desde C++11) | determina se o range é particionado pelo predicado fornecido
(modelo de função)