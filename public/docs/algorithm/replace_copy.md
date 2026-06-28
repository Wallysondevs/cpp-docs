# std::replace_copy, std::replace_copy_if

Definido no header `[<algorithm>](<#/doc/header/algorithm>)`

```cpp
template< class InputIt, class OutputIt, class T >
OutputIt replace_copy( InputIt first, InputIt last, OutputIt d_first,
const T& old_value, const T& new_value );  // (1)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class T >
ForwardIt2 replace_copy
( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first,
const T& old_value, const T& new_value );  // (2) (desde C++17)
  // (3)
template< class InputIt, class OutputIt, class UnaryPred, class T >
OutputIt replace_copy_if
( InputIt first, InputIt last, OutputIt d_first,
UnaryPred p, const T& new_value );
(até C++26)
template< class InputIt, class OutputIt, class UnaryPred,
class T = typename std::iterator_traits
<OutputIt>::value_type >
constexpr OutputIt replace_copy_if
( InputIt first, InputIt last, OutputIt d_first,
UnaryPred p, const T& new_value );  // (desde C++26)
  // (4)
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2,
class UnaryPred, class T >
ForwardIt2 replace_copy_if
( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first,
UnaryPred p, const T& new_value );  // (desde C++17)
(até C++26)
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2,
class UnaryPred, class T = typename std::iterator_traits
<ForwardIt2>::value_type >
ForwardIt2 replace_copy_if
( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first,
UnaryPred p, const T& new_value );  // (desde C++26)
```

Copia os elementos do range `[`first`, `last`)` para outro range começando em d_first, enquanto substitui todos os elementos que satisfazem critérios específicos por new_value.

1) Substitui todos os elementos que são iguais a old_value (usando operator==).

3) Substitui todos os elementos para os quais o predicado p retorna true.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se qualquer um dos resultados das expressões *first e new_value não for [gravável](<#/doc/iterator>) em d_first, o programa é malformado.

Se os ranges de origem e destino se sobrepuserem, o comportamento é indefinido.

### Parâmetros

- **first, last** — o range de elementos a copiar
- **d_first** — o início do range de destino
- **old_value** — o valor dos elementos a substituir
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado unário que retorna true se o valor do elemento deve ser substituído.
A expressão p(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `VT`, onde `VT` é o tipo de valor de `InputIt`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro de VT& não é permitido, nem VT a menos que para `VT` um move seja equivalente a uma cópia (desde C++11).
- **new_value** — o valor a ser usado como substituto
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator para o elemento após o último elemento copiado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize N\\)N comparações usando operator==.

3,4) Exatamente \\(\scriptsize N\\)N aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[replace_copy](<#/doc/algorithm/replace_copy>)
---
```cpp
    template<class InputIt, class OutputIt, class T>
    OutputIt replace_copy(InputIt first, InputIt last, OutputIt d_first,
                          const T& old_value, const T& new_value)
    {
        for (; first != last; ++first)
            *d_first++ = (*first == old_value) ? new_value : *first;
        return d_first;
    }
```

[replace_copy_if](<#/doc/algorithm/replace_copy>)
```cpp
    template<class InputIt, class OutputIt, class UnaryPred,
             class T = typename std::iterator_traits<ForwardIt>::value_type>
    OutputIt replace_copy_if(InputIt first, InputIt last, OutputIt d_first,
                             UnaryPred p, const T& new_value)
    {
        for (; first != last; ++first)
            *d_first++ = p(*first) ? new_value : *first;
        return d_first;
    }
```

### Observações

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([3,4](<#/doc/algorithm/replace_copy>))

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
        std::vector<short> src{3, 1, 4, 1, 5, 9, 2, 6, 5};
        println(src);
        std::vector<int> dst(src.size());
        std::replace_copy_if(src.cbegin(), src.cend(),
                             dst.begin(),
                             { return n > 5; }, 0);
        println(dst);
    
        std::vector<std::complex<double>> src2{{1, 3}, {2, 4}, {3, 5}},
                                          dst2(src2.size());
        println(src2);
        #ifdef __cpp_lib_algorithm_default_value_type
            std::replace_copy_if(src2.cbegin(), src2.cend(), dst2.begin(),
                <double> z){ return std::abs(z) < 5; },
                {4, 2}); // Possible, since the T is deduced.
        #else
            std::replace_copy_if(src2.cbegin(), src2.cend(), dst2.begin(),
                <double> z){ return std::abs(z) < 5; },
                std::complex<double>{4, 2});
        #endif
        println(dst2);
    }
```

Saída:
```
    3 1 4 1 5 9 2 6 5 
    3 1 4 1 5 0 2 0 5 
    (1,3) (2,4) (3,5) 
    (4,2) (4,2) (3,5)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido ser [CopyAssignable](<#/doc/named_req/CopyAssignable>) (e [EqualityComparable](<#/doc/named_req/EqualityComparable>) para
`replace_copy`), mas o tipo de valor de `InputIt` nem sempre é `T` | removeu o requisito
[LWG 337](<https://cplusplus.github.io/LWG/issue337>) | C++98 | `replace_copy_if` exigia apenas que `InputIt`
satisfizesse os requisitos de [LegacyIterator](<#/doc/named_req/Iterator>)[1](<#/doc/algorithm/replace_copy>) | corrigido para
[LegacyInputIterator](<#/doc/named_req/InputIterator>)

1. [↑](<#/doc/algorithm/replace_copy>) O defeito real no padrão C++ é que o parâmetro de template `InputIterator` foi especificado incorretamente como `Iterator`. Isso afeta os requisitos de tipo porque o padrão C++ afirma que para os function templates na biblioteca de algoritmos, os parâmetros de tipo de template cujo nome termina com `Iterator` implicam os requisitos de tipo das categorias de iterator correspondentes.

### Veja também

[ replacereplace_if](<#/doc/algorithm/replace>) | substitui todos os valores que satisfazem critérios específicos por outro valor
(function template)
[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(function template)
[ ranges::replace_copyranges::replace_copy_if](<#/doc/algorithm/ranges/replace_copy>)(C++20)(C++20) | copia um range, substituindo elementos que satisfazem critérios específicos por outro valor
(algorithm function object)