# std::minmax_element

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
std::pair<ForwardIt, ForwardIt>
minmax_element( ForwardIt first, ForwardIt last );
(constexpr desde C++17)
template< class ExecutionPolicy, class ForwardIt >
std::pair<ForwardIt, ForwardIt>
minmax_element( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last );
template< class ForwardIt, class Compare >
std::pair<ForwardIt, ForwardIt>
minmax_element( ForwardIt first, ForwardIt last, Compare comp );
(constexpr desde C++17)
template< class ExecutionPolicy, class ForwardIt, class Compare >
std::pair<ForwardIt, ForwardIt>
minmax_element( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, Compare comp );
```

Encontra o menor e o maior elemento no range `[`first`, `last`)`.

1) Elementos são comparados usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Elementos são comparados usando a função de comparação comp.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — iterators forward que definem o range a ser examinado
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **cmp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

um par consistindo de um iterator para o menor elemento como o primeiro elemento e um iterator para o maior elemento como o segundo. Retorna [std::make_pair](<#/doc/utility/pair/make_pair>)(first, first) se o range estiver vazio. Se vários elementos forem equivalentes ao menor elemento, o iterator para o primeiro desses elementos é retornado. Se vários elementos forem equivalentes ao maior elemento, o iterator para o último desses elementos é retornado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) No máximo \\(\scriptsize \max(\left\lfloor \frac{3}{2}(N-1) \right\rfloor, 0)\\)max(⌊3
---
2
(N-1)⌋,0) comparações usando operator<(até C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) No máximo \\(\scriptsize \max(\left\lfloor \frac{3}{2}(N-1) \right\rfloor, 0)\\)max(⌊3
---
2
(N-1)⌋,0) aplicações da função de comparação comp.

### Exceções

As sobrecargas com um parâmetro de template nomeado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[minmax_element](<#/doc/algorithm/minmax_element>)
---
```cpp
    template<class ForwardIt>
    std::pair<ForwardIt, ForwardIt>
        minmax_element(ForwardIt first, ForwardIt last)
    {
        using value_type = typename std::iterator_traits<ForwardIt>::value_type;
        return std::minmax_element(first, last, std::less<value_type>());
    }
```

[minmax_element](<#/doc/algorithm/minmax_element>)
```cpp
    template<class ForwardIt, class Compare>
    std::pair<ForwardIt, ForwardIt>
        minmax_element(ForwardIt first, ForwardIt last, Compare comp)
    {
        auto min = first, max = first;
    
        if (first == last || ++first == last)
            return {min, max};
    
        if (comp(*first, *min))
            min = first;
        else
            max = first;
    
        while (++first != last)
        {
            auto i = first;
            if (++first == last)
            {
                if (comp(*i, *min))
                    min = i;
                else if (!(comp(*i, *max)))
                    max = i;
                break;
            }
            else
            {
                if (comp(*first, *i))
                {
                    if (comp(*first, *min))
                        min = first;
                    if (!(comp(*i, *max)))
                        max = i;
                }
                else
                {
                    if (comp(*i, *min))
                        min = i;
                    if (!(comp(*first, *max)))
                        max = first;
                }
            }
        }
        return {min, max};
    }
```

### Notas

Este algoritmo é diferente de [std::make_pair](<#/doc/utility/pair/make_pair>)([std::min_element](<#/doc/algorithm/min_element>)(), [std::max_element](<#/doc/algorithm/max_element>)()), não apenas em eficiência, mas também porque este algoritmo encontra o _último_ maior elemento enquanto [std::max_element](<#/doc/algorithm/max_element>) encontra o _primeiro_ maior elemento.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    
    int main()
    {
        const auto v = {3, 9, 1, 4, 2, 5, 9};
        const auto [min, max] = std::minmax_element(begin(v), end(v));
    
        std::cout << "min = " << *min << ", max = " << *max << '\n';
    }
```

Saída:
```
    min = 1, max = 9
```

### Veja também

[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(modelo de função)
[ max_element](<#/doc/algorithm/max_element>) | retorna o maior elemento em um range
(modelo de função)
[ ranges::minmax_element](<#/doc/algorithm/ranges/minmax_element>)(C++20) | retorna os menores e os maiores elementos em um range
(objeto de função de algoritmo)