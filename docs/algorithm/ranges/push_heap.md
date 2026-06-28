# std::ranges::push_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr I push_heap( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr ranges::borrowed_iterator_t<R>
push_heap( R&& r, Comp comp = {}, Proj proj = {} );
```

Insere o último elemento no range especificado em um [heap](<#/doc/algorithm>) em relação a comp e proj, onde o heap consiste em todos os elementos no range, exceto o último. O heap após a inserção será o range inteiro.

1) O range especificado é `[`first`, `last`)`.

2) O range especificado é r.

Se o range especificado (excluindo o último elemento) não for um heap em relação a comp e proj, o comportamento é indefinido.

As entidades semelhantes a funções descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o iterator e sentinel que designam o range de elementos a ser modificado
- **r** — o range de elementos a ser modificado
- **comp** — comparador a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1) last

2) [ranges::end](<#/doc/ranges/end>)(r)

### Complexidade

No máximo \\(\scriptsize \log{(N)}\\)log(N) aplicações de comp e \\(\scriptsize 2\log{(N)}\\)2log(N) aplicações de proj, onde \\(\scriptsize N \\)N é:

1) [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last)

2) [ranges::distance](<#/doc/iterator/ranges/distance>)(r)

### Possível implementação
```cpp
    struct push_heap_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<I, Comp, Proj>
        constexpr I operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            const auto n{ranges::distance(first, last)};
            const auto length{n};
            if (n > 1)
            {
                I last{first + n};
                n = (n - 2) / 2;
                I i{first + n};
                if (std::invoke(comp, std::invoke(proj, *i), std::invoke(proj, *--last)))
                {
                    std::iter_value_t<I> v {ranges::iter_move(last)};
                    do
                    {
                        *last = ranges::iter_move(i);
                        last = i;
                        if (n == 0)
                            break;
                        n = (n - 1) / 2;
                        i = first + n;
                    }
                    while (std::invoke(comp, std::invoke(proj, *i), std::invoke(proj, v)));
                    *last = std::move(v);
                }
            }
            return first + length;
        }
    
        template<ranges::random_access_range R,
                 class Comp = ranges::less, class Proj = std::identity>
        requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr push_heap_fn push_heap{};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iostream>
    #include <vector>
    
    void out(const auto& what, int n = 1)
    {
        while (n-- > 0)
            std::cout << what;
    }
    
    void print(auto rem, auto const& v)
    {
        out(rem);
        for (auto e : v)
            out(e), out(' ');
        out('\n');
    }
    
    void draw_heap(auto const& v)
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
        std::vector<int> v{1, 6, 1, 8, 0, 3,};
        print("source vector v: ", v);
    
        std::ranges::make_heap(v);
        print("after make_heap: ", v);
        draw_heap(v);
    
        v.push_back(9);
    
        print("before push_heap: ", v);
        draw_heap(v);
    
        std::ranges::push_heap(v);
        print("after push_heap: ", v);
        draw_heap(v);
    }
```

Saída:
```
    source vector v: 1 6 1 8 0 3 
    after make_heap: 8 6 3 1 0 1 
       8
     ┌─┴─┐
     6   3
    ┌┴┐ ┌┴┐
    1 0 1 
    before push_heap: 8 6 3 1 0 1 9 
       8
     ┌─┴─┐
     6   3
    ┌┴┐ ┌┴┐
    1 0 1 9 
    after push_heap: 9 6 8 1 0 1 3 
       9
     ┌─┴─┐
     6   8
    ┌┴┐ ┌┴┐
    1 0 1 3 
```

### Veja também

[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range fornecido é um max heap
(objeto de função de algoritmo)
[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior sub-range que é um max heap
(objeto de função de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
[ push_heap](<#/doc/algorithm/push_heap>) | adiciona um elemento a um max heap
(modelo de função)