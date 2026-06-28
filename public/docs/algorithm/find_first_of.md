# std::find_first_of

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class ForwardIt >
InputIt find_first_of( InputIt first, InputIt last,
ForwardIt s_first, ForwardIt s_last );
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
ForwardIt1 find_first_of( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 s_first, ForwardIt2 s_last );
template< class InputIt, class ForwardIt, class BinaryPred >
InputIt find_first_of( InputIt first, InputIt last,
ForwardIt s_first, ForwardIt s_last,
BinaryPred p );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryPred >
ForwardIt1 find_first_of( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt last,
ForwardIt2 s_first, ForwardIt2 s_last,
BinaryPred p );
```

Procura no range `[`first`, `last`)` por qualquer um dos elementos no range `[`s_first`, `s_last`)`.

1) Os elementos são comparados usando operator==.

3) Os elementos são comparados usando o predicado binário p fornecido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **s_first, s_last** — o range de elementos a procurar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado binário que retorna ​true se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` uma move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que objetos dos tipos ForwardIt1 e ForwardIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2 respectivamente. ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`ForwardIt1` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`BinaryPred` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>).

### Valor de retorno

Um iterator para o primeiro elemento no range `[`first`, `last`)` que é igual a um elemento do range `[`s_first`, `s_last`)`.

Se `[`s_first`, `s_last`)` estiver vazio ou se nenhum elemento for encontrado, last é retornado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last) e \\(\scriptsize S\\)S como [std::distance](<#/doc/iterator/distance>)(s_first, s_last):

1,2) No máximo \\(\scriptsize N\cdot S\\)N·S comparações usando operator==.

3,4) No máximo \\(\scriptsize N\cdot S\\)N·S aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[find_first_of (1)](<#/doc/algorithm/find_first_of>)
---
```cpp
    template<class InputIt, class ForwardIt>
    InputIt find_first_of(InputIt first, InputIt last,
                          ForwardIt s_first, ForwardIt s_last)
    {
        for (; first != last; ++first)
            for (ForwardIt it = s_first; it != s_last; ++it)
                if (*first == *it)
                    return first;
        return last;
    }
```

[find_first_of (3)](<#/doc/algorithm/find_first_of>)
```cpp
    template<class InputIt, class ForwardIt, class BinaryPred>
    InputIt find_first_of(InputIt first, InputIt last,
                          ForwardIt s_first, ForwardIt s_last,
                          BinaryPred p)
    {
        for (; first != last; ++first)
            for (ForwardIt it = s_first; it != s_last; ++it)
                if (p(*first, *it))
                    return first;
        return last;
    }
```

### Exemplo

O código a seguir procura por qualquer um dos inteiros especificados em um vetor de inteiros:

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    auto print_sequence = 
    {
        std::cout << id << "{ ";
        for (int i{}; auto const& e : seq)
        {
            const bool mark{i == pos};
            std::cout << (i++ ? ", " : "");
            std::cout << (mark ? "[ " : "") << e << (mark ? " ]" : "");
        }
        std::cout << " }\n";
    };
    
    int main()
    {
        const std::vector<int> v{0, 2, 3, 25, 5};
        const auto t1 = {19, 10, 3, 4};
        const auto t2 = {1, 6, 7, 9};
    
        auto find_any_of = 
        {
            const auto result = std::find_first_of(v.begin(), v.end(),
                                                   t.begin(), t.end());
            if (result == v.end())
            {
                std::cout << "No elements of v are equal to any element of ";
                print_sequence("t = ", t);
                print_sequence("v = ", v);
            }
            else
            {
                const auto pos = std::distance(v.begin(), result);
                std::cout << "Found a match (" << *result << ") at position " << pos;
                print_sequence(", where t = ", t);
                print_sequence("v = ", v, pos);
            }
        };
    
        find_any_of(v, t1);
        find_any_of(v, t2);
    }
```

Saída:
```
    Found a match (3) at position 2, where t = { 19, 10, 3, 4 }
    v = { 0, 2, [ 3 ], 25, 5 }
    No elements of v are equal to any element of t = { 1, 6, 7, 9 }
    v = { 0, 2, 3, 25, 5 }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 576](<https://cplusplus.github.io/LWG/issue576>) | C++98 | first e last precisavam ser [LegacyForwardIterators](<#/doc/named_req/ForwardIterator>) | eles só precisam ser [LegacyInputIterators](<#/doc/named_req/InputIterator>)
[LWG 1205](<https://cplusplus.github.io/LWG/issue1205>) | C++98 | o valor de retorno era incerto se `[`s_first`, `s_last`)` estivesse vazio | retorna last neste caso

### Veja também

[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos (modelo de função)
---|---
[ ranges::find_first_of](<#/doc/algorithm/ranges/find_first_of>)(C++20) | procura por qualquer um de um conjunto de elementos (objeto de função de algoritmo)