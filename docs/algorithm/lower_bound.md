# std::lower_bound

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class T >
ForwardIt lower_bound( ForwardIt first, ForwardIt last,
const T& value );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr ForwardIt lower_bound( ForwardIt first, ForwardIt last,
const T& value );
template< class ForwardIt, class T, class Compare >
ForwardIt lower_bound( ForwardIt first, ForwardIt last,
const T& value, Compare comp );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type,
class Compare >
constexpr ForwardIt lower_bound( ForwardIt first, ForwardIt last,
const T& value, Compare comp );
```

Procura pelo primeiro elemento no range particionado `[`first`, `last`)` que **não** está ordenado antes de value.

1) A ordem é determinada pelo operator<: Retorna o primeiro iterator iter em `[`first`, `last`)` onde bool(*iter < value) é falso, ou last se tal iter não existir. Se os elementos elem de `[`first`, `last`)` não estiverem [particionados](<#/doc/algorithm>) em relação à expressão bool(elem < value), o comportamento é indefinido. | (até C++20)
---|---
Equivalente a std::lower_bound(first, last, value, [std::less](<#/doc/utility/functional/less>){}). | (desde C++20)

2) A ordem é determinada por comp:

Retorna o primeiro iterator iter em `[`first`, `last`)` onde bool(comp(*iter, value)) é falso, ou last se tal iter não existir.

Se os elementos elem de `[`first`, `last`)` não estiverem [particionados](<#/doc/algorithm>) em relação à expressão bool(comp(elem, value)), o comportamento é indefinido.

### Parâmetros

- **first, last** — o range particionado de elementos a examinar
- **value** — valor para comparar os elementos
- **comp** — predicado binário que retorna ​true se o primeiro argumento está ordenado antes do segundo.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
O tipo Type1 deve ser tal que um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para Type1. O tipo Type2 deve ser tal que um objeto do tipo T possa ser implicitamente convertido para Type2. ​
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>). Não é exigido que satisfaça [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

Iterator para o primeiro elemento do range `[`first`, `last`)` não ordenado antes de value, ou last se nenhum tal elemento for encontrado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) No máximo \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1) comparações com value usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) No máximo \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+O(1) aplicações do comparador comp.

No entanto, se `ForwardIt` não for um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), o número de incrementos do iterator é linear em \\(\scriptsize N\\)N. Notavelmente, os iterators de [std::map](<#/doc/container/map>), [std::multimap](<#/doc/container/multimap>), [std::set](<#/doc/container/set>) e [std::multiset](<#/doc/container/multiset>) não são de acesso aleatório, e portanto suas funções membro lower_bound devem ser preferidas.

### Implementação possível

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algobase.h#L1023>) e [libc++](<https://github.com/llvm/llvm-project/blob/8350d9c23d76fb95f42674a1563cbe8c32582dd5/libcxx/include/__algorithm/lower_bound.h#L32>).

[lower_bound (1)](<#/doc/algorithm/lower_bound>)
---
```cpp
    template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type>
    ForwardIt lower_bound(ForwardIt first, ForwardIt last, const T& value)
    {
        return std::lower_bound(first, last, value, std::less{});
    }
