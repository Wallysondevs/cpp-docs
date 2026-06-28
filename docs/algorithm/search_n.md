# std::search_n

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class Size, class T >
ForwardIt search_n( ForwardIt first, ForwardIt last,
Size count, const T& value );
(até C++26)
template< class ForwardIt, class Size,
class T = typename std::iterator_traits
<ForwardIt>::value_type >
constexpr ForwardIt search_n( ForwardIt first, ForwardIt last,
Size count, const T& value );
template< class ExecutionPolicy,
class ForwardIt, class Size, class T >
ForwardIt search_n( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
Size count, const T& value );
(até C++26)
template< class ExecutionPolicy,
class ForwardIt, class Size,
class T = typename std::iterator_traits
<ForwardIt>::value_type >
ForwardIt search_n( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
Size count, const T& value );
template< class ForwardIt, class Size, class T, class BinaryPred >
ForwardIt search_n( ForwardIt first, ForwardIt last,
Size count, const T& value, BinaryPred p );
(até C++26)
template< class ForwardIt, class Size,
class T = typename std::iterator_traits
<ForwardIt>::value_type,
class BinaryPred >
constexpr ForwardIt search_n( ForwardIt first, ForwardIt last,
Size count, const T& value, BinaryPred p );
template< class ExecutionPolicy, class ForwardIt, class Size,
class T, class BinaryPred >
ForwardIt search_n( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
Size count, const T& value, BinaryPred p );
(até C++26)
template< class ExecutionPolicy, class ForwardIt, class Size,
class T = typename std::iterator_traits
<ForwardIt>::value_type,
class BinaryPred >
ForwardIt search_n( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last,
Size count, const T& value, BinaryPred p );
```

Procura no range `[`first`, `last`)` pela primeira sequência de `count` elementos idênticos, cada um igual ao `value` fornecido.

1) Os elementos são comparados usando `operator==`.

3) Os elementos são comparados usando o predicado binário `p` fornecido.

2,4) O mesmo que (1,3), mas executado de acordo com a `policy`.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é `true`. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é `true`. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a examinar
- **count** — o comprimento da sequência a procurar
- **value** — o valor dos elementos a procurar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a usar
- **p** — predicado binário que retorna `true` se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: `bool pred(const Type1 &a, const Type2 &b);` Embora a assinatura não precise ter `const &`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1 &` não é permitido, nem `Type1` a menos que para `Type1` um `move` seja equivalente a uma `copy` (desde C++11)).
O tipo `Type1` deve ser tal que um objeto do tipo `ForwardIt` possa ser desreferenciado e então implicitamente convertido para `Type1`. O tipo `Type2` deve ser tal que um objeto do tipo `T` possa ser implicitamente convertido para `Type2`.
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`BinaryPred` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>).
-`Size` deve ser [convertível](<#/doc/language/implicit_cast>) para um [tipo integral](<#/doc/language/type-id>).

### Valor de retorno

Se `count` for positivo, retorna um iterator para o início da primeira sequência encontrada no range `[`first`, `last`)`. Cada iterator `it` na sequência deve satisfazer a seguinte condição:

1,2) `*it == value` é `true`.

3,4) `p(*it, value) != false` é `true`.

Se nenhuma sequência for encontrada, `last` é retornado.

Se `count` for zero ou negativo, `first` é retornado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) No máximo \\(\scriptsize N\\)N comparações usando `operator==`.

3,4) No máximo \\(\scriptsize N\\)N aplicações do predicado `p`.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[search_n (1)](<#/doc/algorithm/search_n>)
---
```cpp
    template<class ForwardIt, class Size,
             class T = typename std::iterator_traits<ForwardIt>::value_type>
    ForwardIt search_n(ForwardIt first, ForwardIt last, Size count, const T& value)
    {
        if (count <= 0)
            return first;
    
        for (; first != last; ++first)
        {
            if (!(*first == value))
                continue;
    
            ForwardIt candidate = first;
    
            for (Size cur_count = 1; true; ++cur_count)
            {
                if (cur_count >= count)
                    return candidate; // success
    
                ++first;
                if (first == last)
                    return last; // exhausted the list
    
                if (!(*first == value))
                    break; // too few in a row
            }
        }
        return last;
    }
```

[search_n (3)](<#/doc/algorithm/search_n>)
```cpp
    template<class ForwardIt, class Size,
             class T = typename std::iterator_traits<ForwardIt>::value_type,
             class BinaryPred>
    ForwardIt search_n(ForwardIt first, ForwardIt last, Size count, const T& value,
                       BinaryPred p)
    {
        if (count <= 0)
            return first;
    
        for (; first != last; ++first)
        {
            if (!p(*first, value))
                continue;
    
            ForwardIt candidate = first;
    
            for (Size cur_count = 1; true; ++cur_count)
            {
                if (cur_count >= count)
                    return candidate; // success
    
                ++first;
                if (first == last)
                    return last; // exhausted the list
    
                if (!p(*first, value))
                    break; // too few in a row
            }
        }
        return last;
    }
```

### Notas

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmos ([1-4](<#/doc/algorithm/search_n>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <complex>
    #include <iostream>
    #include <iterator>
    #include <vector>
    
    template<class Container, class Size, class T>
    constexpr bool consecutive_values(const Container& c, Size count, const T& v)
    {
        return std::search_n(std::begin(c), std::end(c), count, v) != std::end(c);
    }
    
    int main()
    {
        constexpr char sequence[] = ".0_0.000.0_0.";
    
        static_assert(consecutive_values(sequence, 3, '0'));
    
        for (int n : {4, 3, 2})
            std::cout << std::boolalpha
                      << "Has " << n << " consecutive zeros: "
                      << consecutive_values(sequence, n, '0') << '\n';
    
        std::vector<std::complex<double>> nums{{4, 2}, {4, 2}, {1, 3}};
        #ifdef __cpp_lib_algorithm_default_value_type
            auto it = std::search_n(nums.cbegin(), nums.cend(), 2, {4, 2});
        #else
            auto it = std::search_n(nums.cbegin(), nums.cend(), 2, std::complex<double>{4, 2});
        #endif
        assert(it == nums.begin());
    }
```

Saída:
```
    Has 4 consecutive zeros: false
    Has 3 consecutive zeros: true
    Has 2 consecutive zeros: true
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 283](<https://cplusplus.github.io/LWG/issue283>) | C++98 | `T` era exigido ser [EqualityComparable](<#/doc/named_req/EqualityComparable>), mas o tipo de valor de `InputIt` nem sempre é `T` | removido o requisito
[LWG 426](<https://cplusplus.github.io/LWG/issue426>) | C++98 | o limite superior de complexidade era `N·count`, é negativo se `count` for negativo | o limite superior é `0` se `count` for não-positivo
[LWG 714](<https://cplusplus.github.io/LWG/issue714>) | C++98 | se `count > 0`, o limite superior de complexidade era `N·count`, mas no pior caso o número de comparações/operações é sempre `N` | alterado o limite superior para `N` neste caso
[LWG 2150](<https://cplusplus.github.io/LWG/issue2150>) | C++98 | a condição de "ocorrência de sequência" estava incorreta | corrigida

### Veja também

[ find_end](<#/doc/algorithm/find_end>) | encontra a última sequência de elementos em um determinado range
(function template)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(function template)
[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(function template)
[ ranges::search_n](<#/doc/algorithm/ranges/search_n>)(C++20) | procura pela primeira ocorrência de um número de cópias consecutivas de um elemento em um range
(algorithm function object)