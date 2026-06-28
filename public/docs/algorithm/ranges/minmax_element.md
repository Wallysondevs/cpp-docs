# std::ranges::minmax_element, std::ranges::minmax_element_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less >
constexpr minmax_element_result<I>
minmax_element( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R, class Proj = std::identity,
std::indirect_strict_weak_order<
std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
constexpr minmax_element_result<ranges::borrowed_iterator_t<R>>
minmax_element( R&& r, Comp comp = {}, Proj proj = {} );
Tipos auxiliares
template< class I >
using minmax_element_result = ranges::min_max_result<I>;
```

1) Encontra os menores e maiores elementos no range `[`first`, `last`)`.

2) O mesmo que (1), mas usa r como o range de origem, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
* Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — par de iterator-sentinel denotando o range a ser examinado
- **r** — o range a ser examinado
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos.

### Valor de retorno

Um objeto que consiste em um iterator para o menor elemento como o primeiro elemento e um iterator para o maior elemento como o segundo. Retorna {first, first} se o range estiver vazio. Se vários elementos forem equivalentes ao menor elemento, o iterator para o primeiro desses elementos é retornado. Se vários elementos forem equivalentes ao maior elemento, o iterator para o último desses elementos é retornado.

### Complexidade

No máximo [std::max](<#/doc/algorithm/max>)([std::floor](<#/doc/numeric/math/floor>)(1.5 * (N − 1)), 0.0) aplicações da comparação e o dobro de aplicações da projeção, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last).

### Possível implementação
```cpp
    struct minmax_element_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 std::indirect_strict_weak_order<std::projected<I, Proj>> Comp = ranges::less>
        constexpr ranges::minmax_element_result<I>
            operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            auto min = first, max = first;
    
            if (first == last || ++first == last)
                return {min, max};
    
            if (std::invoke(comp, std::invoke(proj, *first),
                                  std::invoke(proj, *min)))
                min = first;
            else
                max = first;
    
            while (++first != last)
            {
                auto i = first;
                if (++first == last)
                {
                    if (std::invoke(comp, std::invoke(proj, *i),
                                          std::invoke(proj, *min)))
                        min = i;
                    else if (!(std::invoke(comp, std::invoke(proj, *i),
                                                 std::invoke(proj, *max))))
                        max = i;
                    break;
                }
                else
                {
                    if (std::invoke(comp, std::invoke(proj, *first),
                                          std::invoke(proj, *i)))
                    {
                      if (std::invoke(comp, std::invoke(proj, *first),
                                            std::invoke(proj, *min)))
                          min = first;
                      if (!(std::invoke(comp, std::invoke(proj, *i),
                                              std::invoke(proj, *max))))
                          max = i;
                    }
                    else
                    {
                        if (std::invoke(comp, std::invoke(proj, *i),
                                              std::invoke(proj, *min)))
                            min = i;
                        if (!(std::invoke(comp, std::invoke(proj, *first),
                                                std::invoke(proj, *max))))
                            max = first;
                    }
                }
            }
            return {min, max};
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order<
                     std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less>
        constexpr ranges::minmax_element_result<ranges::borrowed_iterator_t<R>>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::ref(comp), std::ref(proj));
        }
    };
    
    inline constexpr minmax_element_fn minmax_element;
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    namespace ranges = std::ranges;
    
    int main()
    {
        const auto v = {3, 9, 1, 4, 1, 2, 5, 9};
        const auto [min, max] = ranges::minmax_element(v);
        std::cout
            << "min = " << *min << ", at " << [ranges::distance(v.begin(), min) << "]\n"
            << "max = " << *max << ", at " << [ranges::distance(v.begin(), max) << "]\n";
    }
```

Saída:
```
    min = 1, at [2]
    max = 9, at [7]
```

### Veja também

[ ranges::min_element](<#/doc/algorithm/ranges/min_element>)(C++20) | retorna o menor elemento em um range
(objeto de função de algoritmo)
[ ranges::max_element](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(objeto de função de algoritmo)
[ ranges::minmax](<#/doc/algorithm/ranges/minmax>)(C++20) | retorna o menor e o maior de dois elementos
(objeto de função de algoritmo)
[ minmax_element](<#/doc/algorithm/minmax_element>)(C++11) | retorna os menores e os maiores elementos em um range
(modelo de função)