# std::ranges::partition_copy, std::ranges::partition_copy_result

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
Assinatura da chamada
template< std::input_iterator I, std::sentinel_for<I> S,
std::weakly_incrementable O1, std::weakly_incrementable O2,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<I, Proj>> Pred >
requires std::indirectly_copyable<I, O1> &&
std::indirectly_copyable<I, O2>
constexpr partition_copy_result<I, O1, O2>
partition_copy( I first, S last, O1 out_true, O2 out_false,
Pred pred, Proj proj = {} );
template< ranges::input_range R,
std::weakly_incrementable O1, std::weakly_incrementable O2,
class Proj = std::identity,
std::indirect_unary_predicate<std::projected<iterator_t<R>, Proj>> Pred >
requires std::indirectly_copyable<ranges::iterator_t<R>, O1> &&
std::indirectly_copyable<ranges::iterator_t<R>, O2>
constexpr partition_copy_result<ranges::borrowed_iterator_t<R>, O1, O2>
partition_copy( R&& r, O1 out_true, O2 out_false,
Pred pred, Proj proj = {} );
Tipos auxiliares
template< class I, class O1, class O2 >
using partition_copy_result = ranges::in_out_out_result<I, O1, O2>;
```

  
1) Copia os elementos do range de entrada `[`first`, `last`)` para dois ranges de saída diferentes, dependendo do valor retornado pelo predicado pred. Os elementos que satisfazem o predicado pred após a projeção por proj são copiados para o range que começa em out_true. Os demais elementos são copiados para o range que começa em out_false. O comportamento é indefinido se o range de entrada se sobrepuser a qualquer um dos ranges de saída.

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first, e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja: 

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer uma delas. 
  * Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>). 
  * Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, o [argument-dependent lookup](<#/doc/language/adl>) é inibido. 

### Parâmetros

first, last  |  \-  |  o range de entrada de elementos a serem copiados   
---|---|---
r  |  \-  |  o range de entrada de elementos a serem copiados   
out_true  |  \-  |  o início do range de saída para os elementos que satisfazem pred  
out_false  |  \-  |  o início do range de saída para os elementos que não satisfazem pred  
pred  |  \-  |  predicado a ser aplicado aos elementos projetados   
proj  |  \-  |  projeção a ser aplicada aos elementos   
  
### Valor de retorno

`{last, o1, o2}`, onde `o1` e `o2` são os finais dos ranges de saída, respectivamente, após a conclusão da cópia. 

### Complexidade

Exatamente [ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) aplicações do predicado correspondente comp e de qualquer projeção proj. 

### Possível implementação
```cpp
    struct partition_copy_fn
    {
        template<std::input_iterator I, std::sentinel_for<I> S,
                 std::weakly_incrementable O1, std::weakly_incrementable O2,
                 class Proj = std::identity, std::indirect_unary_predicate<
                 std::projected<I, Proj>> Pred>
        requires std::indirectly_copyable<I, O1> && std::indirectly_copyable<I, O2>
        constexpr ranges::partition_copy_result<I, O1, O2>
            operator()(I first, S last, O1 out_true, O2 out_false,
                       Pred pred, Proj proj = {}) const
        {
            for (; first != last; ++first)
                if (!!std::invoke(pred, std::invoke(proj, *first)))
                    *out_true = *first, ++out_true;
                else
                    *out_false = *first, ++out_false;
            return {std::move(first), std::move(out_true), std::move(out_false)};
        }
     
        template<ranges::input_range R,
                 std::weakly_incrementable O1, std::weakly_incrementable O2,
                 class Proj = std::identity,
                 std::indirect_unary_predicate<std::projected<iterator_t<R>, Proj>> Pred>
        requires std::indirectly_copyable<ranges::iterator_t<R>, O1> &&
                 std::indirectly_copyable<ranges::iterator_t<R>, O2>
        constexpr ranges::partition_copy_result<ranges::borrowed_iterator_t<R>, O1, O2>
            operator()(R&& r, O1 out_true, O2 out_false, Pred pred, Proj proj = {}) const
        {
            return (*this)(ranges::begin(r), ranges::end(r), std::move(out_true),
                           std::move(out_false), std::move(pred), std::move(proj));
        }
    };
     
    inline constexpr partition_copy_fn partition_copy {};
```
  
---  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cctype>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    int main()
    {
        const auto in = {'N', '3', 'U', 'M', '1', 'B', '4', 'E', '1', '5', 'R', '9'};
     
        std::vector<int> o1(size(in)), o2(size(in));
     
        auto pred =  { return std::isalpha(c); };
     
        auto ret = std::ranges::partition_copy(in, o1.begin(), o2.begin(), pred);
     
        std::ostream_iterator<char> cout {std::cout, " "};
        std::cout << "in = ";
        std::ranges::copy(in, cout);
        std::cout << "\no1 = ";
        std::copy(o1.begin(), ret.out1, cout);
        std::cout << "\no2 = ";
        std::copy(o2.begin(), ret.out2, cout);
        std::cout << '\n';
    }
```

Saída: 
```
    in = N 3 U M 1 B 4 E 1 5 R 9
    o1 = N U M B E R
    o2 = 3 1 4 1 5 9
```

### Veja também

[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos  
(objeto função de algoritmo)  
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos, preservando sua ordem relativa  
(objeto função de algoritmo)  
[ ranges::copyranges::copy_if](<#/doc/algorithm/ranges/copy>)(C++20)(C++20) | copia um range de elementos para um novo local  
(objeto função de algoritmo)  
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos, omitindo aqueles que satisfazem critérios específicos  
(objeto função de algoritmo)  
[ partition_copy](<#/doc/algorithm/partition_copy>)(C++11) | copia um range dividindo os elementos em dois grupos   
(modelo de função)