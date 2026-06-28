# std::ranges::max_element

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less >
constexpr I
max_element( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
max_element( R&& r, Comp comp = {}, Proj proj = {} );
```

1) Encontra o maior elemento no range `[`first`, `last`)`.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — par de iterator-sentinel denotando o range a ser examinado
- **r** — o range a ser examinado
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Iterator para o maior elemento no range `[`first`, `last`)`. Se vários elementos no range forem equivalentes ao maior elemento, retorna o iterator para o primeiro desses elementos. Retorna last se o range estiver vazio (ou seja, se first == last).

### Complexidade

Exatamente max(N - 1, 0) comparações, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last).

### Possível implementação
```cpp
    struct max_element_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less>
        constexpr I operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            if (first == last)
                return last;
    
            auto largest = first;
            while (++first != last)
                if (std::invoke(comp, std::invoke(proj, *largest), std::invoke(proj, *first)))
                    largest = first;
            return largest;
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(comp), std::ref(proj));
        }
    };
    
    inline constexpr max_element_fn max_element;
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        const auto v = {3, 1, -14, 1, 5, 9, -14, 9};
    
        auto result = ranges::max_element(v.begin(), v.end());
        std::cout << "Max element at pos " << ranges::distance(v.begin(), result) << '\n';
    
        auto abs_compare =  { return std::abs(a) < std::abs(b); };
        result = ranges::max_element(v, abs_compare);
        std::cout << "Absolute max element at pos "
                  << ranges::distance(v.begin(), result) << '\n';
    }
```

Saída:
```
    Max element at pos 5
    Absolute max element at pos 2
```

### Veja também

[ ranges::min_element](<#/doc/algorithm/ranges/min_element>)(C++20) | retorna o menor elemento em um range
(objeto de função de algoritmo)
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) | retorna os menores e maiores elementos em um range
(objeto de função de algoritmo)
[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores dados
(objeto de função de algoritmo)
[ max_element](<#/doc/algorithm/max_element>) | retorna o maior elemento em um range
(modelo de função)