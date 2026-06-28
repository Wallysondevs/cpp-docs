# std::ranges::upper_bound

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr I upper_bound( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
(até C++26)
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj>,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr I upper_bound( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
upper_bound( R&& r, const T& value, Comp comp = {}, Proj proj = {} );
(até C++26)
template< ranges::forward_range R,
class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj>,
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
upper_bound( R&& r, const T& value, Comp comp = {}, Proj proj = {} );
```

1) Retorna um iterator apontando para o primeiro elemento no range `[`first`, `last`)` que é _maior_ que value, ou last se nenhum elemento assim for encontrado. O range `[`first`, `last`)` deve ser particionado em relação à expressão ou !comp(value, element), ou seja, todos os elementos para os quais a expressão é verdadeira devem preceder todos os elementos para os quais a expressão é falsa. Um range totalmente ordenado atende a este critério.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para a [pesquisa dependente de argumento](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado pela [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first, last** — iterator-sentinel que define o range parcialmente ordenado a ser examinado
- **r** — o range parcialmente ordenado a ser examinado
- **value** — valor para comparar os elementos
- **pred** — predicado a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

Iterator apontando para o primeiro elemento que é _maior_ que value, ou last se nenhum elemento assim for encontrado.

### Complexidade

O número de comparações e aplicações da projeção realizadas é logarítmico na distância entre first e last (no máximo log2(last - first) + O(1) comparações e aplicações da projeção). No entanto, para um iterator que não modela [`random_access_iterator`](<#/doc/iterator/random_access_iterator>), o número de incrementos do iterator é linear.

### Possível implementação
```cpp
    struct upper_bound_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity, class T = std::projected_value_t<I, Proj>,
                 std::indirect_strict_weak_order
                     <const T*, std::projected<I, Proj>> Comp = ranges::less>
        constexpr I operator()(I first, S last, const T& value,
                               Comp comp = {}, Proj proj = {}) const
        {
            I it;
            std::iter_difference_t<I> count, step;
            count = ranges::distance(first, last);
    
            while (count > 0)
            {
                it = first;
                step = count / 2;
                ranges::advance(it, step, last);
                if (!comp(value, std::invoke(proj, *it)))
                {
                    first = ++it;
                    count -= step + 1;
                }
                else
                    count = step;
            }
            return first;
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>,
                 std::indirect_strict_weak_order
                     <const T*, std::projected<ranges::iterator_t<R>,
                                               Proj>> Comp = ranges::less>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, const T& value, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value,
                           std::ref(comp), std::ref(proj));
        }
    };
    
    inline constexpr upper_bound_fn upper_bound;
```

---

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/upper_bound>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        std::vector<int> data{1, 1, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6};
    
        {
            auto lower = ranges::lower_bound(data.begin(), data.end(), 4);
            auto upper = ranges::upper_bound(data.begin(), data.end(), 4);
    
            ranges::copy(lower, upper, std::ostream_iterator<int>(std::cout, " "));
            std::cout << '\n';
        }
        {
            auto lower = ranges::lower_bound(data, 3);
            auto upper = ranges::upper_bound(data, 3);
    
            ranges::copy(lower, upper, std::ostream_iterator<int>(std::cout, " "));
            std::cout << '\n';
        }
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}, {3, 1}};
        auto cmpz =  { return x.real() < y.real(); };
        #ifdef __cpp_lib_algorithm_default_value_type
            auto it = ranges::upper_bound(nums, {2, 0}, cmpz);
        #else
            auto it = ranges::upper_bound(nums, CD{2, 0}, cmpz);
        #endif
        assert((*it == CD{3, 0}));
    }
```

Saída:
```
    4 4 4
    3 3 3 3
```

### Ver também

[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna um range de elementos que correspondem a uma chave específica
(objeto de função de algoritmo)
[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(objeto de função de algoritmo)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(objeto de função de algoritmo)
[ upper_bound](<#/doc/algorithm/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(modelo de função)