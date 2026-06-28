# std::ranges::partial_sort_copy, std::ranges::partial_sort_copy_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Call signature
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::random_access_iterator I2, std::sentinel_for<I2> S2,
class Comp = ranges::less, class Proj1 = std::identity,
class Proj2 = std::identity >
requires std::indirectly_copyable<I1, I2> &&
std::sortable<I2, Comp, Proj2> &&
std::indirect_strict_weak_order<Comp, std::projected<I1, Proj1>,
std::projected<I2, Proj2>>
constexpr partial_sort_copy_result<I1, I2>
partial_sort_copy( I1 first, S1 last, I2 result_first, S2 result_last,
Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::random_access_range R2,
class Comp = ranges::less, class Proj1 = std::identity,
class Proj2 = std::identity >
requires std::indirectly_copyable<ranges::iterator_t<R1>, ranges::iterator_t<R2>> &&
std::sortable<ranges::iterator_t<R2>, Comp, Proj2> &&
std::indirect_strict_weak_order<Comp, std::projected<ranges::iterator_t<R1>,
Proj1>, std::projected<ranges::iterator_t<R2>, Proj2>>
constexpr partial_sort_copy_result<ranges::borrowed_iterator_t<R1>,
ranges::borrowed_iterator_t<R2>>
partial_sort_copy( R1&& r, R2&& result_r,
Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {} );
Helper types
template< class I, class O >
using partial_sort_copy_result = ranges::in_out_result<I, O>;
```

Copia os primeiros N elementos do range de origem `[`first`, `last`)`, como se estivesse parcialmente ordenado em relação a `comp` e `proj1`, para o range de destino `[`result_first`, `result_first + N`)`, onde \\(\scriptsize N = \min{(L_1, L_2)}\\)N = min(L₁, L₂), \\(\scriptsize L_1\\)L₁ é igual a [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last), e \\(\scriptsize L_2\\)L₂ é igual a [ranges::distance](<#/doc/iterator/ranges/distance>)(result_first, result_last).

A ordem de elementos iguais _não_ é garantida ser preservada.

1) Os elementos do range de origem são projetados usando o objeto de função `proj1`, e os elementos de destino são projetados usando o objeto de função `proj2`.

2) O mesmo que (1), mas usa `r` como o range de origem e `result_r` como o range de destino, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first`, [ranges::end](<#/doc/ranges/end>)(r) como `last`, [ranges::begin](<#/doc/ranges/begin>)(result_r) como `result_first`, e [ranges::end](<#/doc/ranges/end>)(result_r) como `result_last`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — iterator-sentinel que define o range de origem para copiar
- **r** — o range de origem para copiar
- **result_first, result_last** — iterator-sentinel que define o range de destino
- **result_r** — o range de destino
- **comp** — comparação a ser aplicada aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos do range de origem
- **proj2** — projeção a ser aplicada aos elementos do range de destino

### Valor de retorno

Um objeto igual a {last, result_first + N}.

### Complexidade

No máximo \\(\scriptsize L_1 \cdot \log{(N)}\\)L₁•log(N) comparações e \\(\scriptsize 2 \cdot L_1 \cdot \log{(N)}\\)2•L₁•log(N) projeções.

### Possível implementação
```cpp
    struct partial_sort_copy_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::random_access_iterator I2, std::sentinel_for<I2> S2,
                 class Comp = ranges::less, class Proj1 = std::identity,
                 class Proj2 = std::identity>
        requires std::indirectly_copyable<I1, I2> && std::sortable<I2, Comp, Proj2> &&
                 std::indirect_strict_weak_order<Comp, std::projected<I1, Proj1>,
                 std::projected<I2, Proj2>>
        constexpr ranges::partial_sort_copy_result<I1, I2>
            operator()(I1 first, S1 last, I2 result_first, S2 result_last,
                       Comp comp = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            if (result_first == result_last)
                return {std::move(ranges::next(std::move(first), std::move(last))),
                        std::move(result_first)};
    
            auto out_last{result_first};
            // copy first N elements
            for (; !(first == last or out_last == result_last); ++out_last, ++first)
                *out_last = *first;
    
            // convert N copied elements into a max-heap
            ranges::make_heap(result_first, out_last, comp, proj2);
    
            // process the rest of the input range (if any), preserving the heap property
            for (; first != last; ++first)
            {
                if (std::invoke(comp, std::invoke(proj1, *first),
                                      std::invoke(proj2, *result_first)))
                {
                    // pop out the biggest item and push in a newly found smaller one
                    ranges::pop_heap(result_first, out_last, comp, proj2);
                    *(out_last - 1) = *first;
                    ranges::push_heap(result_first, out_last, comp, proj2);
                }
            }
    
            // first N elements in the output range is still
            // a heap - convert it into a sorted range
            ranges::sort_heap(result_first, out_last, comp, proj2);
    
            return {std::move(first), std::move(out_last)};
        }
    
        template<ranges::input_range R1, ranges::random_access_range R2,
                 class Comp = ranges::less, class Proj1 = std::identity,
                 class Proj2 = std::identity>
        requires std::indirectly_copyable<ranges::iterator_t<R1>, ranges::iterator_t<R2>> &&
                 std::sortable<ranges::iterator_t<R2>, Comp, Proj2> &&
                 std::indirect_strict_weak_order<Comp, std::projected<ranges::iterator_t<R1>,
                 Proj1>, std::projected<ranges::iterator_t<R2>, Proj2>>
        constexpr ranges::partial_sort_copy_result<ranges::borrowed_iterator_t<R1>,
                  ranges::borrowed_iterator_t<R2>>
            operator()(R1&& r, R2&& result_r, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r),
                           ranges::begin(result_r), ranges::end(result_r),
                           std::move(comp), std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr partial_sort_copy_fn partial_sort_copy {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <forward_list>
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <string_view>
    #include <vector>
    
    void print(std::string_view rem, std::ranges::input_range auto const& v)
    {
        for (std::cout << rem; const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        const std::forward_list source{4, 2, 5, 1, 3};
    
        print("Write to the smaller vector in ascending order: ", "");
    
        std::vector dest1{10, 11, 12};
        print("const source list: ", source);
        print("destination range: ", dest1);
        std::ranges::partial_sort_copy(source, dest1);
        print("partial_sort_copy: ", dest1);
    
        print("Write to the larger vector in descending order:", "");
    
        std::vector dest2{10, 11, 12, 13, 14, 15, 16};
        print("const source list: ", source);
        print("destination range: ", dest2);
        std::ranges::partial_sort_copy(source, dest2, std::greater{});
        print("partial_sort_copy: ", dest2);
    }
```

Saída:
```
    Write to the smaller vector in ascending order:
    const source list: 4 2 5 1 3
    destination range: 10 11 12
    partial_sort_copy: 1 2 3
    Write to the larger vector in descending order:
    const source list: 4 2 5 1 3
    destination range: 10 11 12 13 14 15 16
    partial_sort_copy: 5 4 3 2 1 15 16
```

### Veja também

[ ranges::partial_sort](<#/doc/algorithm/ranges/partial_sort>)(desde C++20) | ordena os primeiros N elementos de um range
(objeto de função de algoritmo)
[ ranges::sort](<#/doc/algorithm/ranges/sort>)(desde C++20) | ordena um range em ordem crescente
(objeto de função de algoritmo)
[ ranges::stable_sort](<#/doc/algorithm/ranges/stable_sort>)(desde C++20) | ordena um range de elementos preservando a ordem entre elementos iguais
(objeto de função de algoritmo)
[ ranges::sort_heap](<#/doc/algorithm/ranges/sort_heap>)(desde C++20) | transforma um max heap em um range de elementos ordenados em ordem crescente
(objeto de função de algoritmo)
[ ranges::make_heap](<#/doc/algorithm/ranges/make_heap>)(desde C++20) | cria um max heap a partir de um range de elementos
(objeto de função de algoritmo)
[ ranges::push_heap](<#/doc/algorithm/ranges/push_heap>)(desde C++20) | adiciona um elemento a um max heap
(objeto de função de algoritmo)
[ ranges::pop_heap](<#/doc/algorithm/ranges/pop_heap>)(desde C++20) | remove o maior elemento de um max heap
(objeto de função de algoritmo)
[ partial_sort_copy](<#/doc/algorithm/partial_sort_copy>) | copia e ordena parcialmente um range de elementos
(template de função)