Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
template< class InputIt, class OutputIt1,
class OutputIt2, class UnaryPred >
std::pair<OutputIt1, OutputIt2>
partition_copy( InputIt first, InputIt last,
OutputIt1 d_first_true, OutputIt2 d_first_false,
UnaryPred p );  // (1) (desde C++11)
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2,
class ForwardIt3, class UnaryPred >
std::pair<ForwardIt2, ForwardIt3>
partition_copy( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first_true, ForwardIt3 d_first_false,
UnaryPred p );  // (2) (desde C++17)
```

1) Copia os elementos do range `[`first`, `last`)` para dois ranges diferentes, dependendo do valor retornado pelo predicado p.

  * Os elementos que satisfazem o predicado p são copiados para o range que começa em d_first_true.
  * Os demais elementos são copiados para o range que começa em d_first_false.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se *first não for [gravável](<#/doc/iterator>) para d_first_true ou d_first_false, o programa é malformado.

Entre o range de entrada e os dois ranges de saída, se quaisquer dois ranges se sobrepuserem, o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos a serem copiados
- **d_first_true** — o início do range de saída para os elementos que satisfazem p
- **d_first_false** — o início do range de saída para os elementos que não satisfazem p
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna ​true se o elemento deve ser colocado em d_first_true.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro de VT& não é permitido, nem VT a menos que para `VT` um move seja equivalente a uma cópia (desde C++11). ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt1, OutputIt2` devem satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2, ForwardIt3` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

Um [std::pair](<#/doc/utility/pair>) construído a partir do iterator para o final do range d_first_true e do iterator para o final do range d_first_false.

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) aplicações de p.

Para a sobrecarga (2), pode haver um custo de desempenho se o tipo de valor de `ForwardIt` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[partition_copy (1)](<#/doc/algorithm/partition_copy>)
---
```cpp
    template<class InputIt, class OutputIt1,
             class OutputIt2, class UnaryPred>
    constexpr //< desde C++20
    std::pair<OutputIt1, OutputIt2>
        partition_copy(InputIt first, InputIt last,
                       OutputIt1 d_first_true, OutputIt2 d_first_false,
                       UnaryPred p)
    {
        for (; first != last; ++first)
        {
            if (p(*first))
            {
                *d_first_true = *first;
                ++d_first_true;
            }
            else
            {
                *d_first_false = *first;
                ++d_first_false;
            }
        }
    
        return std::pair<OutputIt1, OutputIt2>(d_first_true, d_first_false);
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <utility>
    
    void print(auto rem, const auto& v)
    {
        for (std::cout << rem; const auto& x : v)
            std::cout << x << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        int arr[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        int true_arr[5] = {0};
        int false_arr[5] = {0};
    
        std::partition_copy(std::begin(arr), std::end(arr),
                            std::begin(true_arr), std::begin(false_arr),
                             { return 4 < i; });
    
        print("true_arr:  ", true_arr);
        print("false_arr: ", false_arr);
    }
```

Saída:
```
    true_arr:  5 6 7 8 9
    false_arr: 0 1 2 3 4
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---
[P0896R4](<https://wg21.link/P0896R4>) | C++11  
C++17 | 1. o tipo de valor de `InputIt` (C++11)/`ForwardIt1` (C++17)  
era exigido ser [CopyAssignable](<#/doc/named_req/CopyAssignable>)  
2. os dois ranges de saída podiam se sobrepor | 1. não exigido  
2. o comportamento é  
indefinido neste caso  

### Veja também

[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(function template)
[ stable_partition](<#/doc/algorithm/stable_partition>) | divide elementos em dois grupos preservando sua ordem relativa
(function template)
[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(function template)
[ remove_copyremove_copy_if](<#/doc/algorithm/remove_copy>) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(function template)
[ ranges::partition_copy](<#/doc/algorithm/ranges/partition_copy>)(C++20) | copia um range dividindo os elementos em dois grupos
(algorithm function object)