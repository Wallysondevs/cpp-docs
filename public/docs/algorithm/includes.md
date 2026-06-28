# std::includes

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt1, class InputIt2 >
bool includes( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2 );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2 >
bool includes( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2 );
template< class InputIt1, class InputIt2, class Compare >
bool includes( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2, Compare comp );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class Compare >
bool includes( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2, Compare comp );
```

Retorna true se o range ordenado `[`first2`, `last2`)` é uma [subsequência](<https://en.wikipedia.org/wiki/subsequence> "enwiki:subsequence") do range ordenado `[`first1`, `last1`)` (uma subsequência não precisa ser contígua).

1) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver [ordenado](<#/doc/algorithm>) em relação ao operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20), o comportamento é indefinido.

3) Se `[`first1`, `last1`)` ou `[`first2`, `last2`)` não estiver ordenado em relação a comp, o comportamento é indefinido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (ate C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first1, last1** — o range ordenado de elementos a examinar
- **first2, last2** — o range ordenado de elementos a procurar
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna ​true se o primeiro argumento é _menor_ que (isto é, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo InputIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`InputIt1, InputIt2` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

true se `[`first2`, `last2`)` é uma subsequência de `[`first1`, `last1`)`; caso contrário, false.

Uma sequência vazia é uma subsequência de qualquer sequência, então true é retornado se `[`first2`, `last2`)` estiver vazio.

### Complexidade

Dada \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1,2) No máximo \\(\scriptsize 2 \cdot (N_1+N_2)-1\\)2⋅(N1+N2)-1 comparações usando operator<(ate C++20)[std::less](<#/doc/utility/functional/less>){}(desde C++20).

3,4) No máximo \\(\scriptsize 2 \cdot (N_1+N_2)-1\\)2⋅(N1+N2)-1 aplicações da função de comparação comp.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[include (1)](<#/doc/algorithm/includes>)
---
```cpp
    template<class InputIt1, class InputIt2>
    bool includes(InputIt1 first1, InputIt1 last1,
                  InputIt2 first2, InputIt2 last2)
    {
        for (; first2 != last2; ++first1)
        {
            if (first1 == last1 || *first2 < *first1)
                return false;
            if (!(*first1 < *first2))
                ++first2;
        }
        return true;
    }
```

[include (3)](<#/doc/algorithm/includes>)
```cpp
    template<class InputIt1, class InputIt2, class Compare>
    bool includes(InputIt1 first1, InputIt1 last1,
                  InputIt2 first2, InputIt2 last2, Compare comp)
    {
        for (; first2 != last2; ++first1)
        {
            if (first1 == last1 || comp(*first2, *first1))
                return false;
            if (!comp(*first1, *first2))
                ++first2;
        }
        return true;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cctype>
    #include <iostream>
    
    template<class Os, class Co>
    Os& operator<<(Os& os, const Co& v)
    {
        for (const auto& i : v)
            os << i << ' ';
        return os << '\t';
    }
    
    int main()
    {
        const auto
            v1 = {'a', 'b', 'c', 'f', 'h', 'x'},
            v2 = {'a', 'b', 'c'},
            v3 = {'a', 'c'},
            v4 = {'a', 'a', 'b'},
            v5 = {'g'},
            v6 = {'a', 'c', 'g'},
            v7 = {'A', 'B', 'C'};
    
        auto no_case =  { return std::tolower(a) < std::tolower(b); };
    
        std::cout
        << v1 << "\nincludes:\n" << std::boolalpha
        << v2 << ": " << std::includes(v1.begin(), v1.end(), v2.begin(), v2.end()) << '\n'
        << v3 << ": " << std::includes(v1.begin(), v1.end(), v3.begin(), v3.end()) << '\n'
        << v4 << ": " << std::includes(v1.begin(), v1.end(), v4.begin(), v4.end()) << '\n'
        << v5 << ": " << std::includes(v1.begin(), v1.end(), v5.begin(), v5.end()) << '\n'
        << v6 << ": " << std::includes(v1.begin(), v1.end(), v6.begin(), v6.end()) << '\n'
        << v7 << ": " << std::includes(v1.begin(), v1.end(), v7.begin(), v7.end(), no_case)
              << " (case-insensitive)\n";
    }
```

Saída:
```
    a b c f h x
    includes:
    a b c   : true
    a c     : true
    a a b   : false
    g       : false
    a c g   : false
    A B C   : true (case-insensitive)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 1205](<https://cplusplus.github.io/LWG/issue1205>) | C++98 | o valor de retorno era incerto se `[`first2`, `last2`)` estivesse vazio | retorna true neste caso

### Veja também

[ set_difference](<#/doc/algorithm/set_difference>) | calcula a diferença entre dois conjuntos
(modelo de função)
[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(modelo de função)
[ ranges::includes](<#/doc/algorithm/ranges/includes>)(C++20) | retorna true se uma sequência é uma subsequência de outra
(objeto de função de algoritmo)