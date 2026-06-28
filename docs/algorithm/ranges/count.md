# std::ranges::count, std::ranges::count_if

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
class T, class Proj = std::identity >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr std::iter_difference_t<I>
count( I first, S last, const T& value, Proj proj = {} );
(até C++26)
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj> >
requires std::indirect_binary_predicate
<ranges::equal_to, std::projected<I, Proj>, const T*>
constexpr std::iter_difference_t<I>
count( I first, S last, const T& value, Proj proj = {} );
template< ranges::input_range R, class T, class Proj = std::identity >
requires std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::range_difference_t<R>
count( R&& r, const T& value, Proj proj = {} );
(até C++26)
template< ranges::input_range R, class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj> >
requires std::indirect_binary_predicate
<ranges::equal_to,
std::projected<ranges::iterator_t<R>, Proj>, const T*>
constexpr ranges::range_difference_t<R>
count( R&& r, const T& value, Proj proj = {} );
template< std::input_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr std::iter_difference_t<I>
count_if( I first, S last, Pred pred, Proj proj = {} );
template< ranges::input_range R, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
constexpr ranges::range_difference_t<R>
count_if( R&& r, Pred pred, Proj proj = {} );
```

Retorna o número de elementos no range `[`first`, `last`)` que satisfazem critérios específicos.

1) Conta os elementos que são iguais a value.

3) Conta os elementos para os quais o predicado p retorna true.

2,4) O mesmo que (1,3), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range dos elementos a examinar
- **value** — o valor a procurar
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

Número de elementos que satisfazem a condição.

### Complexidade

Exatamente last - first comparações e projeções.

### Notas

Para o número de elementos no range sem quaisquer critérios adicionais, veja std::ranges::distance.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [List-initialization](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/count>))

### Implementação possível

[count (1)](<#/doc/algorithm/ranges/count>)
---
```cpp
    struct count_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity, class T = std::projected_value_t<I, Proj>>
        requires std::indirect_binary_predicate<ranges::equal_to,
                                                std::projected<I, Proj>, const T*>
        constexpr std::iter_difference_t<I>
            operator()(I first, S last, const T& value, Proj proj = {}) const
        {
            std::iter_difference_t<I> counter = 0;
            for (; first != last; ++first)
                if (std::invoke(proj, *first) == value)
                    ++counter;
            return counter;
        }
    
        template<ranges::input_range R, class Proj = std::identity
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>>
        requires std::indirect_binary_predicate<ranges::equal_to,
                                                std::projected<ranges::iterator_t<R>, Proj>,
                                                const T*>
        constexpr ranges::range_difference_t<R>
            operator()(R&& r, const T& value, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value, std::ref(proj));
        }
    };
    
    inline constexpr count_fn count;
```

[count_if (3)](<#/doc/algorithm/ranges/count>)
```cpp
    struct count_if_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        constexpr std::iter_difference_t<I>
            operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            std::iter_difference_t<I> counter = 0;
            for (; first != last; ++first)
                if (std::invoke(pred, std::invoke(proj, *first)))
                    ++counter;
            return counter;
        }
    
        template<ranges::input_range R, class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>, Proj>> Pred>
        constexpr ranges::range_difference_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::ref(pred), std::ref(proj));
        }
    };
    
    inline constexpr count_if_fn count_if;
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 4, 3, 7, 8, 9, 10};
    
        namespace ranges = std::ranges;
    
        // determine how many integers in a std::vector match a target value.
        int target1 = 3;
        int target2 = 5;
        int num_items1 = ranges::count(v.begin(), v.end(), target1);
        int num_items2 = ranges::count(v, target2);
        std::cout << "number: " << target1 << " count: " << num_items1 << '\n';
        std::cout << "number: " << target2 << " count: " << num_items2 << '\n';
    
        // use a lambda expression to count elements divisible by 3.
        int num_items3 = ranges::count_if(v.begin(), v.end(), { return i % 3 == 0; });
        std::cout << "number divisible by three: " << num_items3 << '\n';
    
        // use a lambda expression to count elements divisible by 11.
        int num_items11 = ranges::count_if(v, { return i % 11 == 0; });
        std::cout << "number divisible by eleven: " << num_items11 << '\n';
    
        std::vector<std::complex<double>> nums{{4, 2}, {1, 3}, {4, 2}};
        #ifdef __cpp_lib_algorithm_default_value_type
            auto c = ranges::count(nums, {4, 2});
        #else
            auto c = ranges::count(nums, std::complex<double>{4, 2});
        #endif
        assert(c == 2);
    }
```

Saída:
```
    number: 3 count: 2
    number: 5 count: 0
    number divisible by three: 3
    number divisible by eleven: 0
```

### Veja também

[ ranges::distance](<#/doc/iterator/ranges/distance>)(desde C++20) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(objeto de função de algoritmo)
[ views::counted](<#/doc/ranges/counted_view>)(desde C++20) | cria um subrange a partir de um iterator e uma contagem
(objeto de ponto de customização)
[ ranges::filter_viewviews::filter](<#/doc/ranges/filter_view>)(desde C++20) | uma [`view`](<#/doc/ranges/view>) que consiste nos elementos de um [`range`](<#/doc/ranges/range>) que satisfaz um predicado
(class template) (objeto adaptador de range)
[ countcount_if](<#/doc/algorithm/count>) | retorna o número de elementos que satisfazem critérios específicos
(function template)