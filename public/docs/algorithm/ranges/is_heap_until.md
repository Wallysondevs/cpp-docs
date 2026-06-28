# std::ranges::is_heap_until

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_strict_weak_order
< std::projected<I, Proj>> Comp = ranges::less >
constexpr I is_heap_until( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R, class Proj = std::identity,
std::indirect_strict_weak_order
<std::projected
<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
is_heap_until( R&& r, Comp comp = {}, Proj proj = {} );
```

Dentro do range especificado, encontra o range mais longo que, começando do início do range especificado, representa um [heap](<#/doc/algorithm>) em relação a comp e proj.

1) O range especificado é `[`first`, `last`)`.

2) O range especificado é r.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range de elementos a examinar
- **pred** — predicado a aplicar aos elementos projetados
- **proj** — projeção a aplicar aos elementos

### Valor de retorno

O último iterator iter no range especificado para o qual:

1) O range `[`first`, `iter`)` é um heap em relação a comp e proj.

2) O range `[`[ranges::begin](<#/doc/ranges/begin>)(r)`, `iter`)` é um heap em relação a comp e proj.

### Complexidade

\\(\scriptsize O(N) \\)O(N) aplicações de comp e proj, onde \\(\scriptsize N \\)N é:

1) [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last)

2) [ranges::distance](<#/doc/iterator/ranges/distance>)(r)

### Possível implementação
```cpp
    struct is_heap_until_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 std::indirect_strict_weak_order
                     <std::projected<I, Proj>> Comp = ranges::less>
        constexpr I operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            std::iter_difference_t<I> n{ranges::distance(first, last)}, dad{0}, son{1};
            for (; son != n; ++son)
            {
                if (std::invoke(comp, std::invoke(proj, *(first + dad)),
                                      std::invoke(proj, *(first + son))))
                    return first + son;
                else if ((son % 2) == 0)
                    ++dad;
            }
            return first + n;
        }
    
        template<ranges::random_access_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order
                     <std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr is_heap_until_fn is_heap_until{};
```

---

### Exemplo

O exemplo renderiza um dado vetor como uma [árvore binária](<https://en.wikipedia.org/wiki/Binary_tree> "enwiki:Binary tree") (balanceada).

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    void out(const auto& what, int n = 1)
    {
        while (n-- > 0)
            std::cout << what;
    }
    
    void draw_bin_tree(auto first, auto last)
    {
        auto bails = 
        {
            auto b =  { out("┌"), out("─", w), out("┴"), out("─", w), out("┐"); };
            n /= 2;
            if (!n)
                return;
            for (out(' ', w); n-- > 0;)
                b(w), out(' ', w + w + 1);
            out('\n');
        };
    
        auto data = 
        {
            for (out(' ', w); n-- > 0 && first != last; ++first)
                out(*first), out(' ', w + w + 1);
            out('\n');
        };
    
        auto tier = &
        {
            const int n{1 << t};
            const int w{(1 << (m - t - 1)) - 1};
            bails(n, w), data(n, w, first, last);
        };
    
        const auto size{std::ranges::distance(first, last)};
        const int m{static_cast<int>(std::ceil(std::log2(1 + size)))};
        for (int i{}; i != m; ++i)
            tier(i, m, first, last);
    }
    
    int main()
    {
        std::vector<int> v{3, 1, 4, 1, 5, 9};
        std::ranges::make_heap(v);
    
        // probably mess up the heap
        v.push_back(2);
        v.push_back(6);
    
        out("v after make_heap and push_back:\n");
        draw_bin_tree(v.begin(), v.end());
    
        out("the max-heap prefix of v:\n");
        const auto heap_end = std::ranges::is_heap_until(v);
        draw_bin_tree(v.begin(), heap_end);
    }
```

Saída:
```
    v after make_heap and push_back: 
           9               
       ┌───┴───┐       
       5       4       
     ┌─┴─┐   ┌─┴─┐   
     1   1   3   2   
    ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐ 
    6 
    the max-heap prefix of v: 
       9       
     ┌─┴─┐   
     5   4   
    ┌┴┐ ┌┴┐ 
    1 1 3 2
```

### Veja também

[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(objeto de função de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
[ is_heap_until](<#/doc/algorithm/is_heap_until>)(C++11) | encontra o maior sub-range que é um max heap
(modelo de função)