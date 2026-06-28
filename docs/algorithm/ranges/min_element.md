# std::ranges::min_element

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Call signature
template< std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less >
constexpr I
min_element( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
min_element( R&& r, Comp comp = {}, Proj proj = {} );
```

1) Encontra o menor elemento no range `[`first`, `last`)`.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — par de iterador-sentinela denotando o range a ser examinado
- **r** — o range a ser examinado
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Iterador para o menor elemento no range `[`first`, `last`)`. Se vários elementos no range forem equivalentes ao menor elemento, retorna o iterador para o primeiro desses elementos. Retorna `last` se o range estiver vazio (ou seja, `first == last`).

### Complexidade

Exatamente max(N - 1, 0) comparações, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last).

### Possível implementação
```cpp
    struct min_element_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less>
        constexpr I operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            if (first == last)
                return last;
            auto smallest = first;
            while (++first != last)
                if (std::invoke(comp, std::invoke(proj, *first), std::invoke(proj, *smallest)))
                    smallest = first;
            return smallest;
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
    
    inline constexpr min_element_fn min_element;
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cmath>
    #include <iostream>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        std::array v{3, 1, -13, 1, 3, 7, -13};
    
        auto iterator = ranges::min_element(v.begin(), v.end());
        auto position = ranges::distance(v.begin(), iterator);
        std::cout << "min element is v[" << position << "] == " << *iterator << '\n';
    
        auto abs_compare =  { return (std::abs(a) < std::abs(b)); };
        iterator = ranges::min_element(v, abs_compare);
        position = ranges::distance(v.begin(), iterator);
        std::cout << "|min| element is v[" << position << "] == " << *iterator << '\n';
    }
```

Saída:
```
    min element is v[2] == -13
    |min| element is v[1] == 1
```

### Ver também

[ ranges::max_element](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(objeto de função de algoritmo)
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) | retorna os menores e maiores elementos em um range
(objeto de função de algoritmo)
[ ranges::max](<#/doc/algorithm/ranges/max>)(C++20) | retorna o maior dos valores dados
(objeto de função de algoritmo)
[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(modelo de função)