# std::ranges::stable_partition

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Call signature
template< std::bidirectional_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
requires std::permutable<I>
ranges::subrange<I>
stable_partition( I first, S last, Pred pred, Proj proj = {} );
(constexpr desde C++26)
template< ranges::bidirectional_range R, class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
requires std::permutable<ranges::iterator_t<R>>
ranges::borrowed_subrange_t<R>
stable_partition( R&& r, Pred pred, Proj proj = {} );
(constexpr desde C++26)
```

1) Reorganiza os elementos no range `[`first`, `last`)` de tal forma que a projeção proj de todos os elementos para os quais o predicado pred retorna true precedem a projeção proj dos elementos para os quais o predicado pred retorna false. O algoritmo é _estável_, ou seja, a ordem relativa dos elementos é _preservada_.

2) O mesmo que (1), mas usa r como o range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_algorithm function objects_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
  * Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibida.

### Parâmetros

first, last | \- | o range de elementos a serem reorganizados
---|---|---
r | \- | o range de elementos a serem reorganizados
pred | \- | predicado a ser aplicado aos elementos projetados
proj | \- | projeção a ser aplicada aos elementos

### Valor de retorno

1) Um objeto igual a {pivot, last}, onde `pivot` é um iterator para o primeiro elemento do segundo grupo.

2) O mesmo que (1) se r for um lvalue ou de um tipo [`borrowed_range`](<#/doc/ranges/borrowed_range>). Caso contrário, retorna [std::ranges::dangling](<#/doc/ranges/dangling>).

### Complexidade

Dado N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last), a complexidade é, no pior caso, \\(\scriptsize N\cdot\log{(N)}\\)N·log(N) trocas, e apenas \\(\scriptsize \mathcal{O}(N)\\)𝓞(N) trocas caso um buffer de memória extra seja usado. Exatamente \\(\scriptsize N\\)N aplicações do predicado pred e da projeção proj.

### Notas

Esta função tenta alocar um buffer temporário. Se a alocação falhar, o algoritmo menos eficiente é escolhido.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_algorithms`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | ordenação estável constexpr

### Implementação possível

Esta implementação não usa buffer de memória extra e, como tal, pode ser menos eficiente. Veja também a implementação em [MSVC STL](<https://github.com/microsoft/STL/blob/e745bad3b1d05b5b19ec652d68abb37865ffa454/stl/inc/algorithm#L5358-L5555>) e [libstdc++](<https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L2365-L2394>).
```
    struct stable_partition_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<I, Proj>> Pred>
        requires std::permutable<I>
        constexpr ranges::subrange<I>
            operator()(I first, S last, Pred pred, Proj proj = {}) const
        {
            first = ranges::find_if_not(first, last, pred, proj);
            I mid = first;
            while (mid != last)
            {
                mid = ranges::find_if(mid, last, pred, proj);
                if (mid == last)
                    break;
                I last2 = ranges::find_if_not(mid, last, pred, proj);
                ranges::rotate(first, mid, last2);
                first = ranges::next(first, ranges::distance(mid, last2));
                mid = last2;
            }
            return {std::move(first), std::move(mid)};
        }
    
        template<ranges::bidirectional_range R, class Proj = std::identity,
                 std::indirect_unary_predicate<
                     std::projected<ranges::iterator_t<R>, Proj>> Pred>
        requires std::permutable<ranges::iterator_t<R>>
        constexpr ranges::borrowed_subrange_t<R>
            operator()(R&& r, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(pred), std::move(proj));
        }
    };
    
    inline constexpr stable_partition_fn stable_partition {};
```

---

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    namespace rng = std::ranges;
    
    template<std::permutable I, std::sentinel_for<I> S>
    constexpr void stable_sort(I first, S last)
    {
        if (first == last)
            return;
    
        auto pivot = *rng::next(first, rng::distance(first, last) / 2, last);
        auto left = pivot { return em < pivot; };
        auto tail1 = rng::stable_partition(first, last, left);
        auto right = pivot { return !(pivot < em); };
        auto tail2 = rng::stable_partition(tail1, right);
    
        stable_sort(first, tail1.begin());
        stable_sort(tail2.begin(), tail2.end());
    }
    
    void print(const auto rem, auto first, auto last, bool end = true)
    {
        std::cout << rem;
        for (; first != last; ++first)
            std::cout << *first << ' ';
        std::cout << (end ? "\n" : "");
    }
    
    int main()
    {
        const auto original = {9, 6, 5, 2, 3, 1, 7, 8};
    
        std::vector<int> vi {};
        auto even =  { return 0 == (x % 2); };
    
        print("Original vector:\t", original.begin(), original.end(), "\n");
    
        vi = original;
        const auto ret1 = rng::stable_partition(vi, even);
        print("Stable partitioned:\t", vi.begin(), ret1.begin(), 0);
        print("│ ", ret1.begin(), ret1.end());
    
        vi = original;
        const auto ret2 = rng::partition(vi, even);
        print("Partitioned:\t\t", vi.begin(), ret2.begin(), 0);
        print("│ ", ret2.begin(), ret2.end());
    
    
        vi = {16, 30, 44, 30, 15, 24, 10, 18, 12, 35};
        print("Unsorted vector: ", vi.begin(), vi.end());
    
        stable_sort(rng::begin(vi), rng::end(vi));
        print("Sorted vector:   ", vi.begin(), vi.end());
    }
```

Saída possível:
```
    Original vector:        9 6 5 2 3 1 7 8
    Stable partitioned:     6 2 8 │ 9 5 3 1 7
    Partitioned:            8 6 2 │ 5 3 1 7 9
    Unsorted vector: 16 30 44 30 15 24 10 18 12 35
    Sorted vector:   10 12 15 16 18 24 30 30 35 44
```

### Ver também

[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos
(algorithm function object)
[ ranges::partition_copy](<#/doc/algorithm/ranges/partition_copy>)(C++20) | copia um range dividindo os elementos em dois grupos
(algorithm function object)
[ ranges::is_partitioned](<#/doc/algorithm/ranges/is_partitioned>)(C++20) | determina se o range é particionado pelo predicado fornecido
(algorithm function object)
[ stable_partition](<#/doc/algorithm/stable_partition>) | divide elementos em dois grupos enquanto preserva sua ordem relativa
(function template)