# std::set_difference

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt1, class InputIt2, class OutputIt >
OutputIt set_difference( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2,
OutputIt d_first );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class ForwardIt3 >
ForwardIt3 set_difference( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
ForwardIt3 d_first );
template< class InputIt1, class InputIt2,
class OutputIt, class Compare >
OutputIt set_difference( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2,
OutputIt d_first, Compare comp );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class ForwardIt3, class Compare >
ForwardIt3 set_difference( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
ForwardIt3 d_first, Compare comp );
```

Copia os elementos do range ordenado `[`first1`, `last1`)` que não são encontrados no range ordenado `[`first2`, `last2`)` para o range que começa em d_first. O range de saída também é ordenado.

Se `[`first1`, `last1`)` contiver m elementos que são equivalentes entre si e `[`first2`, `last2`)` contiver n elementos que são equivalentes a eles, os [std::max](<#/doc/algorithm/max>)(m - n, 0) elementos finais serão copiados de `[`first1`, `last1`)` para o range de saída, preservando a ordem.

1) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver [ordenado](<#/doc/algorithm>) em relação ao operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20), o comportamento é indefinido.

3) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver ordenado em relação a comp, o comportamento é indefinido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for true. | (desde C++20)

Se o range de saída se sobrepuser com `[`first1`, `last1`)` ou `[`first2`, `last2`)`, o comportamento é indefinido.

### Parâmetros

- **first1, last1** — o range de elementos a serem examinados
- **first2, last2** — o range de elementos a serem procurados
- **d_first** — o início do range de saída
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que (ou seja, for ordenado _antes_ de) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que objetos dos tipos InputIt1 e InputIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2.
Requisitos de tipo
-`InputIt1, InputIt2` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2, ForwardIt3` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

Iterator após o final do range construído.

### Complexidade

Dado \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1,2) No máximo \\(\scriptsize 2 \cdot (N_1+N_2)-1\\)2⋅(N1+N2)-1 comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) No máximo \\(\scriptsize 2 \cdot (N_1+N_2)-1\\)2⋅(N1+N2)-1 aplicações da função de comparação comp.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[set_difference (1)](<#/doc/algorithm/set_difference>)
---
```cpp
    template<class InputIt1, class InputIt2, class OutputIt>
    OutputIt set_difference(InputIt1 first1, InputIt1 last1,
                            InputIt2 first2, InputIt2 last2, OutputIt d_first)
    {
        while (first1 != last1)
        {
            if (first2 == last2)
                return std::copy(first1, last1, d_first);
    
            if (*first1 < *first2)
                *d_first++ = *first1++;
            else
            {
                if (! (*first2 < *first1))
                    ++first1;
                ++first2;
            }
        }
        return d_first;
    }
```

[set_difference (3)](<#/doc/algorithm/set_difference>)
```cpp
    template<class InputIt1, class InputIt2, class OutputIt, class Compare>
    OutputIt set_difference(InputIt1 first1, InputIt1 last1,
                            InputIt2 first2, InputIt2 last2, OutputIt d_first, Compare comp)
    {
        while (first1 != last1)
        {
            if (first2 == last2)
                return std::copy(first1, last1, d_first);
    
            if (comp(*first1, *first2))
                *d_first++ = *first1++;
            else
            {
                if (!comp(*first2, *first1))
                    ++first1;
                ++first2;
            }
        }
        return d_first;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    template<typename T>
    std::ostream& operator<<(std::ostream& os, const std::vector<T>& v)
    {
        os << '{';
        for (auto n{v.size()}; const auto& e : v)
            os << e << (--n ? ", " : "");
        return os << '}';
    }
    
    struct Order // a struct with very interesting data
    {
        int order_id{};
    
        friend std::ostream& operator<<(std::ostream& os, const Order& ord)
        {
            return os << ord.order_id;
        }
    };
    
    int main()
    {
        const std::vector<int> v1{1, 2, 5, 5, 5, 9};
        const std::vector<int> v2{2, 5, 7};
        std::vector<int> diff;
    
        std::set_difference(v1.begin(), v1.end(), v2.begin(), v2.end(),
                            std::inserter(diff, diff.begin()));
    
        std::cout << v1 << " ∖ " << v2 << " == " << diff << "\n\n";
    
        // we want to know which orders "cut" between old and new states:
        std::vector<Order> old_orders{{1}, {2}, {5}, {9}};
        std::vector<Order> new_orders{{2}, {5}, {7}};
        std::vector<Order> cut_orders;
    
        std::set_difference(old_orders.begin(), old_orders.end(),
                            new_orders.begin(), new_orders.end(),
                            std::back_inserter(cut_orders),
                             { return a.order_id < b.order_id; });
    
        std::cout << "old orders: " << old_orders << '\n'
                  << "new orders: " << new_orders << '\n'
                  << "cut orders: " << cut_orders << '\n';
    }
```

Saída:
```
    {1, 2, 5, 5, 5, 9} ∖ {2, 5, 7} == {1, 5, 5, 9}
    
    old orders: {1, 2, 5, 9}
    new orders: {2, 5, 7}
    cut orders: {1, 9}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 291](<https://cplusplus.github.io/LWG/issue291>) | C++98 | não era especificado como lidar com elementos equivalentes nos ranges de entrada | especificado

### Veja também

[ includes](<#/doc/algorithm/includes>) | retorna true se uma sequência é uma subsequência de outra
(modelo de função)
[ set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>) | calcula a diferença simétrica entre dois conjuntos
(modelo de função)
[ ranges::set_difference](<#/doc/algorithm/ranges/set_difference>)(C++20) | calcula a diferença entre dois conjuntos
(objeto de função de algoritmo)