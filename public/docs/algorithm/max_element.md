# std::max_element

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
ForwardIt max_element( ForwardIt first, ForwardIt last );
template< class ExecutionPolicy, class ForwardIt >
ForwardIt max_element( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last );
template< class ForwardIt, class Compare >
ForwardIt max_element( ForwardIt first, ForwardIt last,
Compare comp );
template< class ExecutionPolicy, class ForwardIt, class Compare >
ForwardIt max_element( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
Compare comp );
```

Encontra o maior elemento no range `[`first`, `last`)`.

1) Elementos são comparados usando operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3) Elementos são comparados usando a função de comparação comp.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (ate C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — iterators forward que definem o range a ser examinado
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento for _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [value category](<#/doc/language/value_category>) (assim, Type1& não é permitido, nem Type1 a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para ambos.
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator para o maior elemento no range `[`first`, `last`)`. Se vários elementos no range forem equivalentes ao maior elemento, retorna o iterator para o primeiro desses elementos. Retorna last se o range estiver vazio.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize \max(N-1,0)\\)max(N-1,0) comparações usando operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) Exatamente \\(\scriptsize \max(N-1,0)\\)max(N-1,0) aplicações da função de comparação comp.

### Exceções

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é indefinido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[max_element (1)](<#/doc/algorithm/max_element>)
---
```cpp
    template<class ForwardIt>
    ForwardIt max_element(ForwardIt first, ForwardIt last)
    {
        if (first == last)
            return last;
    
        ForwardIt largest = first;
    
        while (++first != last)
            if (*largest < *first)
                largest = first;
    
        return largest;
    }
```

[max_element (3)](<#/doc/algorithm/max_element>)
```cpp
    template<class ForwardIt, class Compare>
    ForwardIt max_element(ForwardIt first, ForwardIt last, Compare comp)
    {
        if (first == last)
            return last;
    
        ForwardIt largest = first;
    
        while(++first != last)
            if (comp(*largest, *first))
                largest = first;
    
        return largest;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cmath>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{3, 1, -14, 1, 5, 9, -14, 9};
        std::vector<int>::iterator result;
    
        result = std::max_element(v.begin(), v.end());
        std::cout << "Max element found at index "
                  << std::distance(v.begin(), result)
                  << " has value " << *result << '\n';
    
        result = std::max_element(v.begin(), v.end(), 
        {
            return std::abs(a) < std::abs(b);
        });
        std::cout << "Absolute max element found at index "
                  << std::distance(v.begin(), result)
                  << " has value " << *result << '\n';
    }
```

Saída:
```
    Max element found at index 5 has value 9
    Absolute max element found at index 2 has value -14
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 212](<https://cplusplus.github.io/LWG/issue212>) | C++98 | o valor de retorno não era especificado se `[`first`, `last`)` estivesse vazio | retorna last neste caso
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | o iterator para o primeiro elemento não-menor era retornado | corrigido o valor de retorno

### Veja também

[ min_element](<#/doc/algorithm/min_element>) | retorna o menor elemento em um range
(modelo de função)
[ minmax_element](<#/doc/algorithm/minmax_element>)(C++11) | retorna os menores e maiores elementos em um range
(modelo de função)
[ max](<#/doc/algorithm/max>) | retorna o maior dos valores dados
(modelo de função)
[ ranges::max_element](<#/doc/algorithm/ranges/max_element>)(C++20) | retorna o maior elemento em um range
(objeto de função de algoritmo)