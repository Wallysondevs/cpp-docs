# std::ranges::inplace_merge

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Call signature
template< std::bidirectional_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
I inplace_merge( I first, I middle, S last,
Comp comp = {}, Proj proj = {} );
(constexpr desde C++26)
template< ranges::bidirectional_range R, class Comp = ranges::less,
class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
ranges::borrowed_iterator_t<R>
inplace_merge( R&& r, ranges::iterator_t<R> middle,
Comp comp = {}, Proj proj = {} );
(constexpr desde C++26)
```

Mescla dois ranges _ordenados_ consecutivos `[`first`, `middle`)` e `[`middle`, `last`)` em um único range _ordenado_ `[`first`, `last`)`.

Uma sequência é considerada _ordenada_ em relação ao comparador comp e à projeção proj se para qualquer iterator `it` apontando para a sequência e qualquer inteiro não negativo `n` tal que `it + n` seja um iterator válido apontando para um elemento da sequência, [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, *(it + n)), [std::invoke](<#/doc/utility/functional/invoke>)(proj, *it))) avalia como falso.

Esta função de mesclagem é _estável_, o que significa que para elementos equivalentes nos dois ranges originais, os elementos do primeiro range (preservando sua ordem original) precedem os elementos do segundo range (preservando sua ordem original).

1) Os elementos são comparados usando a função de comparação binária `comp` e o objeto de projeção `proj` fornecidos, e os ranges devem estar ordenados em relação aos mesmos.

2) O mesmo que (1), mas usa `r` como o range, como se estivesse usando [ranges::begin](<#/doc/ranges/begin>)(r) como `first`, e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first | \- | o início do primeiro range ordenado
---|---|---
middle | \- | o fim do primeiro range e o início do segundo range
last | \- | o fim do segundo range ordenado
r | \- | o range de elementos a serem mesclados in-place
comp | \- | comparação a ser aplicada aos elementos projetados
proj | \- | projeção a ser aplicada aos elementos no range

### Valor de retorno

Um iterator igual a `last`.

### Complexidade

Exatamente N − 1 comparações, se um buffer de memória adicional estiver disponível, onde N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last). Caso contrário, \\(\scriptsize \mathcal{O}(N\cdot\log{(N)})\\)𝓞(N•log(N)) comparações. Adicionalmente, o dobro de projeções que comparações em ambos os casos.

### Notas

Esta função tenta alocar um buffer temporário. Se a alocação falhar, o algoritmo menos eficiente é escolhido.

Macro de teste de funcionalidade | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_constexpr_algorithms`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | ordenação estável constexpr

### Possível implementação

Esta implementação mostra apenas o algoritmo mais lento usado quando nenhuma memória adicional está disponível. Veja também a implementação no [MSVC STL](<https://github.com/microsoft/STL/blob/e745bad3b1d05b5b19ec652d68abb37865ffa454/stl/inc/algorithm#L7131-L7235>) e [libstdc++](<https://github.com/gcc-mirror/gcc/blob/54258e22b0846aaa6bd3265f592feb161eecda75/libstdc%2B%2B-v3/include/bits/ranges_algo.h#L2573-L2602>).
```cpp
    struct inplace_merge_fn
    {
        template<std::bidirectional_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<I, Comp, Proj>
        constexpr I operator()(I first, I middle, S last, Comp comp = {}, Proj proj = {}) const
        {
            I last_it = ranges::next(middle, last);
            inplace_merge_slow(first, middle, last_it,
                               ranges::distance(first, middle),
                               ranges::distance(middle, last_it),
                               std::ref(comp), std::ref(proj));
            return last_it;
        }
    
        template<ranges::bidirectional_range R, class Comp = ranges::less,
                 class Proj = std::identity>
        requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, ranges::iterator_t<R> middle,
                       Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), std::move(middle), ranges::end(r),
                           std::move(comp), std::move(proj));
        }
    
    private:
        template<class I, class Comp, class Proj>
        static constexpr void inplace_merge_slow(I first, I middle, I last,
                                                 std::iter_difference_t<I> n1,
                                                 std::iter_difference_t<I> n2,
                                                 Comp comp, Proj proj)
        {
            if (n1 == 0 || n2 == 0)
                return;
            if (n1 + n2 == 2 && comp(proj(*middle), proj(*first)))
            {
                ranges::iter_swap(first, middle);
                return;
            }
    
            I cut1 = first, cut2 = middle;
            std::iter_difference_t<I> d1{}, d2{};
    
            if (n1 > n2)
            {
                d1 = n1 / 2;
                ranges::advance(cut1, d1);
                cut2 = ranges::lower_bound(middle, last, *cut1,
                                           std::ref(comp), std::ref(proj));
                d2 = ranges::distance(middle, cut2);
            }
            else
            {
                d2 = n2 / 2;
                ranges::advance(cut2, d2);
                cut1 = ranges::upper_bound(first, middle, *cut2,
                                           std::ref(comp), std::ref(proj));
                d1 = ranges::distance(first, cut1);
            }
    
            I new_middle = ranges::rotate(cut1, middle, cut2);
            inplace_merge_slow(first, cut1, new_middle, d1, d2,
                               std::ref(comp), std::ref(proj));
            inplace_merge_slow(new_middle, cut2, last, n1 - d1, n2 - d2,
                               std::ref(comp), std::ref(proj));
        }
    };
    
    inline constexpr inplace_merge_fn inplace_merge {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    void print(auto const& v, auto const& rem, int middle = -1)
    {
        for (int i{}; auto n : v)
            std::cout << (i++ == middle ? "│ " : "") << n << ' ';
        std::cout << rem << '\n';
    }
    
    template<std::random_access_iterator I, std::sentinel_for<I> S>
    requires std::sortable<I>
    void merge_sort(I first, S last)
    {
        if (last - first > 1)
        {
            I middle{first + (last - first) / 2};
            merge_sort(first, middle);
            merge_sort(middle, last);
            std::ranges::inplace_merge(first, middle, last);
        }
    }
    
    int main()
    {
        // demonstração de merge-sort customizado
        std::vector v{8, 2, 0, 4, 9, 8, 1, 7, 3};
        print(v, ": antes da ordenação");
        merge_sort(v.begin(), v.end());
        print(v, ": depois da ordenação\n");
    
        // mesclando com objeto de função de comparação e projeção
        using CI = std::complex<int>;
        std::vector<CI> r{{0,1}, {0,2}, {0,3}, {1,1}, {1,2}};
        const auto middle{std::ranges::next(r.begin(), 3)};
        auto comp{std::ranges::less{}};
        auto proj{ { return z.imag(); }};
    
        print(r, ": antes da mesclagem", middle - r.begin());
        std::ranges::inplace_merge(r, middle, comp, proj);
        print(r, ": depois da mesclagem");
    }
```

Saída:
```
    8 2 0 4 9 8 1 7 3 : antes da ordenação
    0 1 2 3 4 7 8 8 9 : depois da ordenação
    
    (0,1) (0,2) (0,3) │ (1,1) (1,2) : antes da mesclagem
    (0,1) (1,1) (0,2) (1,2) (0,3) : depois da mesclagem
```

### Veja também

[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) | mescla dois ranges ordenados
(algorithm function object)
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(algorithm function object)
[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(algorithm function object)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(C++20) | ordena um range em ordem crescente
(algorithm function object)
[ inplace_merge](<#/doc/algorithm/inplace_merge>) | mescla dois ranges ordenados in-place
(function template)