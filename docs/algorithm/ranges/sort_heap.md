# std::ranges::sort_heap

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::random_access_iterator I, std::sentinel_for<I> S,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<I, Comp, Proj>
constexpr I sort_heap( I first, S last, Comp comp = {}, Proj proj = {} );
template< ranges::random_access_range R,
class Comp = ranges::less, class Proj = std::identity >
requires std::sortable<ranges::iterator_t<R>, Comp, Proj>
constexpr ranges::borrowed_iterator_t<R>
sort_heap( R&& r, Comp comp = {}, Proj proj = {} );
```

[Ordena](<#/doc/algorithm>) os elementos no range especificado em relação a comp e proj, onde o range originalmente representa um [heap](<#/doc/algorithm>) em relação a comp e proj. O range ordenado não mantém mais a propriedade de heap.

1) O range especificado é `[`first`, `last`)`.

2) O range especificado é r.

Se o range especificado não for um heap em relação a comp e proj, o comportamento é indefinido.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — o iterator e sentinel que designam o range de elementos a ser modificado
- **r** — o range de elementos a ser modificado
- **comp** — comparador a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos

### Valor de retorno

1) last

2) [ranges::end](<#/doc/ranges/end>)(r)

### Complexidade

No máximo \\(\scriptsize 2N \cdot \log(N)\\)2N⋅log(N) aplicações de comp e \\(\scriptsize 4N \cdot \log(N)\\)4N⋅log(N) aplicações de proj, onde \\(\scriptsize N \\)N é:

1) [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last)

2) [ranges::distance](<#/doc/iterator/ranges/distance>)(r)

### Possível implementação
```cpp
    struct sort_heap_fn
    {
        template<std::random_access_iterator I, std::sentinel_for<I> S,
                 class Comp = ranges::less, class Proj = std::identity>
            requires std::sortable<I, Comp, Proj>
        constexpr I operator()(I first, S last, Comp comp = {}, Proj proj = {}) const
        {
            auto ret{ranges::next(first, last)};
            for (; first != last; --last)
                ranges::pop_heap(first, last, comp, proj);
            return ret;
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
    
    inline constexpr sort_heap_fn sort_heap{};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    
    void print(auto const& rem, const auto& v)
    {
        std::cout << rem;
        for (const auto i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::array v{3, 1, 4, 1, 5, 9};
        print("original array:  ", v);
    
        std::ranges::make_heap(v);
        print("after make_heap: ", v);
    
        std::ranges::sort_heap(v);
        print("after sort_heap: ", v);
    }
```

Saída:
```
    original array:  3 1 4 1 5 9
    after make_heap: 9 5 4 1 1 3
    after sort_heap: 1 1 3 4 5 9
```

### Veja também

[ ranges::is_heap](<#/doc/algorithm/ranges/is_heap>)(C++20) | verifica se o range dado é um max heap
(objeto de função de algoritmo)
[ ranges::is_heap_until](<#/doc/algorithm/ranges/is_heap_until>)(C++20) | encontra o maior sub-range que é um max heap
(objeto de função de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ sort_heap](<#/doc/algorithm/sort_heap>) | transforma um max heap em um range de elementos ordenados em ordem crescente
(modelo de função)