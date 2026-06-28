# std::fill_n

```cpp
Definido no header `<algorithm>`
  // (1)
template< class OutputIt, class Size, class T >
OutputIt fill_n( OutputIt first, Size count, const T& value ); | | (constexpr desde C++20)
(até C++26)
template< class OutputIt, class Size,
class T = typename std::iterator_traits
<OutputIt>::value_type >
constexpr OutputIt fill_n( OutputIt first, Size count,
const T& value );  // (desde C++26)
  // (2)
template< class ExecutionPolicy,
class ForwardIt, class Size, class T >
ForwardIt fill_n( ExecutionPolicy&& policy,
ForwardIt first, Size count, const T& value );  // (desde C++17)
(até C++26)
template< class ExecutionPolicy,
class ForwardIt, class Size,
class T = typename std::iterator_traits
<OutputIt>::value_type >
ForwardIt fill_n( ExecutionPolicy&& policy,
ForwardIt first, Size count, const T& value );  // (desde C++26)
```

1) Atribui o valor fornecido aos primeiros `count` elementos no range que começa em `first` se `count > 0`. Não faz nada caso contrário.

2) O mesmo que (1), mas executado de acordo com a `policy`.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se qualquer das seguintes condições for satisfeita, o programa é malformado:

*   `value` não é [gravável](<#/doc/iterator>) em `first`.
*   `Size` não é [conversível](<#/doc/language/implicit_cast>) para um [tipo integral](<#/doc/language/type-id>).

### Parâmetros

- **first** — o início do range de elementos a modificar
- **count** — número de elementos a modificar
- **value** — o valor a ser atribuído
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator um após o último elemento atribuído se `count > 0`, `first` caso contrário.

### Complexidade

Exatamente [std::max](<#/doc/algorithm/max>)(0, count) atribuições.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamado. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançado.

### Possível implementação

[fill_n](<#/doc/algorithm/fill_n>)
---
```cpp
    template<class OutputIt, class Size,
             class T = typename std::iterator_traits<OutputIt>::value_type>
    OutputIt fill_n(OutputIt first, Size count, const T& value)
    {
        for (Size i = 0; i < count; i++)
            *first++ = value;
        return first;
    }
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/fill_n>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector<int> v1{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    
        // replace values of the first 5 elements with -1
        std::fill_n(v1.begin(), 5, -1);
    
        std::copy_n(v1.cbegin(), v1.size(), std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        std::vector<std::complex<double>> nums{{1, 3}, {2, 2}, {4, 8}};
        #ifdef __cpp_lib_algorithm_default_value_type
            std::fill_n(nums.begin(), 2, {4, 2});
        #else
            std::fill_n(nums.begin(), 2, std::complex<double>{4, 2});
        #endif
        std::copy_n(nums.cbegin(), nums.size(),
                    std::ostream_iterator<std::complex<double>>(std::cout, " "));
        std::cout << '\n';
    }
```

Saída:
```
    -1 -1 -1 -1 -1 5 6 7 8 9
    (4,2) (4,2) (4,8)
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido como [CopyAssignable](<#/doc/named_req/CopyAssignable>), mas
`T` nem sempre é gravável em `OutputIt` | exigido como gravável em vez disso
[LWG 426](<https://cplusplus.github.io/LWG/issue426>) | C++98 | o requisito de complexidade era "exatamente count atribuições", o que é problemático se count for negativo | nenhuma atribuição se
count não for positivo
[LWG 865](<https://cplusplus.github.io/LWG/issue865>) | C++98 | a localização do primeiro elemento após
o range de preenchimento não era retornada | retornada

### Veja também

[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor fornecido a cada elemento em um range
(modelo de função)
[ ranges::fill_n](<#/doc/algorithm/ranges/fill_n>)(C++20) | atribui um valor a um número de elementos
(objeto de função de algoritmo)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão