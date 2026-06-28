# std::find, std::find_if, std::find_if_not

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class T >
InputIt find( InputIt first, InputIt last, const T& value );
(até C++26)
template< class InputIt, class T = typename std::iterator_traits
<InputIt>::value_type >
constexpr InputIt find( InputIt first, InputIt last, const T& value );
template< class ExecutionPolicy, class ForwardIt, class T >
ForwardIt find( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
(até C++26)
template< class ExecutionPolicy,
class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
ForwardIt find( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, const T& value );
template< class InputIt, class UnaryPred >
InputIt find_if( InputIt first, InputIt last, UnaryPred p );
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
ForwardIt find_if( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred p );
template< class InputIt, class UnaryPred >
InputIt find_if_not( InputIt first, InputIt last, UnaryPred q );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >
ForwardIt find_if_not( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryPred q );
```

Retorna um iterator para o primeiro elemento no range `[`first`, `last`)` que satisfaz critérios específicos (ou last se não houver tal iterator).

1) `find` busca por um elemento igual a value (usando `operator==`).

3) `find_if` busca por um elemento para o qual o predicate p retorna true.

5) `find_if_not` busca por um elemento para o qual o predicate q retorna false.

2,4,6) O mesmo que (1,3,5), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as condições a seguir forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **value** — valor para comparar os elementos
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicate unário que retorna ​true para o elemento requerido.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [value category](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro de VT& não é permitido, nem VT a menos que para `VT` um move seja equivalente a uma cópia (desde C++11). ​
- **q** — predicate unário que retorna ​false para o elemento requerido.
A expressão q(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [value category](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro de VT& não é permitido, nem VT a menos que para `VT` um move seja equivalente a uma cópia (desde C++11). ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPredicate` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

O primeiro iterator it no [range](<#/doc/iterator>) `[`first`, `last`)` que satisfaz a seguinte condição ou last se não houver tal iterator:

1,2) *it == value é true.

3,4) p(*it) é true.

5,6) q(*it) é false.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) No máximo \\(\scriptsize N\\)N comparações com value usando `operator==`.

3,4) No máximo \\(\scriptsize N\\)N aplicações do predicate p.

5,6) No máximo \\(\scriptsize N\\)N aplicações do predicate q.

### Exceções

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[find](<#/doc/algorithm/find>)
---
```cpp
    template<class InputIt, class T = typename std::iterator_traits<InputIt>::value_type>
    constexpr InputIt find(InputIt first, InputIt last, const T& value)
    {
        for (; first != last; ++first)
            if (*first == value)
                return first;
    
        return last;
    }
```

[find_if](<#/doc/algorithm/find>)
```cpp
    template<class InputIt, class UnaryPred>
    constexpr InputIt find_if(InputIt first, InputIt last, UnaryPred p)
    {
        for (; first != last; ++first)
            if (p(*first))
                return first;
    
        return last;
    }
```

[find_if_not](<#/doc/algorithm/find>)
```cpp
    template<class InputIt, class UnaryPred>
    constexpr InputIt find_if_not(InputIt first, InputIt last, UnaryPred q)
    {
        for (; first != last; ++first)
            if (!q(*first))
                return first;
    
        return last;
    }
```

### Notas

Se C++11 não estiver disponível, um equivalente a `std::find_if_not` é usar `std::find_if` com o predicate negado.
```cpp
    template<class InputIt, class UnaryPred>
    InputIt find_if_not(InputIt first, InputIt last, UnaryPred q)
    {
        return std::find_if(first, last, std::not1(q));
    }
```

---
Teste de recurso macro | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [List-initialization](<#/doc/language/list_initialization>) para algoritmos ([1,2](<#/doc/algorithm/find>))

### Exemplo

O exemplo a seguir encontra números em sequências dadas.

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <cassert>
    #include <complex>
    #include <initializer_list>
    #include <iostream>
    #include <vector>
    
    bool is_even(int i)
    {
        return i % 2 == 0;
    }
    
    void example_contains()
    {
        const auto haystack = {1, 2, 3, 4};
    
        for (const int needle : {3, 5})
            if (std::find(haystack.begin(), haystack.end(), needle) == haystack.end())
                std::cout << "haystack does not contain " << needle << '\n';
            else
                std::cout << "haystack contains " << needle << '\n';
    }
    
    void example_predicate()
    {
        for (const auto& haystack : {std::array{3, 1, 4}, {1, 3, 5}})
        {
            const auto it = std::find_if(haystack.begin(), haystack.end(), is_even);
            if (it != haystack.end())
                std::cout << "haystack contains an even number " << *it << '\n';
            else
                std::cout << "haystack does not contain even numbers\n";
        }
    }
    
    void example_list_init()
    {
        std::vector<std::complex<double>> haystack{{4.0, 2.0}};
    #ifdef __cpp_lib_algorithm_default_value_type
        // T gets deduced making list-initialization possible
        const auto it = std::find(haystack.begin(), haystack.end(), {4.0, 2.0});
    #else
        const auto it = std::find(haystack.begin(), haystack.end(), std::complex{4.0, 2.0});
    #endif
        assert(it == haystack.begin());  
    }
    
    int main()
    {
        example_contains();
        example_predicate();
        example_list_init();
    }
```

Saída:
```
    haystack contains 3
    haystack does not contain 5
    haystack contains an even number 4
    haystack does not contain even numbers
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido ser [EqualityComparable](<#/doc/named_req/EqualityComparable>), mas o tipo de valor de `InputIt` pode não ser `T` | removeu o requisito

### Veja também

[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicate)
(modelo de função)
[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(modelo de função)
[ find_first_of](<#/doc/algorithm/find_first_of>) | busca por qualquer um de um conjunto de elementos
(modelo de função)
[ mismatch](<#/doc/algorithm/mismatch>) | encontra a primeira posição onde dois ranges diferem
(modelo de função)
[ search](<#/doc/algorithm/search>) | busca pela primeira ocorrência de um range de elementos
(modelo de função)
[ ranges::findranges::find_ifranges::find_if_not](<#/doc/algorithm/ranges/find>)(C++20)(C++20)(C++20) | encontra o primeiro elemento que satisfaz critérios específicos
(objeto de função de algoritmo)