# std::upper_bound

```cpp
Definido no header `<algorithm>`
  // (1)
template< class ForwardIt, class T >
ForwardIt upper_bound( ForwardIt first, ForwardIt last,
const T& value ); | | (constexpr desde C++20)
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr ForwardIt upper_bound( ForwardIt first, ForwardIt last,
const T& value );  // (desde C++26)
  // (2)
template< class ForwardIt, class T, class Compare >
ForwardIt upper_bound( ForwardIt first, ForwardIt last,
const T& value, Compare comp ); | | (constexpr desde C++20)
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type,
class Compare >
constexpr ForwardIt upper_bound( ForwardIt first, ForwardIt last,
const T& value, Compare comp );  // (desde C++26)
```

Procura pelo primeiro elemento no range particionado `[`first`, `last`)` que é ordenado após `value`.

1) A ordem é determinada pelo operator<: Retorna o primeiro iterator iter em `[`first`, `last`)` onde bool(value < *iter) é true, ou last se tal iter não existir. Se os elementos elem de `[`first`, `last`)` não estiverem [particionados](<#/doc/algorithm>) em relação à expressão bool(value < elem), o comportamento é indefinido. | (até C++20)
---|---
Equivalente a std::upper_bound(first, last, value, [std::less](<#/doc/utility/functional/less>){}). | (desde C++20)

2) A ordem é determinada por comp:

Retorna o primeiro iterator iter em `[`first`, `last`)` onde bool(comp(value, *iter)) é true, ou last se tal iter não existir.

Se os elementos elem de `[`first`, `last`)` não estiverem [particionados](<#/doc/algorithm>) em relação à expressão bool(comp(value, elem)), o comportamento é indefinido.

### Parâmetros

- **first, last** — o range particionado de elementos a examinar
- **value** — valor para comparar os elementos
- **comp** — predicado binário que retorna true se o primeiro argumento for ordenado antes do segundo.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
O tipo Type1 deve ser tal que um objeto do tipo T possa ser implicitamente convertido para Type1. O tipo Type2 deve ser tal que um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para Type2. ​
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>). Não é exigido que satisfaça [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

Iterator para o primeiro elemento do range `[`first`, `last`)` ordenado após `value`, ou last se nenhum elemento for encontrado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) No máximo \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1) comparações com `value` usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) No máximo \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1) aplicações do comparador `comp`.

No entanto, se `ForwardIt` não for um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), o número de incrementos do iterator é linear em \\(\scriptsize N\\)N. Notavelmente, os iterators de [std::map](<#/doc/container/map>), [std::multimap](<#/doc/container/multimap>), [std::set](<#/doc/container/set>) e [std::multiset](<#/doc/container/multiset>) não são de acesso aleatório, e portanto suas funções membro `upper_bound` devem ser preferidas.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L2028>) e [libc++](<https://github.com/llvm/llvm-project/blob/8350d9c23d76fb95f42674a1563cbe8c32582dd5/libcxx/include/__algorithm/upper_bound.h#L35>).

[upper_bound (1)](<#/doc/algorithm/upper_bound>)
---
```cpp
    template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type>
    ForwardIt upper_bound(ForwardIt first, ForwardIt last, const T& value)
    {
        return std::upper_bound(first, last, value, std::less{});
    }
```

[upper_bound (2)](<#/doc/algorithm/upper_bound>)
```cpp
    template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type,
             class Compare>
    ForwardIt upper_bound(ForwardIt first, ForwardIt last, const T& value, Compare comp)
    {
        ForwardIt it;
        typename std::iterator_traits<ForwardIt>::difference_type count, step;
        count = std::distance(first, last);
    
        while (count > 0)
        {
            it = first; 
            step = count / 2;
            std::advance(it, step);
    
            if (!comp(value, *it))
            {
                first = ++it;
                count -= step + 1;
            } 
            else
                count = step;
        }
    
        return first;
    }
```

### Notas

Embora `std::upper_bound` exija apenas que `[`first`, `last`)` seja particionado, este algoritmo é geralmente usado no caso em que `[`first`, `last`)` está ordenado, de modo que a busca binária seja válida para qualquer valor.

Para qualquer iterator iter em `[`first`, `last`)`, `std::upper_bound` exige que value < *iter e comp(value, *iter) sejam bem-formados, enquanto [std::lower_bound](<#/doc/algorithm/lower_bound>) exige que *iter < value e comp(*iter, value) sejam bem-formados.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/utility/feature_test>) | [`202403`](<#/>) | (C++26) | Inicialização por lista para algoritmos ([1,2](<#/doc/algorithm/upper_bound>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    struct PriceInfo { double price; };
    
    int main()
    {
        const std::vector<int> data{1, 2, 4, 5, 5, 6};
    
        for (int i = 0; i < 7; ++i)
        {
            // Search first element that is greater than i
            auto upper = std::upper_bound(data.begin(), data.end(), i);
    
            std::cout << i << " < ";
            upper != data.end()
                ? std::cout << *upper << " at index " << std::distance(data.begin(), upper)
                : std::cout << "not found";
            std::cout << '\n';
        }
    
        std::vector<PriceInfo> prices{{100.0}, {101.5}, {102.5}, {102.5}, {107.3}};
    
        for (double to_find : {102.5, 110.2})
        {
            auto prc_info = std::upper_bound(prices.begin(), prices.end(), to_find,
                
                {
                    return value < info.price;
                });
    
            prc_info != prices.end()
                ? std::cout << prc_info->price << " at index " << prc_info - prices.begin()
                : std::cout << to_find << " not found";
            std::cout << '\n';
        }
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}, {3, 1}};
        auto cmpz =  { return x.real() < y.real(); };
        #ifdef __cpp_lib_algorithm_default_value_type
            auto it = std::upper_bound(nums.cbegin(), nums.cend(), {2, 0}, cmpz);
        #else
            auto it = std::upper_bound(nums.cbegin(), nums.cend(), CD{2, 0}, cmpz);
        #endif
        assert((*it == CD{3, 0}));
    }
```

Saída:
```
    0 < 1 at index 0
    1 < 2 at index 1
    2 < 4 at index 2
    3 < 4 at index 2
    4 < 5 at index 3
    5 < 6 at index 5
    6 < not found 
    107.3 at index 4
    110.2 not found
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 270](<https://cplusplus.github.io/LWG/issue270>) | C++98 | `Compare` era exigido para satisfazer [Compare](<#/doc/named_req/Compare>) e `T` era exigido para ser [LessThanComparable](<#/doc/named_req/LessThanComparable>) (ordenação fraca estrita exigida) | apenas um particionamento é exigido; comparações heterogêneas permitidas
[LWG 384](<https://cplusplus.github.io/LWG/issue384>) | C++98 | no máximo \\(\scriptsize \log(N)+1\\)log2(N)+1 comparações eram permitidas | corrigido para \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1)
[LWG 577](<https://cplusplus.github.io/LWG/issue577>) | C++98 | last não podia ser retornado | permitido
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | se qualquer iterator iter existir em `[`first`, `last`)` tal que bool(comp(value, *iter)) seja true, `std::upper_bound` poderia retornar qualquer iterator em `[`iter`, `last`)` | nenhum iterator após iter pode ser retornado

### Veja também

[ equal_range](<#/doc/algorithm/equal_range>) | retorna o range de elementos que correspondem a uma chave específica
---|---
(function template) |
[ lower_bound](<#/doc/algorithm/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que o valor dado
(function template)
[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(function template)
[ partition_point](<#/doc/algorithm/partition_point>)(C++11) | localiza o ponto de partição de um range particionado
(function template)
[ ranges::upper_bound](<#/doc/algorithm/ranges/upper_bound>)(C++20) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(algorithm function object)
[ upper_bound](<#/doc/container/set/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave dada
(função membro pública de `std::set<Key,Compare,Allocator>`)
[ upper_bound](<#/doc/container/multiset/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que a chave dada
(função membro pública de `std::multiset<Key,Compare,Allocator>`)