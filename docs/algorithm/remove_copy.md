# std::remove_copy, std::remove_copy_if

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class OutputIt, class T >
OutputIt remove_copy( InputIt first, InputIt last,
OutputIt d_first, const T& value );
(até C++26)
template< class InputIt, class OutputIt,
class T = typename std::iterator_traits
<InputIt>::value_type >
constexpr OutputIt remove_copy( InputIt first, InputIt last,
OutputIt d_first, const T& value );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class T >
ForwardIt2 remove_copy( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, const T& value );
(até C++26)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class T = typename std::iterator_traits
<ForwardIt1>::value_type >
ForwardIt2 remove_copy( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, const T& value );
template< class InputIt, class OutputIt, class UnaryPred >
OutputIt remove_copy_if( InputIt first, InputIt last,
OutputIt d_first, UnaryPred p );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class UnaryPred >
ForwardIt2 remove_copy_if( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, UnaryPred p );
```

Copia elementos do range `[`first`, `last`)`, para outro range começando em d_first, omitindo os elementos que satisfazem critérios específicos.

1) Ignora todos os elementos que são iguais a value (usando operator==).

3) Ignora todos os elementos para os quais o predicate p retorna true.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se `*d_first = *first` for inválido (até C++20) ou `*first` não for [gravável](<#/doc/iterator>) para `d_first` (desde C++20), o programa é malformado.

Se os ranges de origem e destino se sobrepuserem, o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos a copiar
- **d_first** — o início do range de destino
- **value** — o valor dos elementos a não copiar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a usar
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

Iterator para o elemento após o último elemento copiado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize N\\)N comparações com value usando operator==.

3,4) Exatamente \\(\scriptsize N\\)N aplicações do predicate p.

Para as sobrecargas com uma ExecutionPolicy, pode haver um custo de desempenho se o `value_type` de `ForwardIt1` não for [MoveConstructible](<#/doc/named_req/MoveConstructible>).

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[remove_copy (1)](<#/doc/algorithm/remove_copy>)
---
```cpp
    template<class InputIt, class OutputIt,
             class T = typename std::iterator_traits<InputIt>::value_type>
    constexpr OutputIt remove_copy(InputIt first, InputIt last,
                                   OutputIt d_first, const T& value)
    {
        for (; first != last; ++first)
            if (!(*first == value))
                *d_first++ = *first;
        return d_first;
    }
```

[remove_copy_if (3)](<#/doc/algorithm/remove_copy>)
```cpp
    template<class InputIt, class OutputIt, class UnaryPred>
    constexpr OutputIt remove_copy_if(InputIt first, InputIt last,
                                      OutputIt d_first, UnaryPred p)
    {
        for (; first != last; ++first)
            if (!p(*first))
                *d_first++ = *first;
        return d_first;
    }
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [List-initialization](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/remove_copy>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <string>
    #include <vector>
    
    int main()
    {
        // Erase the hash characters '#' on the fly.
        std::string str = "#Return #Value #Optimization";
        std::cout << "before: " << std::quoted(str) << '\n';
    
        std::cout << "after:  \"";
        std::remove_copy(str.begin(), str.end(),
                         std::ostream_iterator<char>(std::cout), '#');
        std::cout << "\"\n";
    
        // Erase {1, 3} value on the fly.
        std::vector<std::complex<double>> nums{{2, 2}, {1, 3}, {4, 8}, {1, 3}};
        std::remove_copy(nums.begin(), nums.end(),
                         std::ostream_iterator<std::complex<double>>(std::cout),
        #ifdef __cpp_lib_algorithm_default_value_type
                         {1, 3}); // T gets deduced
        #else
                         std::complex<double>{1, 3});
        #endif
    }
```

Saída:
```
    before: "#Return #Value #Optimization"
    after:  "Return Value Optimization"
    (2,2)(4,8)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 779](<https://cplusplus.github.io/LWG/issue779>) | C++98 | `T` era exigido ser [EqualityComparable](<#/doc/named_req/EqualityComparable>), mas o tipo de valor de `ForwardIt` nem sempre é `T` | exigia que `*d_first = *first` fosse válido em vez disso

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(modelo de função)
[ partition_copy](<#/doc/algorithm/partition_copy>)(C++11) | copia um range dividindo os elementos em dois grupos
(modelo de função)
[ ranges::remove_copyranges::remove_copy_if](<#/doc/algorithm/ranges/remove_copy>)(C++20)(C++20) | copia um range de elementos omitindo aqueles que satisfazem critérios específicos
(objeto de função de algoritmo)