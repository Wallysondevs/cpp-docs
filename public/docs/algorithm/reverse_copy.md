# std::reverse_copy

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt, class OutputIt >
OutputIt reverse_copy( BidirIt first, BidirIt last,
OutputIt d_first );
template< class ExecutionPolicy, class BidirIt, class ForwardIt >
ForwardIt reverse_copy( ExecutionPolicy&& policy,
BidirIt first, BidirIt last,
ForwardIt d_first );
```

1) Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last). Copia os elementos do range `[`first`, `last`)` (range de origem) para outro range de \\(\scriptsize N\\)N elementos começando em d_first (range de destino) de tal forma que os elementos no range de destino estejam em ordem inversa.

Comporta-se como se executasse a atribuição *(d_first + N - 1 - i) = *(first + i)[1](<#/doc/algorithm/reverse_copy>) uma vez para cada inteiro i em `[`​0​`, `N`)`.

Se os ranges de origem e destino se sobrepuserem, o comportamento é indefinido.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a copiar
- **d_first** — o início do range de destino
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Output iterator para o elemento após o último elemento copiado.

### Complexidade

Exatamente \\(\scriptsize N\\)N atribuições.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1170-L1190>), [libc++](<https://github.com/llvm/llvm-project/tree/134723edd5bf06ff6ec8aca7b87c56e5bd70ccae/libcxx/include/__algorithm/reverse_copy.h>), e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4184-L4229>).
```cpp
    template<class BidirIt, class OutputIt>
    constexpr // since C++20
    OutputIt reverse_copy(BidirIt first, BidirIt last, OutputIt d_first)
    {
        for (; first != last; ++d_first)
            *d_first = *(--last);
        return d_first;
    }
```

---

### Notas

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando ambos os tipos de iterator satisfazem [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) e possuem o mesmo tipo de valor, e o tipo de valor é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        auto print = <int>& v)
        {
            for (const auto& value : v)
                std::cout << value << ' ';
            std::cout << '\n';
        };
    
        std::vector<int> v{1, 2, 3};
        print(v);
    
        std::vector<int> destination(3);
        std::reverse_copy(std::begin(v), std::end(v), std::begin(destination));
        print(destination);
    
        std::reverse_copy(std::rbegin(v), std::rend(v), std::begin(destination));
        print(destination);
    }
```

Saída:
```
    1 2 3 
    3 2 1 
    1 2 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[LWG 2074](<https://cplusplus.github.io/LWG/issue2074>) | C++98 | para cada i, a atribuição era
*(d_first + N - i) = *(first + i)[1](<#/doc/algorithm/reverse_copy>) | corrigido para
*(d_first + N - 1 - i) = *(first + i)[1](<#/doc/algorithm/reverse_copy>)
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | apenas um elemento era exigido para ser atribuído | corrigido o requisito

1. ↑ [1.0](<#/doc/algorithm/reverse_copy>) [1.1](<#/doc/algorithm/reverse_copy>) [1.2](<#/doc/algorithm/reverse_copy>) [LegacyOutputIterator](<#/doc/named_req/OutputIterator>) não é obrigado a suportar `+` e `-` binários. Os usos de `+` e `-` aqui são apenas para exposição: o cálculo real não precisa usá-los.

### Veja também

[ reverse](<#/doc/algorithm/reverse>) | inverte a ordem dos elementos em um range
(modelo de função)
[ ranges::reverse_copy](<#/doc/algorithm/ranges/reverse_copy>)(C++20) | cria uma cópia de um range que está invertido
(objeto de função de algoritmo)