# std::fill

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class T >
void fill( ForwardIt first, ForwardIt last, const T& value );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr void fill( ForwardIt first, ForwardIt last,
const T& value );
template< class ExecutionPolicy, class ForwardIt, class T >
void fill( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
(até C++26)
template< class ExecutionPolicy,
class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
void fill( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
```

1) Atribui o valor fornecido a todos os elementos no range `[`first`, `last`)`.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: `[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)<ExecutionPolicy>>` é true. | (até C++20)
---|---
`[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)<ExecutionPolicy>>` é true. | (desde C++20)

Se value não for [gravável](<#/doc/iterator>) em first, o programa é malformado.

### Parâmetros

first, last | \- | o range de elementos a modificar
---|---|---
value | \- | o valor a ser atribuído
policy | \- | a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Complexidade

Exatamente `[std::distance](<#/doc/iterator/distance>)`(first, last) atribuições.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), `[std::terminate](<#/doc/error/terminate>)` é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é indefinido pela implementação.
  * Se o algoritmo falhar ao alocar memória, `[std::bad_alloc](<#/doc/memory/new/bad_alloc>)` é lançada.

### Possível implementação

[fill](<#/doc/algorithm/fill>)
---
```cpp
    template<class ForwardIt,
             class T = typename std::iterator_traits<ForwardIt>::value_type>
    void fill(ForwardIt first, ForwardIt last, const T& value)
    {
        for (; first != last; ++first)
            *first = value;
    }
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/fill>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <complex>
    #include <iostream>
    #include <vector>
    
    void println(const auto& seq)
    {
        for (const auto& e : seq)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::vector<int> v{0, 1, 2, 3, 4, 5, 6, 7, 8};
        println(v);
    
        // set all of the elements to 8
        std::fill(v.begin(), v.end(), 8);
        println(v);
    
        std::vector<std::complex<double>> nums{{1, 3}, {2, 2}, {4, 8}};
        println(nums);
        #ifdef __cpp_lib_algorithm_default_value_type
            std::fill(nums.begin(), nums.end(), {4, 2});
        #else
            std::fill(nums.begin(), nums.end(), std::complex<double>{4, 2});
        #endif
        println(nums);
    }
```

Saída:
```
    0 1 2 3 4 5 6 7 8
    8 8 8 8 8 8 8 8 8
    (1,3) (2,2) (4,8) 
    (4,2) (4,2) (4,2)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

RD | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido como [CopyAssignable](<#/doc/named_req/CopyAssignable>), mas
`T` nem sempre é gravável em `ForwardIt` | exigido como gravável em vez disso

### Ver também

[ fill_n](<#/doc/algorithm/fill_n>) | atribui por cópia o valor fornecido a N elementos em um range
(modelo de função)
[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(modelo de função)
[ generate](<#/doc/algorithm/generate>) | atribui os resultados de chamadas de função sucessivas a cada elemento em um range
(modelo de função)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ ranges::fill](<#/doc/algorithm/ranges/fill>)(C++20) | atribui a um range de elementos um certo valor
(objeto de função de algoritmo)