```

[lower_bound (2)](<#/doc/algorithm/lower_bound>)
```cpp
    template<class ForwardIt, class T = typename std::iterator_traits<ForwardIt>::value_type,
             class Compare>
    ForwardIt lower_bound(ForwardIt first, ForwardIt last, const T& value, Compare comp)
    {
        ForwardIt it;
        typename std::iterator_traits<ForwardIt>::difference_type count, step;
        count = std::distance(first, last);
    
        while (count > 0)
        {
            it = first;
            step = count / 2;
            std::advance(it, step);
    
            if (comp(*it, value))
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

Embora `std::lower_bound` exija apenas que `[`first`, `last`)` seja particionado, este algoritmo é geralmente usado no caso em que `[`first`, `last`)` está ordenado, de modo que a busca binária seja válida para qualquer valor.

Ao contrário de [std::binary_search](<#/doc/algorithm/binary_search>), `std::lower_bound` não exige que operator< ou comp sejam assimétricos (ou seja, a < b e b < a sempre têm resultados diferentes). Na verdade, nem mesmo exige que value < *iter ou comp(value, *iter) sejam bem-formados para qualquer iterator iter em `[`first`, `last`)`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/lower_bound>))

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
    
        for (int i = 0; i < 8; ++i)
        {
            // Search for first element x such that i ≤ x
            auto lower = std::lower_bound(data.begin(), data.end(), i);
    
            std::cout << i << " ≤ ";
            lower != data.end()
                ? std::cout << *lower << " at index " << std::distance(data.begin(), lower)
                : std::cout << "not found";
            std::cout << '\n';
        }
    
        std::vector<PriceInfo> prices{{100.0}, {101.5}, {102.5}, {102.5}, {107.3}};
    
        for (const double to_find : {102.5, 110.2})
        {
            auto prc_info = std::lower_bound(prices.begin(), prices.end(), to_find,
                
                {
                    return info.price < value;
                });
    
            prc_info != prices.end()
                ? std::cout << prc_info->price << " at index " << prc_info - prices.begin()
                : std::cout << to_find << " not found";
            std::cout << '\n';
        }
    
        using CD = std::complex<double>;
        std::vector<CD> nums{{1, 0}, {2, 2}, {2, 1}, {3, 0}};
        auto cmpz =  { return x.real() < y.real(); };
        #ifdef __cpp_lib_algorithm_default_value_type
            auto it = std::lower_bound(nums.cbegin(), nums.cend(), {2, 0}, cmpz);
        #else
            auto it = std::lower_bound(nums.cbegin(), nums.cend(), CD{2, 0}, cmpz);
        #endif
        assert((*it == CD{2, 2}));
    }
```

Saída:
```
    0 ≤ 1 at index 0
    1 ≤ 1 at index 0
    2 ≤ 2 at index 1
    3 ≤ 4 at index 2
    4 ≤ 4 at index 2
    5 ≤ 5 at index 3
    6 ≤ 6 at index 5
    7 ≤ not found
    102.5 at index 2
    110.2 not found
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 270](<https://cplusplus.github.io/LWG/issue270>) | C++98 | `Compare` era exigido para satisfazer [Compare](<#/doc/named_req/Compare>) e `T` era exigido para ser [LessThanComparable](<#/doc/named_req/LessThanComparable>) (ordenação fraca estrita exigida) | apenas um particionamento é exigido; comparações heterogêneas permitidas
[LWG 384](<https://cplusplus.github.io/LWG/issue384>) | C++98 | no máximo \\(\scriptsize \log(N)+1\\)log(N)+1 comparações eram permitidas | corrigido para \\(\scriptsize \log_{2}(N)+O(1)\\)log2(N)+1
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | se qualquer iterator iter existir em `[`first`, `last`)` tal que bool(comp(*iter, value)) seja falso, `std::lower_bound` poderia retornar qualquer iterator em `[`iter`, `last`)` | nenhum iterator após iter pode ser retornado

### Veja também

[ equal_range](<#/doc/algorithm/equal_range>) | retorna um range de elementos que correspondem a uma chave específica
(modelo de função)
[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(modelo de função)
[ partition_point](<#/doc/algorithm/partition_point>)(C++11) | localiza o ponto de partição de um range particionado
(modelo de função)
[ upper_bound](<#/doc/algorithm/upper_bound>) | retorna um iterator para o primeiro elemento _maior_ que um certo valor
(modelo de função)
[ lower_bound](<#/doc/container/set/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública de `std::set<Key,Compare,Allocator>`)
[ lower_bound](<#/doc/container/multiset/lower_bound>) | retorna um iterator para o primeiro elemento _não menor_ que a chave fornecida
(função membro pública de `std::multiset<Key,Compare,Allocator>`)
[ ranges::lower_bound](<#/doc/algorithm/ranges/lower_bound>)(C++20) | retorna um iterator para o primeiro elemento _não menor_ que o valor fornecido
(objeto de função de algoritmo)