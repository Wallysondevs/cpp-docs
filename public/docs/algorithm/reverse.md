# std::reverse

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class BidirIt >
void reverse( BidirIt first, BidirIt last );
template< class ExecutionPolicy, class BidirIt >
void reverse( ExecutionPolicy&& policy, BidirIt first, BidirIt last );
```

1) Inverte a ordem dos elementos no range `[`first`, `last`)`.

Comporta-se como se aplicasse [std::iter_swap](<#/doc/algorithm/iter_swap>) a cada par de iterators first + i e (last - i) - 1 para cada inteiro i em `[`​0​`, `[std::distance](<#/doc/iterator/distance>)(first, last) / 2`)`.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se *first não for [Swappable](<#/doc/named_req/Swappable>)(até C++20)`BidirIt` não for [ValueSwappable](<#/doc/named_req/ValueSwappable>)(desde C++20), o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos a ser invertido
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) / 2 trocas.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1087-L1152>), [libc++](<https://github.com/llvm/llvm-project/blob/6adbc83ee9e46b476e0f75d5671c3a21f675a936/libcxx/include/__algorithm/reverse.h>), e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/xutility#L5335-L5370>).
```cpp
    template<class BidirIt>
    constexpr // desde C++20
    void reverse(BidirIt first, BidirIt last)
    {
        using iter_cat = typename std::iterator_traits<BidirIt>::iterator_category;
    
        // Tag dispatch, por exemplo, chamando reverse_impl(first, last, iter_cat()),
        // pode ser usado em C++14 e modos anteriores.
        if constexpr (std::is_base_of_v<std::random_access_iterator_tag, iter_cat>)
        {
            if (first == last)
                return;
    
            for (--last; first < last; (void)++first, --last)
                std::iter_swap(first, last);
        }
        else
            while (first != last && first != --last)
                std::iter_swap(first++, last);
    }
```

---

### Notas

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator satisfaz [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    void println(auto rem, auto const& v)
    {
        for (std::cout << rem; auto e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<int> v {1, 2, 3};
        std::reverse(v.begin(), v.end());
        println("after reverse, v = ", v);
    
        int a[] = {4, 5, 6, 7};
        std::reverse(std::begin(a), std::end(a));
        println("after reverse, a = ", a);
    }
```

Saída:
```
    after reverse, v = 3 2 1
    after reverse, a = 7 6 5 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 223](<https://cplusplus.github.io/LWG/issue223>) | C++98 | [std::swap](<#/doc/utility/swap>) foi aplicado a cada par de iterators | aplica [std::iter_swap](<#/doc/algorithm/iter_swap>) em vez disso
[LWG 2039](<https://cplusplus.github.io/LWG/issue2039>) | C++98 | [std::iter_swap](<#/doc/algorithm/iter_swap>) também foi aplicado quando i é igual a [std::distance](<#/doc/iterator/distance>)(first, last) / 2 | não aplicado

### Veja também

[ reverse_copy](<#/doc/algorithm/reverse_copy>) | cria uma cópia de um range que é invertido
(modelo de função)
[ ranges::reverse](<#/doc/algorithm/ranges/reverse>)(C++20) | inverte a ordem dos elementos em um range
(objeto de função de algoritmo)