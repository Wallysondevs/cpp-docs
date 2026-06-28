# std::partition

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class UnaryPred >
ForwardIt partition( ForwardIt first, ForwardIt last, UnaryPred p );
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
ForwardIt partition( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
```

1) Reordena os elementos no range `[`first`, `last`)` de tal forma que todos os elementos para os quais o predicado p retorna true precedem todos os elementos para os quais o predicado p retorna false. A ordem relativa dos elementos não é preservada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se o tipo de *first não for [Swappable](<#/doc/named_req/Swappable>)(até C++11)`ForwardIt` não for [ValueSwappable](<#/doc/named_req/ValueSwappable>)(desde C++11), o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos a serem reordenados
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna true se o elemento deve ser ordenado antes de outros elementos.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `ForwardIt`, independentemente da [value category](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro de VT& não é permitido, nem VT a menos que para `VT` um move seja equivalente a uma cópia (desde C++11).
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

Iterator para o primeiro elemento do segundo grupo.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) Exatamente \\(\scriptsize N\\)N aplicações de p.

No máximo \\(\scriptsize N/2\\)N/2 trocas se `ForwardIt` satisfaz os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), e no máximo \\(\scriptsize N\\)N trocas caso contrário.

2) \\(\scriptsize O(N)\\)O(N) aplicações de p.

\\(\scriptsize O(N \cdot log(N))\\)O(N·log(N)) trocas.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Implementa a sobrecarga (1) preservando a compatibilidade com C++11.
```cpp
    template<class ForwardIt, class UnaryPred>
    ForwardIt partition(ForwardIt first, ForwardIt last, UnaryPred p)
    {
        first = std::find_if_not(first, last, p);
        if (first == last)
            return first;
    
        for (auto i = std::next(first); i != last; ++i)
            if (p(*i))
            {
                std::iter_swap(i, first);
                ++first;
            }
    
        return first;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <forward_list>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    template<class ForwardIt>
    void quicksort(ForwardIt first, ForwardIt last)
    {
        if (first == last)
            return;
    
        auto pivot = *std::next(first, std::distance(first, last) / 2);
        auto middle1 = std::partition(first, last, pivot
        {
            return em < pivot;
        });
        auto middle2 = std::partition(middle1, last, pivot
        {
            return !(pivot < em);
        });
    
        quicksort(first, middle1);
        quicksort(middle2, last);
    }
    
    int main()
    {
        std::vector<int> v{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        std::cout << "Original vector: ";
        for (int elem : v)
            std::cout << elem << ' ';
    
        auto it = std::partition(v.begin(), v.end(),  {return i % 2 == 0;});
    
        std::cout << "\nPartitioned vector: ";
        std::copy(std::begin(v), it, std::ostream_iterator<int>(std::cout, " "));
        std::cout << "* ";
        std::copy(it, std::end(v), std::ostream_iterator<int>(std::cout, " "));
    
        std::forward_list<int> fl {1, 30, -4, 3, 5, -4, 1, 6, -8, 2, -5, 64, 1, 92};
        std::cout << "\nUnsorted list: ";
        for (int n : fl)
            std::cout << n << ' ';
    
        quicksort(std::begin(fl), std::end(fl));
        std::cout << "\nSorted using quicksort: ";
        for (int fi : fl)
            std::cout << fi << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    Original vector: 0 1 2 3 4 5 6 7 8 9 
    Partitioned vector: 0 8 2 6 4 * 5 3 7 1 9 
    Unsorted list: 1 30 -4 3 5 -4 1 6 -8 2 -5 64 1 92 
    Sorted using quicksort: -8 -5 -4 -4 1 1 1 2 3 5 6 30 64 92
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 498](<https://cplusplus.github.io/LWG/issue498>) | C++98 | `std::partition` exigia que first e last fossem [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) | apenas exigia que fossem [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>)
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | `std::partition` era apenas exigido para colocar um elemento que satisfazia p antes de um elemento que não satisfazia p | corrigiu o requisito

### Veja também

[ is_partitioned](<#/doc/algorithm/is_partitioned>)(C++11) | determina se o range é particionado pelo predicado fornecido (function template)
---|---
[ stable_partition](<#/doc/algorithm/stable_partition>) | divide elementos em dois grupos enquanto preserva sua ordem relativa (function template)
[ ranges::partition](<#/doc/algorithm/ranges/partition>)(C++20) | divide um range de elementos em dois grupos (algorithm function object)