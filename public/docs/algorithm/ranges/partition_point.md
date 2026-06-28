# std::ranges::partition_point

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
constexpr I
partition_point( I first, S last, Pred pred, Proj proj = {} );
template< ranges::forward_range R,
class Proj = std::identity,
std::indirect_unary_predicate<
std::projected<ranges::iterator_t<R>, Proj>> Pred >
constexpr ranges::borrowed_iterator_t<R>
partition_point( R&& r, Pred pred, Proj proj = {} );
```

Examina o range particionado (como se por [ranges::partition](<#/doc/algorithm/ranges/partition>)) `[`first`, `last`)` ou `r` e localiza o fim da primeira partição, ou seja, o elemento projetado que não satisfaz `pred` ou `last` se todos os elementos projetados satisfizerem `pred`.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

first, last | \- | iterator-sentinel que define o range parcialmente ordenado a ser examinado
---|---|---
r | \- | o range parcialmente ordenado a ser examinado
pred | \- | predicado a ser aplicado aos elementos projetados
proj | \- | projeção a ser aplicada aos elementos

### Valor de retorno

O iterator após o fim da primeira partição dentro de `[`first`, `last`)` ou o iterator igual a `last` se todos os elementos projetados satisfizerem `pred`.

### Complexidade

Dado N = [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last), executa O(log N) aplicações do predicado `pred` e da projeção `proj`.

No entanto, se os sentinels não modelarem [std::sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>)&lt;I&gt;, o número de incrementos do iterator é O(N).

### Notas

Este algoritmo é uma forma mais geral de `ranges::lower_bound`, que pode ser expressa em termos de `ranges::partition_point` com o predicado `[&](auto const& e) { return [std::invoke](<#/doc/utility/functional/invoke>)(pred, e, value); });`.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <iterator>
    
    auto print_seq = 
    {
        for (std::cout << rem; first != last; std::cout << *first++ << ' ') {}
        std::cout << '\n';
    };
    
    int main()
    {
        std::array v {1, 2, 3, 4, 5, 6, 7, 8, 9};
    
        auto is_even =  { return i % 2 == 0; };
    
        std::ranges::partition(v, is_even);
        print_seq("After partitioning, v: ", v.cbegin(), v.cend());
    
        const auto pp = std::ranges::partition_point(v, is_even);
        const auto i = std::ranges::distance(v.cbegin(), pp);
        std::cout << "Partition point is at " << i << "; v[" << i << "] = " << *pp << '\n';
    
        print_seq("First partition (all even elements): ", v.cbegin(), pp);
        print_seq("Second partition (all odd elements): ", pp, v.cend());
    }
```

Saída possível:
```
    After partitioning, v: 2 4 6 8 5 3 7 1 9
    Partition point is at 4; v[4] = 5
    First partition (all even elements): 2 4 6 8
    Second partition (all odd elements): 5 3 7 1 9
```

### Veja também

[ ranges::is_sorted](<#/doc/algorithm/ranges/is_sorted>)(C++20) | verifica se um range está ordenado em ordem crescente
(objeto de função de algoritmo)
[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(objeto de função de algoritmo)
[ partition_point](<#/doc/algorithm/partition_point>)(C++11) | localiza o ponto de partição de um range particionado
(modelo de função)