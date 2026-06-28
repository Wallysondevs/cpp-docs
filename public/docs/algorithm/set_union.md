# std::set_union

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt1, class InputIt2, class OutputIt >
OutputIt set_union( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2,
OutputIt d_first );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class ForwardIt3 >
ForwardIt3 set_union( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
ForwardIt3 d_first );
template< class InputIt1, class InputIt2,
class OutputIt, class Compare >
OutputIt set_union( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2,
OutputIt d_first, Compare comp );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class ForwardIt3, class Compare >
ForwardIt3 set_union( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
ForwardIt3 d_first, Compare comp );
```

Constrói uma união ordenada começando em d_first, consistindo no conjunto de elementos presentes em um ou ambos os ranges ordenados `[`first1`, `last1`)` e `[`first2`, `last2`)`.

Se `[`first1`, `last1`)` contiver m elementos que são equivalentes entre si e `[`first2`, `last2`)` contiver n elementos que são equivalentes a eles, então todos os m elementos serão copiados de `[`first1`, `last1`)` para o range de saída, preservando a ordem, e então os [std::max](<#/doc/algorithm/max>)(n - m, 0) elementos finais serão copiados de `[`first2`, `last2`)` para o range de saída, também preservando a ordem.

1) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver ordenado em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20), o comportamento é indefinido.

3) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver ordenado em relação a comp, o comportamento é indefinido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (desde C++20)

Se o range de saída se sobrepuser a `[`first1`, `last1`)` ou `[`first2`, `last2`)`, o comportamento é indefinido.

### Parâmetros

- **first1, last1** — o primeiro range de entrada ordenado
- **first2, last2** — o segundo range de entrada ordenado
- **d_first** — o início do range de saída
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna `true` se o primeiro argumento for _menor_ que (ou seja, for ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que objetos dos tipos InputIt1 e InputIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2.
Requisitos de tipo
-`InputIt1, InputIt2` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt1, ForwardIt2, ForwardIt3` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

Iterator após o final do range construído.

### Complexidade

Dado \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1,2) No máximo \\(\scriptsize 2 \cdot (N_1+N_2)-1\\)2⋅(N1+N2)-1 comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) No máximo \\(\scriptsize 2 \cdot (N_1+N_2)-1\\)2⋅(N1+N2)-1 aplicações da função de comparação comp.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[set_union (1)](<#/doc/algorithm/set_union>)
---
```cpp
    template<class InputIt1, class InputIt2, class OutputIt>
    OutputIt set_union(InputIt1 first1, InputIt1 last1,
                       InputIt2 first2, InputIt2 last2, OutputIt d_first)
    {
        for (; first1 != last1; ++d_first)
        {
            if (first2 == last2)
                return std::copy(first1, last1, d_first);
    
            if (*first2 < *first1)
                *d_first = *first2++;
            else
            {
                *d_first = *first1;
                if (!(*first1 < *first2))
                    ++first2;
                ++first1;
            }
        }
        return std::copy(first2, last2, d_first);
    }
```

[set_union (3)](<#/doc/algorithm/set_union>)
```cpp
    template<class InputIt1, class InputIt2, class OutputIt, class Compare>
    OutputIt set_union(InputIt1 first1, InputIt1 last1,
                       InputIt2 first2, InputIt2 last2, OutputIt d_first, Compare comp)
    {
        for (; first1 != last1; ++d_first)
        {
            if (first2 == last2)
                // Finished range 2, include the rest of range 1:
                return std::copy(first1, last1, d_first);
    
            if (comp(*first2, *first1))
                *d_first = *first2++;
            else
            {
                *d_first = *first1;
                if (!comp(*first1, *first2)) // Equivalent => don't need to include *first2.
                    ++first2;
                ++first1;
            }
        }
        // Finished range 1, include the rest of range 2:
        return std::copy(first2, last2, d_first);
    }
```

### Notas

Este algoritmo executa uma tarefa semelhante à de [std::merge](<#/doc/algorithm/merge>). Ambos consomem dois ranges de entrada ordenados e produzem uma saída ordenada com elementos de ambas as entradas. A diferença entre esses dois algoritmos está no tratamento de valores de ambos os ranges de entrada que se comparam como equivalentes (veja as notas sobre [LessThanComparable](<#/doc/named_req/LessThanComparable>)). Se quaisquer valores equivalentes apareceram n vezes no primeiro range e m vezes no segundo, [std::merge](<#/doc/algorithm/merge>) produziria todas as n + m ocorrências, enquanto `std::set_union` produziria apenas [std::max](<#/doc/algorithm/max>)(n, m) delas. Assim, `std::merge` produz exatamente [std::distance](<#/doc/iterator/distance>)(first1, last1) + [std::distance](<#/doc/iterator/distance>)(first2, last2) valores e `std::set_union` pode produzir menos.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    void println(const std::vector<int>& v)
    {
        for (int i : v)
            std::cout << i << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<int> v1, v2, dest;
    
        v1 = {1, 2, 3, 4, 5};
        v2 = {3, 4, 5, 6, 7};
    
        std::set_union(v1.cbegin(), v1.cend(),
                       v2.cbegin(), v2.cend(),
                       std::back_inserter(dest));
        println(dest);
    
        dest.clear();
    
        v1 = {1, 2, 3, 4, 5, 5, 5};
        v2 = {3, 4, 5, 6, 7};
    
        std::set_union(v1.cbegin(), v1.cend(),
                       v2.cbegin(), v2.cend(),
                       std::back_inserter(dest));
        println(dest);
    }
```

Saída:
```
    1 2 3 4 5 6 7 
    1 2 3 4 5 5 5 6 7
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 291](<https://cplusplus.github.io/LWG/issue291>) | C++98 | não era especificado como lidar com elementos equivalentes nos ranges de entrada | especificado

### Veja também

[ includes](<#/doc/algorithm/includes>) | retorna verdadeiro se uma sequência é uma subsequência de outra
(modelo de função)
[ merge](<#/doc/algorithm/merge>) | mescla dois ranges ordenados
(modelo de função)
[ set_difference](<#/doc/algorithm/set_difference>) | calcula a diferença entre dois conjuntos
(modelo de função)
[ set_intersection](<#/doc/algorithm/set_intersection>) | calcula a interseção de dois conjuntos
(modelo de função)
[ set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>) | calcula a diferença simétrica entre dois conjuntos
(modelo de função)
[ ranges::set_union](<#/doc/algorithm/ranges/set_union>)(C++20) | calcula a união de dois conjuntos
(objeto de função de algoritmo)