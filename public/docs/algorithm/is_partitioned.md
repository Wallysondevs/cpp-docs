# std::is_partitioned

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class UnaryPred >
bool is_partitioned( InputIt first, InputIt last, UnaryPred p );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
bool is_partitioned( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
```

1) Verifica se `[`first`, `last`)` está particionado pelo predicado p: todos os elementos que satisfazem p aparecem antes de todos os elementos que não satisfazem.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a verificar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna true para os elementos esperados no início do range.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro VT& não é permitido, nem VT a menos que para `VT` um move seja equivalente a uma cópia (desde C++11).
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>). e seu tipo de valor deve ser conversível para o tipo de parâmetro de `UnaryPred`.
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

true se os elementos e de `[`first`, `last`)` estiverem [particionados](<#/doc/algorithm>) em relação à expressão p(e). false caso contrário.

### Complexidade

No máximo [std::distance](<#/doc/iterator/distance>)(first, last) aplicações de p.

### Exceções

A sobrecarga com um parâmetro de template nomeado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação
```cpp
    template<class InputIt, class UnaryPred>
    bool is_partitioned(InputIt first, InputIt last, UnaryPred p)
    {
        for (; first != last; ++first)
            if (!p(*first))
                break;
        for (; first != last; ++first)
            if (p(*first))
                return false;
        return true;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    
    int main()
    {
        std::array<int, 9> v {1, 2, 3, 4, 5, 6, 7, 8, 9};
    
        auto is_even =  { return i % 2 == 0; };
        std::cout.setf(std::ios_base::boolalpha);
        std::cout << std::is_partitioned(v.begin(), v.end(), is_even) << ' ';
    
        std::partition(v.begin(), v.end(), is_even);
        std::cout << std::is_partitioned(v.begin(), v.end(), is_even) << ' ';
    
        std::reverse(v.begin(), v.end());
        std::cout << std::is_partitioned(v.cbegin(), v.cend(), is_even) << ' ';
        std::cout << std::is_partitioned(v.crbegin(), v.crend(), is_even) << '\n';
    }
```

Saída:
```
    false true false true
```

### Veja também

[ partition](<#/doc/algorithm/partition>) | divide um range de elementos em dois grupos
(modelo de função)
[ partition_point](<#/doc/algorithm/partition_point>)(C++11) | localiza o ponto de partição de um range particionado
(modelo de função)
[ ranges::is_partitioned](<#/doc/algorithm/ranges/is_partitioned>)(C++20) | determina se o range está particionado pelo predicado fornecido
(objeto de função de algoritmo)