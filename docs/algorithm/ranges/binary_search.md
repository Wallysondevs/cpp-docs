# std::ranges::binary_search

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr bool binary_search( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
(até C++26)
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj>,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr bool binary_search( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr bool binary_search( R&& r, const T& value,
Comp comp = {}, Proj proj = {} );
(até C++26)
template< ranges::forward_range R,
class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj>,
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr bool binary_search( R&& r, const T& value,
Comp comp = {}, Proj proj = {} );
```

1) Verifica se um elemento projetado equivalente a `value` aparece dentro do range `[`first`, `last`)`.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse `[ranges::begin](<#/doc/ranges/begin>)(r)` como `first` e `[ranges::end](<#/doc/ranges/end>)(r)` como `last`.

Para que `ranges::binary_search` seja bem-sucedido, o range `[`first`, `last`)` deve ser pelo menos parcialmente ordenado em relação a `value`, ou seja, deve satisfazer todos os seguintes requisitos:

* particionado em relação a `[std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, element), value)` (ou seja, todos os elementos projetados para os quais a expressão é verdadeira precedem todos os elementos para os quais a expressão é falsa).
* particionado em relação a `![std::invoke](<#/doc/utility/functional/invoke>)(comp, value, [std::invoke](<#/doc/utility/functional/invoke>)(proj, element))`.
* para todos os elementos, se `[std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, element), value)` for verdadeiro, então `![std::invoke](<#/doc/utility/functional/invoke>)(comp, value, [std::invoke](<#/doc/utility/functional/invoke>)(proj, element))` também é verdadeiro.

Um range totalmente ordenado atende a esses critérios.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

* Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
* Nenhum deles é visível para `[argument-dependent lookup](<#/doc/language/adl>)`.
* Quando qualquer um deles é encontrado por `[normal unqualified lookup](<#/doc/language/unqualified_lookup>)` como o nome à esquerda do operador de chamada de função, `[argument-dependent lookup](<#/doc/language/adl>)` é inibido.

### Parâmetros

- **first, last** — o range de elementos a examinar
- **r** — o range de elementos a examinar
- **value** — valor para comparar os elementos
- **comp** — função de comparação para aplicar aos elementos projetados
- **proj** — projeção para aplicar aos elementos

### Valor de retorno

`true` se um elemento igual a `value` for encontrado, `false` caso contrário.

### Complexidade

O número de comparações e projeções realizadas é logarítmico na distância entre `first` e `last` (no máximo log2(last - first) + O(1) comparações e projeções). No entanto, para pares iterador-sentinela que não modelam `[std::random_access_iterator](<#/doc/iterator/random_access_iterator>)`, o número de incrementos do iterador é linear.

### Observações

`std::ranges::binary_search` não retorna um iterador para o elemento encontrado quando um elemento cuja projeção é igual a `value` é encontrado. Se um iterador for desejado, `std::ranges::lower_bound` deve ser usado em vez disso.

Teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/binary_search>))

### Possível implementação
```cpp
    struct binary_search_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S,
                 class Proj = std::identity, class T = std::projected_value_t<I, Proj>,
                 std::indirect_strict_weak_order
                     <const T*, std::projected<I, Proj>> Comp = ranges::less>
        constexpr bool operator()(I first, S last, const T& value,
                                  Comp comp = {}, Proj proj = {}) const
        {
            auto x = ranges::lower_bound(first, last, value, comp, proj);
            return (!(x == last) && !(std::invoke(comp, value, std::invoke(proj, *x))));
        }
    
        template<ranges::forward_range R, class Proj = std::identity,
                 class T = std::projected_value_t<ranges::iterator_t<R>, Proj>,
                 std::indirect_strict_weak_order
                     <const T*, std::projected<ranges::iterator_t<R>,
                                               Proj>> Comp = ranges::less>
        constexpr bool operator()(R&& r, const T& value, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value,
                           std::move(comp), std::move(proj));
        }
    };
    
    inline constexpr binary_search_fn binary_search;
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <ranges>
    #include <vector>
    
    int main()
    {
        constexpr static auto haystack = {1, 3, 4, 5, 9};
        static_assert(std::ranges::is_sorted(haystack));
    
        for (const int needle : std::views::iota(1)
                              | std::views::take(3))
        {
            std::cout << "Searching for " << needle << ": ";
            std::ranges::binary_search(haystack, needle)
                ? std::cout << "found " << needle << '\n'
                : std::cout << "no dice!\n";
        }
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 1}, {2, 3}, {4, 2}, {4, 3}};
        auto cmpz = { return abs(x) < abs(y); };
        #ifdef __cpp_lib_algorithm_default_value_type
            assert(std::ranges::binary_search(nums, {4, 2}, cmpz));
        #else
            assert(std::ranges::binary_search(nums, CD{4, 2}, cmpz));
        #endif
    }
```

Saída:
```
    Searching for 1: found 1
    Searching for 2: no dice!
    Searching for 3: found 3
```

### Veja também

[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna um range de elementos que correspondem a uma chave específica
(objeto de função de algoritmo)
[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterador para o primeiro elemento _não menor_ que o valor fornecido
(objeto de função de algoritmo)
[ ranges::upper_bound](<#/doc/algorithm/ranges/upper_bound>)(C++20) | retorna um iterador para o primeiro elemento _maior_ que um determinado valor
(objeto de função de algoritmo)
[ ranges::containsranges::contains_subrange](<#/doc/algorithm/ranges/contains>)(C++23)(C++23) | verifica se o range contém o elemento ou sub-range fornecido
(objeto de função de algoritmo)
[ binary_search](<#/doc/algorithm/binary_search>) | determina se um elemento existe em um range parcialmente ordenado
(modelo de função)