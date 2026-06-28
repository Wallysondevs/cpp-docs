# std::rotate_copy

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class OutputIt >
OutputIt rotate_copy( ForwardIt first, ForwardIt n_first,
ForwardIt last, OutputIt d_first );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2 >
ForwardIt2 rotate_copy( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 n_first,
ForwardIt1 last, ForwardIt2 d_first );
```

1) Copia os elementos do range `[`first`, `last`)`, para outro range começando em d_first de tal forma que o elemento *(n_first) se torna o primeiro elemento do novo range e *(n_first - 1) se torna o último elemento.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * `[`first`, `n_first`)` ou `[`n_first`, `last`)` não é um [range válido](<#/doc/iterator>).
  * Os ranges de origem e destino se sobrepõem.

### Parâmetros

- **first, last** — o range de elementos a copiar
- **n_first** — um iterator para um elemento em `[`first`, `last`)` que deve aparecer no início do novo range
- **d_first** — início do range de destino
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`ForwardIt, ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

### Valor de retorno

Output iterator para o elemento após o último elemento copiado.

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) atribuições.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1440-L1455>), [libc++](<https://github.com/llvm/llvm-project/tree/f221d905b131158cbe3cbc4320d1ecd1376c3f22/libcxx/include/__algorithm/rotate_copy.h>), e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4438-L4459>).
```
    template<class ForwardIt, class OutputIt>
    constexpr // since C++20
    OutputIt rotate_copy(ForwardIt first, ForwardIt n_first,
                         ForwardIt last, OutputIt d_first)
    {
        d_first = std::copy(n_first, last, d_first);
        return std::copy(first, n_first, d_first);
    }
```

---

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    int main()
    {
        std::vector<int> src{1, 2, 3, 4, 5};
        std::vector<int> dest(src.size());
        auto pivot = std::find(src.begin(), src.end(), 3);
     
        std::rotate_copy(src.begin(), pivot, src.end(), dest.begin());
        for (int i : dest)
            std::cout << i << ' ';
        std::cout << '\n';
     
        // copy the rotation result directly to the std::cout
        pivot = std::find(dest.begin(), dest.end(), 1);
        std::rotate_copy(dest.begin(), pivot, dest.end(),
                         std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    }
```

Output:
```
    3 4 5 1 2
    1 2 3 4 5
```

### Veja também

[ rotate](<#/doc/algorithm/rotate>) | rotaciona a ordem dos elementos em um range
(modelo de função)
[ ranges::rotate_copy](<#/doc/algorithm/ranges/rotate_copy>)(C++20) | copia e rotaciona um range de elementos
(objeto de função de algoritmo)