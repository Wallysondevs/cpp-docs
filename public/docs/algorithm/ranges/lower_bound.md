# std::ranges::lower_bound

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::forward_iterator I, std::sentinel_for<I> S,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr I lower_bound( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
(até C++26)
template< std::forward_iterator I, std::sentinel_for<I> S,
class Proj = std::identity,
class T = std::projected_value_t<I, Proj>,
std::indirect_strict_weak_order
<const T*, std::projected<I, Proj>> Comp = ranges::less >
constexpr I lower_bound( I first, S last, const T& value,
Comp comp = {}, Proj proj = {} );
template< ranges::forward_range R,
class T, class Proj = std::identity,
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
lower_bound( R&& r, const T& value, Comp comp = {}, Proj proj = {} );
(até C++26)
template< ranges::forward_range R,
class Proj = std::identity,
class T = std::projected_value_t<ranges::iterator_t<R>, Proj>
std::indirect_strict_weak_order
<const T*, std::projected<ranges::iterator_t<R>,
Proj>> Comp = ranges::less >
constexpr ranges::borrowed_iterator_t<R>
lower_bound( R&& r, const T& value, Comp comp = {}, Proj proj = {} );
```

  
1) Retorna um iterator apontando para o primeiro elemento no range `[`first`, `last`)` que _não é menor_ que (ou seja, maior ou igual a) `value`, ou `last` se nenhum elemento for encontrado. O range `[`first`, `last`)` deve ser particionado em relação à expressão [std::invoke](<#/doc/utility/functional/invoke>)(comp, [std::invoke](<#/doc/utility/functional/invoke>)(proj, element), value), ou seja, todos os elementos para os quais a expressão é verdadeira devem preceder todos os elementos para os quais a expressão é falsa. Um range totalmente ordenado atende a este critério.

2) O mesmo que (1), mas usa `r` como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como `first` e [ranges::end](<#/doc/ranges/end>)(r) como `last`.

As entidades tipo função descritas nesta página são [_algorithm function objects_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja: 

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas. 
*   Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>). 
*   Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido. 

### Parâmetros

- **first, last** — par de iterator-sentinel definindo o range parcialmente ordenado a ser examinado
- **r** — o range parcialmente ordenado a ser examinado
- **value** — valor para comparar os elementos projetados
- **comp** — predicado de comparação a ser aplicado aos elementos projetados
- **proj** — projeção a ser aplicada aos elementos
  
### Valor de retorno

Iterator apontando para o primeiro elemento que _não é menor_ que `value`, ou `last` se nenhum elemento for encontrado. 

### Complexidade

O número de comparações e aplicações da projeção realizadas é logarítmico na distância entre `first` e `last` (no máximo log2(last - first) + O(1) comparações e aplicações da projeção). No entanto, para um iterator que não modela [`random_access_iterator`](<#/doc/iterator/random_access_iterator>), o número de incrementos do iterator é linear. 

### Notas

Em um range que está totalmente ordenado (ou, mais geralmente, parcialmente ordenado em relação a `value`) após a projeção, `std::ranges::lower_bound` implementa o algoritmo de busca binária. Portanto, [std::ranges::binary_search](<#/doc/algorithm/ranges/binary_search>) pode ser implementado em termos dele. 

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/ranges/lower_bound>))  
  
### Possível implementação
```
    struct lower_bound_fn
    {
        template<std::forward_iterator I, std::sentinel_for<I> S, class Proj = std::identity,
                 class T = std::projected_value_t<I, Proj>,
                 std::indirect_strict_weak_order
                     <const T*, std::projected<I, Proj>> Comp = ranges::less>
        constexpr I operator()(I first, S last, const T& value,
                               Comp comp = {}, Proj proj = {}) const
        {
            I it;
            std::iter_difference_t<I> count, step;
            count = std::ranges::distance(first, last);
     
            while (count > 0)
            {
                it = first;
                step = count / 2;
                ranges::advance(it, step, last);
                if (comp(std::invoke(proj, *it), value))
                {
                    first = ++it;
                    count -= step + 1;
                }
                else
                    count = step;
            }
            return first;
        }
     
        template<ranges::forward_range R, class Proj = std::identity,
              class T = std::projected_value_t<ranges::iterator_t<R>, Proj>
              std::indirect_strict_weak_order
                  <const T*, std::projected<ranges::iterator_t<R>,
                                            Proj>> Comp = ranges::less>
        constexpr ranges::borrowed_iterator_t<R>
            operator()(R&& r, const T& value, Comp comp = {}, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), value,
                           std::ref(comp), std::ref(proj));
        }
    };
     
    inline constexpr lower_bound_fn lower_bound;
```
  
---  
  
### Exemplo

Execute este código
```
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    namespace ranges = std::ranges;
     
    template<std::forward_iterator I, std::sentinel_for<I> S, class T,
             class Proj = std::identity,
             std::indirect_strict_weak_order
                 <const T*, std::projected<I, Proj>> Comp = ranges::less>
    constexpr I binary_find(I first, S last, const T& value, Comp comp = {}, Proj proj = {})
    {
        first = ranges::lower_bound(first, last, value, comp, proj);
        return first != last && !comp(value, proj(*first)) ? first : last;
    }
     
    int main()
    {
        std::vector data{1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5};
        //                                 ^^^^^^^^^^
        auto lower = ranges::lower_bound(data, 4);
        auto upper = ranges::upper_bound(data, 4);
     
        std::cout << "found a range " << [ranges::distance(data.cbegin(), lower)
                  << ", " << ranges::distance(data.cbegin(), upper) << ") = { ";
        ranges::copy(lower, upper, std::ostream_iterator<int>(std::cout, " "));
        std::cout << "}\n";
     
        // classic binary search, returning a value only if it is present
     
        data = {1, 2, 4, 8, 16};
        //               ^
        auto it = binary_find(data.cbegin(), data.cend(), 8); // '5' would return end()
     
        if (it != data.cend())
            std::cout << *it << " found at index "<< ranges::distance(data.cbegin(), it);
     
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}};
        auto cmpz =  { return x.real() < y.real(); };
        #ifdef __cpp_lib_algorithm_default_value_type
            auto it2 = ranges::lower_bound(nums, {2, 0}, cmpz);
        #else
            auto it2 = ranges::lower_bound(nums, CD{2, 0}, cmpz);
        #endif
        assert((*it2 == CD{2, 2}));
    }
```

Saída: 
```
    found a range [6, 10) = { 4 4 4 4 }
    8 found at index 3
```

### Veja também

[ ranges::equal_range](<#/doc/algorithm/ranges/equal_range>)(C++20) | retorna o range de elementos que correspondem a uma chave específica  
(objeto de função de algoritmo)  
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos  
(objeto de função de algoritmo)  
[ ranges::partition_point](<#/doc/algorithm/ranges/partition_point>)(C++20) | localiza o ponto de partição de um range particionado  
(objeto de função de algoritmo)  
[ ranges::upper_bound](<#/doc/algorithm/ranges/upper_bound>)(C++20) | retorna um iterator para o primeiro elemento _maior_ que um certo valor  
(objeto de função de algoritmo)  
[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado   
(modelo de função)