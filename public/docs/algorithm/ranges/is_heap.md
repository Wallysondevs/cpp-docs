# std::ranges::is_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_strict_weak_order
<std::projected<I, Proj>> Comp = ranges::less >
constexpr bool is_heap( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R, class Proj = std::identity,
std::indirect_strict_weak_order
<std::projected
<ranges::iterator_t<R>, Proj>> Comp = ranges::less >
constexpr bool is_heap( R&& r, Comp comp = {}, Proj proj = {} );
```

Verifica se o range especificado representa um [heap](<#/doc/algorithm>) em relação a `comp` e `proj`.

1) O range especificado é `[`first`, `last`)`.

2) O range especificado é `r`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

first, last | \- | o iterador e sentinela que designam o range de elementos a examinar
---|---|---
r | \- | o range de elementos a examinar
comp | \- | comparador a aplicar aos elementos projetados
proj | \- | projeção a aplicar aos elementos

### Valor de retorno

1) [ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(first, last, comp, proj) == last

2) [ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(r, comp, proj) == [ranges::end](<#/doc/ranges/end>)(r)

### Complexidade

\\(\scriptsize O(N) \\)O(N) aplicações de `comp` e `proj`, onde \\(\scriptsize N \\)N é:

1) [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last)

2) [ranges::distance](<#/doc/iterator/ranges/distance>)(r)

### Possível implementação
```cpp
    struct is_heap_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity,
                 std::indirect_strict_weak_order
                     <std::projected<I, Proj>> Comp = ranges::less>
        constexpr bool operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            return (last == ranges::is_heap_until(first, last,
                                                  std::move(comp), std::move(proj)));
        }
    
        template<ranges::random_access_range R, class Proj = std::identity,
                 std::indirect_strict_weak_order
                     <std::projected<ranges::iterator_t<R>, Proj>> Comp = ranges::less>
        constexpr bool operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr is_heap_fn is_heap{};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <bit>
    #include <cmath>
    #include <iostream>
    #include <vector>
    
    void out(const auto& what, int n = 1)
    {
        while (n-- > 0)
            std::cout << what;
    }
    
    void draw_heap(const auto& v)
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
    
        const int m{static_cast<int>(std::ceil(std::log2(1 + v.size())))};
        auto first{v.cbegin()};
        for (int i{}; i != m; ++i)
            tier(i, m, first, v.cend());
    }
    
    int main()
    {
        std::vector<int> v{3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8};
    
        out("initially, v:\n");
        for (auto i : v)
            std::cout << i << ' ';
        out('\n');
    
        if (!std::ranges::is_heap(v))
        {
            out("making heap...\n");
            std::ranges::make_heap(v);
        }
    
        out("after make_heap, v:\n");
        for (auto t{1U}; auto i : v)
            std::cout << i << (std::has_single_bit(++t) ? " │ " : " ");
    
        out("\n" "corresponding binary tree is:\n");
        draw_heap(v);
    }
```

Saída:
```
    initially, v:
    3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3 2 3 8
    making heap...
    after make_heap, v:
    9 │ 8 9 │ 6 5 8 9 │ 3 5 3 5 3 4 7 2 │ 1 2 3 1
    corresponding binary tree is:
                   9
           ┌───────┴───────┐
           8               9
       ┌───┴───┐       ┌───┴───┐
       6       5       8       9
     ┌─┴─┐   ┌─┴─┐   ┌─┴─┐   ┌─┴─┐
     3   5   3   5   3   4   7   2
    ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐
    1 2 3 1
```

### Veja também

[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior sub-range que é um max heap
(objeto de função de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
[ is_heap](<#/doc/algorithm/is_heap>)(C++11) | verifica se o range dado é um max heap
(modelo de função)