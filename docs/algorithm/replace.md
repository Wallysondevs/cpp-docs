# std::replace, std::replace_if

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class T >
void replace( ForwardIt first, ForwardIt last,
const T& old_value, const T& new_value );
(até C++26)
template< class ForwardIt, class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr void replace( ForwardIt first, ForwardIt last,
const T& old_value, const T& new_value );
template< class ExecutionPolicy, class ForwardIt, class T >
void replace( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
const T& old_value, const T& new_value );
(até C++26)
template< class ExecutionPolicy, class ForwardIt,
class T = typename std::iterator_traits
<ForwardIt>::value_type >
void replace( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
const T& old_value, const T& new_value );
template< class ForwardIt, class UnaryPred, class T >
void replace_if( ForwardIt first, ForwardIt last,
UnaryPred p, const T& new_value );
(até C++26)
template< class ForwardIt, class UnaryPred,
class T = typename std::iterator_traits
<ForwardIt>::value_type> >
constexpr void replace_if( ForwardIt first, ForwardIt last,
UnaryPred p, const T& new_value );
template< class ExecutionPolicy,
class ForwardIt, class UnaryPred, class T >
void replace_if( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
UnaryPred p, const T& new_value );
(até C++26)
template< class ExecutionPolicy,
class ForwardIt, class UnaryPred,
class T = typename std::iterator_traits
<ForwardIt>::value_type> >
void replace_if( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
UnaryPred p, const T& new_value );
```

Substitui todos os elementos no range `[`first`, `last`)` por new_value se eles satisfizerem critérios específicos.

1) Substitui todos os elementos que são iguais a old_value (usando operator==).

3) Substitui todos os elementos para os quais o predicado p retorna true.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as condições a seguir forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se `*first = new_value` for inválido (até C++20) `new_value` não for [gravável](<#/doc/iterator>) para `first` (desde C++20), o programa é malformado (ill-formed).

### Parâmetros

- **first, last** — o range de elementos a processar
- **old_value** — o valor dos elementos a substituir
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna true se o valor do elemento deve ser substituído.
A expressão `p(v)` deve ser conversível para `bool` para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `ForwardIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro `VT&` não é permitido, nem `VT` a menos que para `VT` um move seja equivalente a uma cópia (desde C++11).
- **new_value** — o valor a ser usado como substituto
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`UnaryPred` deve satisfazer os requisitos de [Predicate](<#/doc/named_req/Predicate>).

### Valor de retorno

(nenhum)

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize N\\)N comparações usando operator==.

3,4) Exatamente \\(\scriptsize N\\)N aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Observações

Como o algoritmo recebe `old_value` e `new_value` por referência, ele pode ter um comportamento inesperado se um deles for uma referência a um elemento do range `[`first`, `last`)`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1-4](<#/doc/algorithm/replace>))

### Implementação possível

[replace](<#/doc/algorithm/replace>)
---
```cpp
    template<class ForwardIt,
             class T = typename std::iterator_traits<ForwardIt>::value_type>
    void replace(ForwardIt first, ForwardIt last,
                 const T& old_value, const T& new_value)
    {
        for (; first != last; ++first)
            if (*first == old_value)
                *first = new_value;
    }
```

[replace_if](<#/doc/algorithm/replace>)
```cpp
    template<class ForwardIt, class UnaryPred,
             class T = typename std::iterator_traits<ForwardIt>::value_type>
    void replace_if(ForwardIt first, ForwardIt last,
                    UnaryPred p, const T& new_value)
    {
        for (; first != last; ++first)
            if (p(*first))
                *first = new_value;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <complex>
    #include <functional>
    #include <iostream>
     
    void println(const auto& seq)
    {
        for (const auto& e : seq)
            std::cout << e << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        std::array<int, 10> s{5, 7, 4, 2, 8, 6, 1, 9, 0, 3};
     
        // Replace all occurrences of 8 with 88.
        std::replace(s.begin(), s.end(), 8, 88);
        println(s);
     
        // Replace all values less than 5 with 55.
        std::replace_if(s.begin(), s.end(), 
                        std::bind(std::less<int>(), std::placeholders::_1, 5), 55);
        println(s);
     
        std::array<std::complex<double>, 2> nums{{{1, 3}, {1, 3}}};
        #ifdef __cpp_lib_algorithm_default_value_type
            std::replace(nums.begin(), nums.end(), {1, 3}, {4, 2});
        #else
            std::replace(nums.begin(), nums.end(), std::complex<double>{1, 3},
                                                   std::complex<double>{4, 2});
        #endif
        println(nums);
    }
```

Saída:
```
    5 7 4 2 88 6 1 9 0 3
    5 7 55 55 88 6 55 9 55 55
    (4,2), (4,2)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido como [CopyAssignable](<#/doc/named_req/CopyAssignable>) (e [EqualityComparable](<#/doc/named_req/EqualityComparable>) para `replace`), mas o tipo de valor de `ForwardIt` nem sempre é `T` e `T` nem sempre é gravável para `ForwardIt` | exigido `*first = new_value` para ser válido em vez disso

### Veja também

[ replace_copyreplace_copy_if](<#/doc/algorithm/replace_copy>) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(modelo de função)
[ ranges::replaceranges::replace_if](<#/doc/algorithm/ranges/replace>)(C++20)(C++20) | substitui todos os valores que satisfazem critérios específicos por outro valor
(objeto de função de algoritmo)