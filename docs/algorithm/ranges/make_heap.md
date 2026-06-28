# std::ranges::make_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr I make_heap( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr ranges::borrowed_iterator_t<R>
make_heap( R&& r, Comp comp = {}, Proj proj = {} );
```

Constrói um [heap](<#/doc/algorithm>) em relação a `comp` e `proj` a partir dos elementos no range especificado.

1) O range especificado é `[`first`, `last`)`.

2) O range especificado é `r`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o iterator e o sentinel que designam o range de elementos a ser modificado
- **r** — o range de elementos a ser modificado
- **comp** — comparador a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1) `last`

2) [ranges::end](<#/doc/ranges/end>)(r)

### Complexidade

No máximo \\(\scriptsize 3\cdot N\\)3·N aplicações de `comp` e \\(\scriptsize 6\cdot N\\)6·N aplicações de `proj`, onde \\(\scriptsize N \\)N é:

1) [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last)

2) [ranges::distance](<#/doc/iterator/ranges/distance>)(r)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    void out(const auto& what, int n = 1)
    {
        while (n-- > 0)
            std::cout << what;
    }
    
    void print(auto rem, const auto& v)
    {
        out(rem);
        for (auto e : v)
            out(e), out(' ');
        out('\n');
    }
    
    void draw_heap(const auto& v)
    {
        auto bails = 
        {
            auto b =  { out("┌"), out("─", w), out("┴"), out("─", w), out("┐"); };
            if (!(n /= 2))
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
        std::vector h{1, 6, 1, 8, 0, 3, 3, 9, 8, 8, 7, 4, 9, 8, 9};
        print("source: ", h);
    
        std::ranges::make_heap(h);
        print("\n" "max-heap: ", h);
        draw_heap(h);
    
        std::ranges::make_heap(h, std::greater{});
        print("\n" "min-heap: ", h);
        draw_heap(h);
    }
```

Saída:
```
    source: 1 6 1 8 0 3 3 9 8 8 7 4 9 8 9
    
    max-heap: 9 8 9 8 8 4 9 6 1 0 7 1 3 8 3
           9
       ┌───┴───┐
       8       9
     ┌─┴─┐   ┌─┴─┐
     8   8   4   9
    ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐
    6 1 0 7 1 3 8 3
    
    min-heap: 0 1 1 8 6 3 3 9 8 8 7 4 9 8 9
           0
       ┌───┴───┐
       1       1
     ┌─┴─┐   ┌─┴─┐
     8   6   3   3
    ┌┴┐ ┌┴┐ ┌┴┐ ┌┴┐
    9 8 8 7 4 9 8 9
```

### Veja também

[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(objeto de função de algoritmo)
[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior sub-range que é um max heap
(objeto de função de algoritmo)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
[ make_heap](<#/doc/algorithm/make_heap>) | cria um max heap a partir de um range de elementos
(modelo de função)