# std::adjacent_find

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
ForwardIt adjacent_find( ForwardIt first, ForwardIt last );
template< class ExecutionPolicy, class ForwardIt >
ForwardIt adjacent_find( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last );
template< class ForwardIt, class BinaryPred >
ForwardIt adjacent_find( ForwardIt first, ForwardIt last,
BinaryPred p );
template< class ExecutionPolicy, class ForwardIt, class BinaryPred >
ForwardIt adjacent_find( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
BinaryPred p );
```

Procura no range `[`first`, `last`)` por dois elementos consecutivos iguais.

1) Os elementos são comparados usando o operator==.

3) Os elementos são comparados usando o predicado binário p fornecido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado binário que retorna true se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` uma move seja equivalente a uma copy (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`BinaryPred` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>).

### Valor de retorno

Um iterator para o primeiro do primeiro par de elementos idênticos, ou seja, o primeiro iterator it tal que *it == *(it + 1) para (1,2) ou p(*it, *(it + 1)) != false para (3,4).

Se nenhum elemento for encontrado, last é retornado.

### Complexidade

Dado result como o valor de retorno de `adjacent_find`, \\(\scriptsize M\\)M como [std::distance](<#/doc/iterator/distance>)(first, result) e \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) Exatamente \\(\scriptsize \min(M+1,N-1)\\)min(M+1,N-1) comparações usando operator==.

2) \\(\scriptsize O(N)\\)O(N) comparações usando operator==.

3) Exatamente \\(\scriptsize \min(M+1,N-1)\\)min(M+1,N-1) aplicações do predicado p.

4) \\(\scriptsize O(N)\\)O(N) aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[adjacent_find (1)](<#/doc/algorithm/adjacent_find>)
---
```cpp
    template<class ForwardIt>
    ForwardIt adjacent_find(ForwardIt first, ForwardIt last)
    {
        if (first == last)
            return last;
    
        ForwardIt next = first;
        ++next;
    
        for (; next != last; ++next, ++first)
            if (*first == *next)
                return first;
    
        return last;
    }
```

[adjacent_find (3)](<#/doc/algorithm/adjacent_find>)
```cpp
    template<class ForwardIt, class BinaryPred>
    ForwardIt adjacent_find(ForwardIt first, ForwardIt last, BinaryPred p)
    {
        if (first == last)
            return last;
    
        ForwardIt next = first;
        ++next;
    
        for (; next != last; ++next, ++first)
            if (p(*first, *next))
                return first;
    
        return last;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v1{0, 1, 2, 3, 40, 40, 41, 41, 5};
    
        auto i1 = std::adjacent_find(v1.begin(), v1.end());
    
        if (i1 == v1.end())
            std::cout << "No matching adjacent elements\n";
        else
            std::cout << "The first adjacent pair of equal elements is at "
                      << std::distance(v1.begin(), i1) << ", *i1 = "
                      << *i1 << '\n';
    
        auto i2 = std::adjacent_find(v1.begin(), v1.end(), std::greater<int>());
        if (i2 == v1.end())
            std::cout << "The entire vector is sorted in ascending order\n";
        else
            std::cout << "The last element in the non-decreasing subsequence is at "
                      << std::distance(v1.begin(), i2) << ", *i2 = " << *i2 << '\n';
    }
```

Saída:
```
    The first adjacent pair of equal elements is at 4, *i1 = 40
    The last element in the non-decreasing subsequence is at 7, *i2 = 41
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 240](<https://cplusplus.github.io/LWG/issue240>) | C++98 | o predicado foi aplicado [std::find](<#/doc/algorithm/find>) (first, last, value) - first vezes para (1,3), onde value nunca foi definido | aplicado [std::min](<#/doc/algorithm/min>)( (result - first) + 1, (last - first) - 1) vezes

### Veja também

[ unique](<#/doc/algorithm/unique>) | remove elementos duplicados consecutivos em um range
(function template)
[ ranges::adjacent_find](<#/doc/algorithm/ranges/adjacent_find>)(C++20) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(algorithm function object)