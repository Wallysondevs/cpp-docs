# std::swap_ranges

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt1, class ForwardIt2 >
ForwardIt2 swap_ranges( ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2 );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2 >
ForwardIt2 swap_ranges( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2 );
```

1) Troca elementos entre o range `[`first1`, `last1`)` e outro range de [std::distance](<#/doc/iterator/distance>)(first1, last1) elementos começando em first2.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * Os dois ranges se sobrepõem.
  * Existe um par de iterators correspondentes iter1 e iter2 nos dois ranges tal que *iter1 não é [Swappable](<#/doc/named_req/Swappable>) com *iter2.

### Parâmetros

- **first1, last1** — o primeiro range de elementos a serem trocados
- **first2** — início do segundo range de elementos a serem trocados
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator para o elemento após o último elemento trocado no range que começa com first2.

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first1, last1) trocas.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lança uma exceção e `ExecutionPolicy` é uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falha ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator satisfaz [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Possível implementação
```cpp
    template<class ForwardIt1, class ForwardIt2>
    constexpr //< desde C++20
    ForwardIt2 swap_ranges(ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2)
    {
        for (; first1 != last1; ++first1, ++first2)
            std::iter_swap(first1, first2);
    
        return first2;
    }
```

---

### Exemplo

Demonstra a troca de subranges de diferentes containers.

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <list>
    #include <vector>
    
    auto print = 
    {
        std::cout << comment;
        for (const auto& e : seq)
            std::cout << e << ' ';
        std::cout << '\n';
    };
    
    int main()
    {
        std::vector<char> v{'a', 'b', 'c', 'd', 'e'};
        std::list<char> l{'1', '2', '3', '4', '5'};
    
        print("Before swap_ranges:\n" "v: ", v);
        print("l: ", l);
    
        std::swap_ranges(v.begin(), v.begin() + 3, l.begin());
    
        print("After swap_ranges:\n" "v: ", v);
        print("l: ", l);
    }
```

Saída:
```
    Before swap_ranges:
    v: a b c d e
    l: 1 2 3 4 5
    After swap_ranges:
    v: 1 2 3 d e
    l: a b c 4 5
```

### Veja também

[ iter_swap](<#/doc/algorithm/iter_swap>) | troca os elementos apontados por dois iterators
(modelo de função)
[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)
[ ranges::swap_ranges](<#/doc/algorithm/ranges/swap_ranges>)(C++20) | troca dois ranges de elementos
(objeto de função de algoritmo)