# std::ranges::set_difference, std::ranges::set_difference_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I1, std::sentinel_for<I1> S1,
std::input_iterator I2, std::sentinel_for<I2> S2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
constexpr set_difference_result<I1, O>
set_difference( I1 first1, S1 last1, I2 first2, S2 last2,
O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
template< ranges::input_range R1, ranges::input_range R2,
std::weakly_incrementable O, class Comp = ranges::less,
class Proj1 = std::identity, class Proj2 = std::identity >
requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
O, Comp, Proj1, Proj2>
constexpr set_difference_result<ranges::borrowed_iterator_t<R1>, O>
set_difference( R1&& r1, R2&& r2, O result, Comp comp = {},
Proj1 proj1 = {}, Proj2 proj2 = {} );
Tipos auxiliares
template< class I, class O >
using set_difference_result = ranges::in_out_result<I, O>;
```

Copia os elementos do range de entrada ordenado `[`first1`, `last1`)` que não são encontrados no range de entrada ordenado `[`first2`, `last2`)` para o range de saída começando em `result`.

O comportamento é indefinido se

*   os ranges de entrada não estiverem ordenados em relação a `comp` e `proj1` ou `proj2`, respectivamente, ou
*   o range resultante se sobrepuser a qualquer um dos ranges de entrada.

1) Os elementos são comparados usando a função de comparação binária `comp` fornecida.

2) O mesmo que (1), mas usa `r1` como o primeiro range e `r2` como o segundo range, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r1) como `first1`, [ranges::end](<#/doc/ranges/end>)(r1) como `last1`, [ranges::begin](<#/doc/ranges/begin>)(r2) como `first2`, e [ranges::end](<#/doc/ranges/end>)(r2) como `last2`.

As entidades tipo-função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos template não podem ser especificadas ao chamar qualquer uma delas.
*   Nenhuma delas é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer uma delas é encontrada por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first1, last1** — par iterador-sentinela denotando o primeiro range de entrada ordenado
- **first2, last2** — par iterador-sentinela denotando o segundo range de entrada ordenado
- **r1** — o primeiro range de entrada ordenado
- **r2** — o segundo range de entrada ordenado
- **result** — o início do range de saída
- **comp** — comparador a ser aplicado aos elementos projetados
- **proj1** — projeção a ser aplicada aos elementos no primeiro range
- **proj2** — projeção a ser aplicada aos elementos no segundo range

### Valor de retorno

`{last1, result_last}`, onde `result_last` é o fim do range construído.

### Complexidade

No máximo \\(\scriptsize 2\cdot(N_1+N_2)-1\\)2·(N1+N2)-1 comparações e aplicações de cada projeção, onde \\(\scriptsize N_1\\)N1 e \\(\scriptsize N_2\\)N2 são [ranges::distance](<#/doc/iterator/ranges/distance>)(first1, last1) e [ranges::distance](<#/doc/iterator/ranges/distance>)(first2, last2), respectivamente.

### Possível implementação
```cpp
    struct set_difference_fn
    {
        template<std::input_iterator I1, std::sentinel_for<I1> S1,
                 std::input_iterator I2, std::sentinel_for<I2> S2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<I1, I2, O, Comp, Proj1, Proj2>
        constexpr ranges::set_difference_result<I1, O>
            operator()(I1 first1, S1 last1, I2 first2, S2 last2,
                       O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            while (!(first1 == last1 or first2 == last2))
            {
                if (std::invoke(comp, std::invoke(proj1, *first1), std::invoke(proj2, *first2)))
                {
                    *result = *first1;
                    ++first1;
                    ++result;
                }
                else if (std::invoke(comp, std::invoke(proj2, *first2),
                                     std::invoke(proj1, *first1)))
                    ++first2;
                else
                {
                    ++first1;
                    ++first2;
                }
            }
            return ranges::copy(std::move(first1), std::move(last1), std::move(result));
        }
    
        template<ranges::input_range R1, ranges::input_range R2,
                 std::weakly_incrementable O, class Comp = ranges::less,
                 class Proj1 = std::identity, class Proj2 = std::identity>
        requires std::mergeable<ranges::iterator_t<R1>, ranges::iterator_t<R2>,
                                O, Comp, Proj1, Proj2>
        constexpr ranges::set_difference_result<ranges::borrowed_iterator_t<R1>, O>
            operator()(R1&& r1, R2&& r2, O result, Comp comp = {},
                       Proj1 proj1 = {}, Proj2 proj2 = {}) const
        {
            return (*this)(ranges::begin(r1), ranges::end(r1),
                           ranges::begin(r2), ranges::end(r2),
                           std::move(result), std::move(comp),
                           std::move(proj1), std::move(proj2));
        }
    };
    
    inline constexpr set_difference_fn set_difference {};
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <iostream>
    #include <iterator>
    #include <string_view>
    #include <vector>
    
    auto print =  end = "")
    {
        std::cout << "{ ";
        for (auto n{v.size()}; auto i : v)
            std::cout << i << (--n ? ", " : " ");
        std::cout << "} " << end;
    };
    
    struct Order // uma struct com alguns dados muito interessantes
    {
        int order_id{};
    
        friend std::ostream& operator<<(std::ostream& os, const Order& ord)
        {
            return os << '{' << ord.order_id << '}';
        }
    };
    
    int main()
    {
        const auto v1 = {1, 2, 5, 5, 5, 9};
        const auto v2 = {2, 5, 7};
        std::vector<int> diff{};
    
        std::ranges::set_difference(v1, v2, std::back_inserter(diff));
        print(v1, "∖ ");
        print(v2, "= ");
        print(diff, "\n\n");
    
        // Queremos saber quais pedidos "cortam" entre os estados antigo e novo:
        const std::vector<Order> old_orders{{1}, {2}, {5}, {9}};
        const std::vector<Order> new_orders{{2}, {5}, {7}};
        std::vector<Order> cut_orders(old_orders.size() + new_orders.size());
    
        auto [old_orders_end, cut_orders_last] =
            std::ranges::set_difference(old_orders, new_orders,
                                        cut_orders.begin(), {},
                                        &Order::order_id, &Order::order_id);
        assert(old_orders_end == old_orders.end());
    
        std::cout << "old orders = ";
        print(old_orders, "\n");
        std::cout << "new orders = ";
        print(new_orders, "\n");
        std::cout << "cut orders = ";
        print(cut_orders, "\n");
        cut_orders.erase(cut_orders_last, end(cut_orders));
        std::cout << "cut orders = ";
        print(cut_orders, "\n");
    }
```

Saída:
```
    { 1, 2, 5, 5, 5, 9 } ∖ { 2, 5, 7 } = { 1, 5, 5, 9 }
    
    old orders = { {1}, {2}, {5}, {9} }
    new orders = { {2}, {5}, {7} }
    cut orders = { {1}, {9}, {0}, {0}, {0}, {0}, {0} }
    cut orders = { {1}, {9} }
```

### Veja também

[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_intersection](<#/doc/algorithm/ranges/set_intersection>)(C++20) | calcula a interseção de dois conjuntos
(objeto de função de algoritmo)
[ ranges::set_symmetric_difference](<#/doc/algorithm/ranges/set_symmetric_difference>)(C++20) | calcula a diferença simétrica entre dois conjuntos
(objeto de função de algoritmo)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna verdadeiro se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)
[ set_difference](<#/doc/algorithm/set_difference>) | calcula a diferença entre dois conjuntos
(modelo de função)