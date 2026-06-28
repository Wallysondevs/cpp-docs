# std::merge

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
template< class InputIt1, class InputIt2, class OutputIt >
OutputIt merge( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2,
OutputIt d_first );  // (1)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class ForwardIt3 >
ForwardIt3 merge( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
ForwardIt3 d_first );  // (2) (desde C++17)
template< class InputIt1, class InputIt2,
class OutputIt, class Compare >
OutputIt merge( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2,
OutputIt d_first, Compare comp );  // (3)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class ForwardIt3, class Compare >
ForwardIt3 merge( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
ForwardIt3 d_first, Compare comp );  // (4) (desde C++17)
```

Mescla dois ranges ordenados `[`first1`, `last1`)` e `[`first2`, `last2`)` em um único range ordenado começando em d_first.

1) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver [ordenado](<#/doc/algorithm>) em relação ao operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20), o comportamento é indefinido.

3) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver ordenado em relação a comp, o comportamento é indefinido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (ate C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Esta função merge é estável, o que significa que para elementos equivalentes nos dois ranges originais, os elementos do primeiro range (preservando sua ordem original) precedem os elementos do segundo range (preservando sua ordem original).

Se o range de saída se sobrepuser com `[`first1`, `last1`)` ou `[`first2`, `last2`)`, o comportamento é indefinido.

### Parameters

- **first1, last1** — o primeiro range de elementos a serem mesclados
- **first2, last2** — o segundo range de elementos a serem mesclados
- **d_first** — o início do range de destino
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna ​true se o primeiro argumento for _menor_ que (ou seja, for ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que objetos dos tipos InputIt1 e InputIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2. ​
Requisitos de tipo
-`InputIt1, InputIt2` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt1, ForwardIt2, ForwardIt3` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Return value

Um output iterator para o elemento após o último elemento copiado.

### Complexity

Dado \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1) No máximo \\(\scriptsize N_1+N_2-1\\)N1+N2-1 comparações usando operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

2) \\(\scriptsize O(N_1+N_2)\\)O(N1+N2) comparações usando operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) No máximo \\(\scriptsize N_1+N_2-1\\)N1+N2-1 aplicações da função de comparação comp.

4) \\(\scriptsize O(N_1+N_2)\\)O(N1+N2) aplicações da função de comparação comp.

### Exceptions

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possible implementation

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L4856>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L4348>).

[merge (1)](<#/doc/algorithm/merge>)
---
```cpp
    template<class InputIt1, class InputIt2, class OutputIt>
    OutputIt merge(InputIt1 first1, InputIt1 last1,
                   InputIt2 first2, InputIt2 last2,
                   OutputIt d_first)
    {
        for (; first1 != last1; ++d_first)
        {
            if (first2 == last2)
                return std::copy(first1, last1, d_first);
    
            if (*first2 < *first1)
            {
                *d_first = *first2;
                ++first2;
            }
            else
            {
                *d_first = *first1;
                ++first1;
            }
        }
        return std::copy(first2, last2, d_first);
    }
```

[merge (3)](<#/doc/algorithm/merge>)
```cpp
    template<class InputIt1, class InputIt2,
             class OutputIt, class Compare>
    OutputIt merge(InputIt1 first1, InputIt1 last1,
                   InputIt2 first2, InputIt2 last2,
                   OutputIt d_first, Compare comp)
    {
        for (; first1 != last1; ++d_first)
        {
            if (first2 == last2)
                return std::copy(first1, last1, d_first);
    
            if (comp(*first2, *first1))
            {
                *d_first = *first2;
                ++first2;
            }
            else
            {
                *d_first = *first1;
                ++first1;
            }
        }
        return std::copy(first2, last2, d_first);
    }
```

### Notes

Este algoritmo executa uma tarefa semelhante à de [std::set_union](<#/doc/algorithm/set_union>). Ambos consomem dois ranges de entrada ordenados e produzem uma saída ordenada com elementos de ambas as entradas. A diferença entre esses dois algoritmos está no tratamento de valores de ambos os ranges de entrada que se comparam como equivalentes (veja as notas sobre [LessThanComparable](<#/doc/named_req/LessThanComparable>)). Se quaisquer valores equivalentes apareceram n vezes no primeiro range e m vezes no segundo, `std::merge` produziria todas as n + m ocorrências, enquanto `std::set_union` produziria apenas [std::max](<#/doc/algorithm/max>)(n, m) delas. Assim, `std::merge` produz exatamente [std::distance](<#/doc/iterator/distance>)(first1, last1) + [std::distance](<#/doc/iterator/distance>)(first2, last2) valores e `std::set_union` pode produzir menos.

### Example

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <random>
    #include <vector>
    
    auto print = 
    {
        std::cout << rem;
        std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    };
    
    int main()
    {
        // fill the vectors with random numbers
        std::random_device rd;
        std::mt19937 mt(rd());
        std::uniform_int_distribution<> dis(0, 9);
    
        std::vector<int> v1(10), v2(10);
        std::generate(v1.begin(), v1.end(), std::bind(dis, std::ref(mt)));
        std::generate(v2.begin(), v2.end(), std::bind(dis, std::ref(mt)));
    
        print("Originally:\nv1: ", v1);
        print("v2: ", v2);
    
        std::sort(v1.begin(), v1.end());
        std::sort(v2.begin(), v2.end());
    
        print("After sorting:\nv1: ", v1);
        print("v2: ", v2);
    
        // merge
        std::vector<int> dst;
        std::merge(v1.begin(), v1.end(), v2.begin(), v2.end(), std::back_inserter(dst));
    
        print("After merging:\ndst: ", dst);
    }
```

Saída possível:
```
    Originally:
    v1: 2 6 5 7 4 2 2 6 7 0
    v2: 8 3 2 5 0 1 9 6 5 0
    After sorting:
    v1: 0 2 2 2 4 5 6 6 7 7
    v2: 0 0 1 2 3 5 5 6 8 9
    After merging:
    dst: 0 0 0 1 2 2 2 2 3 4 5 5 5 6 6 6 7 7 8 9
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 780](<https://cplusplus.github.io/LWG/issue780>) | C++98 | a operação merge não era definida | definida

### See also

[ inplace_merge](<#/doc/algorithm/inplace_merge>) | mescla dois ranges ordenados no local
(function template)
[ is_sorted](<#/doc/algorithm/is_sorted>)(desde C++11) | verifica se um range está ordenado em ordem crescente
(function template)
[ set_union](<#/doc/algorithm/set_union>) | calcula a união de dois conjuntos
(function template)
[ sort](<#/doc/algorithm/sort>) | ordena um range em ordem crescente
(function template)
[ stable_sort](<#/doc/algorithm/stable_sort>) | ordena um range de elementos preservando a ordem entre elementos iguais
(function template)
[ ranges::merge](<#/doc/algorithm/ranges/merge>)(desde C++20) | mescla dois ranges ordenados
(algorithm function object)