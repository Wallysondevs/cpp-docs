# std::stable_partition

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt, class UnaryPred >
BidirIt stable_partition( BidirIt first, BidirIt last, UnaryPred p );
template< class ExecutionPolicy, class BidirIt, class UnaryPred >
BidirIt stable_partition( ExecutionPolicy&& policy,
BidirIt first, BidirIt last, UnaryPred p );
```

1) Reordena os elementos no range `[`first`, `last`)` de tal forma que todos os elementos para os quais o predicado p retorna true precedem os elementos para os quais o predicado p retorna false. A ordem relativa dos elementos é preservada.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * O tipo de *first não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

  * `BidirIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de *first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de *first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first, last** — o range de elementos a serem reordenados
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna true se o elemento deve ser ordenado antes de outros elementos.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `BidirIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro de VT& não é permitido, nem VT a menos que para `VT` um move seja equivalente a uma cópia (desde C++11).
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

Iterator para o primeiro elemento do segundo grupo.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) Exatamente \\(\scriptsize N\\)N aplicações de p.

\\(\scriptsize O(N)\\)O(N) swaps se houver memória extra suficiente, caso contrário, no máximo \\(\scriptsize N \cdot log_{2}(N)\\)N⋅log2(N) swaps.

2) \\(\scriptsize O(N)\\)O(N) aplicações de p.

\\(\scriptsize N \cdot log(N)\\)N⋅log(N) swaps.

### Exceções

A sobrecarga com um parâmetro de template nomeado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lança uma exceção e `ExecutionPolicy` é uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Esta função tenta alocar um buffer temporário. Se a alocação falhar, o algoritmo menos eficiente é escolhido.

Implementações em [libc++](<https://github.com/llvm/llvm-project/blob/eda14ebf6a43d9ada6a2be3d1b06b8b6036eb774/libcxx/include/__algorithm/stable_partition.h#L316>) e [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d2a499a9881c7c079d2a722b57c7fcf022a864dd/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1608>) também aceitam ranges denotados por [LegacyForwardIterators](<#/doc/named_req/ForwardIterator>) como uma extensão.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_algorithms`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | ordenação estável constexpr ([1](<#/doc/algorithm/stable_partition>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{0, 0, 3, -1, 2, 4, 5, 0, 7};
        std::stable_partition(v.begin(), v.end(),  { return n > 0; });
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    3 2 4 5 7 0 0 -1 0
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | `std::stable_partition` era apenas exigido para colocar um elemento satisfazendo p antes de um elemento não satisfazendo p | corrigiu o requisito

### Veja também

[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(function template)
[ ranges::stable_partition](<#/doc/algorithm/ranges/stable_partition>)(C++20) | divide elementos em dois grupos enquanto preserva sua ordem relativa
(algorithm function object)