# std::ranges::search_n

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S, class T,
class Pred = ranges::equal_to, class Proj = std::identity >
requires std::indirectly_comparable<I, const T*, Pred, Proj>
constexpr ranges::subrange<I>
search_n( I first, S last, std::iter_difference_t<I> count,
const T& value, Pred pred = {}, Proj proj = {} );
(até C++26)
template< std::forward_iterator I, std::sentinel_for<I> S,
class Pred = ranges::equal_to, class Proj = std::identity,
class T = std::projected_value_t<I, Proj> >
requires std::indirectly_comparable<I, const T*, Pred, Proj>
constexpr ranges::subrange<I>
search_n( I first, S last, std::iter_difference_t<I> count,
const T& value, Pred pred = {}, Proj proj = {} );
template< ranges::forward_range R, class T,
class Pred = ranges::equal_to, class Proj = std::identity >
requires std::indirectly_comparable
<ranges::iterator_t<R>, const T*, Pred, Proj>
constexpr ranges::borrowed_subrange_t<R>
search_n( R&& r, ranges::range_difference_t<R> count,
const T& value, Pred pred = {}, Proj proj = {} );
(até C++26)
template< ranges::forward_range R,
class Pred = ranges::equal_to, class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj> >
requires std::indirectly_comparable
<ranges::iterator_t<R>, const T*, Pred, Proj>
constexpr ranges::borrowed_subrange_t<R>
search_n( R&& r, ranges::range_difference_t<R> count,
const T& value, Pred pred = {}, Proj proj = {} );
```

1) Procura no range `[`first`, `last`)` pela _primeira_ sequência de `count` elementos cujos valores projetados são cada um igual ao valor fornecido de acordo com o predicado binário `pred`.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first, last | \- | o range de elementos a examinar (também conhecido como _haystack_)
---|---|---
r | \- | o range de elementos a examinar (também conhecido como _haystack_)
count | \- | o comprimento da sequência a procurar
value | \- | o valor a procurar (também conhecido como _needle_)
pred | \- | o predicado binário que compara os elementos projetados com `value`
proj | \- | a projeção a aplicar aos elementos do range a examinar

### Valor de retorno

1) Retorna um objeto std::[ranges::subrange](<#/doc/ranges/subrange>) que contém um par de iteradores no range `[`first`, `last`)` que designam a subsequência encontrada.

Se nenhuma subsequência for encontrada, retorna std::[ranges::subrange](<#/doc/ranges/subrange>){last, last}.

Se `count <= 0`, retorna std::[ranges::subrange](<#/doc/ranges/subrange>){first, first}.

2) O mesmo que (1), mas o tipo de retorno é [ranges::borrowed_subrange_t](<#/doc/ranges/borrowed_iterator_t>)&lt;R&gt;.

### Complexidade

Linear: no máximo [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações do predicado e da projeção.

### Notas

Uma implementação pode melhorar a eficiência da busca _em média_ se os iteradores modelarem [std::random_access_iterator](<#/doc/iterator/random_access_iterator>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos

### Possível implementação
```cpp
    struct search_n_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Pred = ranges::equal_to, class Proj = std::identity,
                 class T = std::projected_value_t<I, Proj>>
        requires std::indirectly_comparable<I, const T*, Pred, Proj>
        constexpr ranges::subrange<I>
            operator()(I first, S last, std::iter_difference_t<I> count,
                       const T& value, Pred pred = {}, Proj proj = {}) const
        {
            if (count <= 0)
                return {first, first};
            for (; first != last; ++first)
                if (std::invoke(pred, std::invoke(proj, *first), value))
                {
                    I start = first;
                    std::iter_difference_t<I> n{1};
                    for (;;)
                    {
                        if (n++ == count)
                            return {start, std::next(first)}; // found
                        if (++first == last)
                            return {first, first}; // not found
                        if (!std::invoke(pred, std::invoke(proj, *first), value))
                            break; // not equ to value
                    }
                }
            return {first, first};
        }
    
        template<ranges::forward_range R,
                 class Pred = ranges::equal_to, class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>>
        requires std::indirectly_comparable<ranges::iterator_t<R>, const T*, Pred, Proj>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, ranges::range_difference_t<R> count,
                       const T& value, Pred pred = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::move(count), value,
                           std::move(pred), std::move(proj));
        }
    };
    
    inline constexpr search_n_fn search_n {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    int main()
    {
        namespace ranges = std::ranges;
    
        static constexpr auto nums = {1, 2, 2, 3, 4, 1, 2, 2, 2, 1};
        constexpr int count{3};
        constexpr int value{2};
        typedef int count_t, value_t;
    
        constexpr auto result1 = ranges::search_n
        (
            nums.begin(), nums.end(), count, value
        );
        static_assert // found
        (
            result1.size() == count &&
            std::distance(nums.begin(), result1.begin()) == 6 &&
            std::distance(nums.begin(), result1.end()) == 9
        );
    
        constexpr auto result2 = ranges::search_n(nums, count, value);
        static_assert // found
        (
            result2.size() == count &&
            std::distance(nums.begin(), result2.begin()) == 6 &&
            std::distance(nums.begin(), result2.end()) == 9
        );
    
        constexpr auto result3 = ranges::search_n(nums, count, value_t{5});
        static_assert // not found
        (
            result3.size() == 0 &&
            result3.begin() == result3.end() &&
            result3.end() == nums.end()
        );
    
        constexpr auto result4 = ranges::search_n(nums, count_t{0}, value_t{1});
        static_assert // not found
        (
            result4.size() == 0 &&
            result4.begin() == result4.end() &&
            result4.end() == nums.begin()
        );
    
        constexpr char symbol{'B'};
        auto to_ascii =  -> char { return 'A' + z - 1; };
        auto is_equ =  { return x == y; };
    
        std::cout << "Find a sub-sequence " << std::string(count, symbol) << " in the ";
        std::ranges::transform(nums, std::ostream_iterator<char>(std::cout, ""), to_ascii);
        std::cout << '\n';
    
        auto result5 = ranges::search_n(nums, count, symbol, is_equ, to_ascii);
        if (not result5.empty())
            std::cout << "Found at position "
                      << ranges::distance(nums.begin(), result5.begin()) << '\n';
    
        std::vector<std::complex<double>> nums2{{4, 2}, {4, 2}, {1, 3}};
        #ifdef __cpp_lib_algorithm_default_value_type
            auto it = ranges::search_n(nums2, 2, {4, 2});
        #else
            auto it = ranges::search_n(nums2, 2, std::complex<double>{4, 2});
        #endif
        assert(it.size() == 2);
    }
```

Saída:
```
    Find a sub-sequence BBB in the ABBCDABBBA
    Found at position 6
```

### Veja também

[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(objeto de função de algoritmo)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)
[ ranges::find_end](<#/doc/algorithm/ranges/find_end>)(C++20) | encontra a última sequência de elementos em um determinado range
(objeto de função de algoritmo)
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | procura por qualquer um de um conjunto de elementos
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna verdadeiro se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(objeto de função de algoritmo)
[ ranges::search](<#/doc/algorithm/ranges/search>)(C++20) | procura pela primeira ocorrência de um range de elementos
(objeto de função de algoritmo)
[ search_n](<#/doc/algorithm/search_n>) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(modelo de função)