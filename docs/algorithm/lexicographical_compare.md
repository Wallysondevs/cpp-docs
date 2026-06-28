# std::lexicographical_compare

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt1, class InputIt2 >
bool lexicographical_compare( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2 );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2 >
bool lexicographical_compare( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2 );
template< class InputIt1, class InputIt2, class Compare >
bool lexicographical_compare( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2,
Compare comp );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class Compare >
bool lexicographical_compare( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2,
Compare comp );
```

Verifica se o primeiro range `[`first1`, `last1`)` é lexicograficamente _menor_ que o segundo range `[`first2`, `last2`)`.

1) Elementos são comparados usando o operador<.

3) Elementos são comparados usando a função de comparação binária `comp` fornecida.

2,4) O mesmo que (1,3), mas executado de acordo com a `policy`. Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

A comparação lexicográfica é uma operação com as seguintes propriedades:

*   Dois ranges são comparados elemento por elemento.
*   O primeiro elemento divergente define qual range é lexicograficamente _menor_ ou _maior_ que o outro.
*   Se um range é um prefixo de outro, o range mais curto é lexicograficamente _menor_ que o outro.
*   Se dois ranges têm elementos equivalentes e são do mesmo comprimento, então os ranges são lexicograficamente _iguais_.
*   Um range vazio é lexicograficamente _menor_ que qualquer range não vazio.
*   Dois ranges vazios são lexicograficamente _iguais_.

### Parâmetros

- **first1, last1** — o primeiro range de elementos a examinar
- **first2, last2** — o segundo range de elementos a examinar
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna true se o primeiro argumento é _menor_ que o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que objetos dos tipos `InputIt1` e `InputIt2` possam ser desreferenciados e então implicitamente convertidos para `Type1` e `Type2`.
Requisitos de tipo
-`InputIt1, InputIt2` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Compare` deve satisfazer os requisitos de [Compare](<#/doc/named_req/Compare>).

### Valor de retorno

true se o primeiro range é lexicograficamente _menor_ que o segundo, caso contrário false.

### Complexidade

Dado \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1,2) No máximo \\(\scriptsize 2\min(N_1,N_2)\\)2min(1,N2) comparações usando o operador<.

3,4) No máximo \\(\scriptsize 2\min(N_1,N_2)\\)2min(N1,N2) aplicações da função de comparação `comp`.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

[lexicographical_compare (1)](<#/doc/algorithm/lexicographical_compare>)
---
```cpp
    template<class InputIt1, class InputIt2>
    bool lexicographical_compare(InputIt1 first1, InputIt1 last1,
                                 InputIt2 first2, InputIt2 last2)
    {
        for (; (first1 != last1) && (first2 != last2); ++first1, (void) ++first2)
        {
            if (*first1 < *first2)
                return true;
            if (*first2 < *first1)
                return false;
        }
    
        return (first1 == last1) && (first2 != last2);
    }
```

[lexicographical_compare (3)](<#/doc/algorithm/lexicographical_compare>)
```cpp
    template<class InputIt1, class InputIt2, class Compare>
    bool lexicographical_compare(InputIt1 first1, InputIt1 last1,
                                 InputIt2 first2, InputIt2 last2, Compare comp)
    {
        for (; (first1 != last1) && (first2 != last2); ++first1, (void) ++first2)
        {
            if (comp(*first1, *first2))
                return true;
            if (comp(*first2, *first1))
                return false;
        }
    
        return (first1 == last1) && (first2 != last2);
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <random>
    #include <vector>
    
    void print(const std::vector<char>& v, auto suffix)
    {
        for (char c : v)
            std::cout << c << ' ';
        std::cout << suffix;
    }
    
    int main()
    {
        std::vector<char> v1{'a', 'b', 'c', 'd'};
        std::vector<char> v2{'a', 'b', 'c', 'd'};
    
        for (std::mt19937 g{std::random_device{}()};
             !std::lexicographical_compare(v1.begin(), v1.end(),
                                           v2.begin(), v2.end());)
        {
            print(v1, ">= ");
            print(v2, '\n');
    
            std::shuffle(v1.begin(), v1.end(), g);
            std::shuffle(v2.begin(), v2.end(), g);
        }
    
        print(v1, "<  ");
        print(v2, '\n');
    }
```

Saída possível:
```
    a b c d >= a b c d 
    d a b c >= c b d a 
    b d a c >= a d c b 
    a c d b <  c d a b
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 142](<https://cplusplus.github.io/LWG/issue142>) | C++98 | no máximo \\(\scriptsize \min(N_1,N_2)\\)min(N1,N2) comparações eram permitidas, mas isso não é possível (a equivalência é determinada por 2 comparações) | dobrou o limite
[LWG 1205](<https://cplusplus.github.io/LWG/issue1205>) | C++98 | os resultados de comparações lexicográficas envolvendo ranges vazios eram pouco claros | tornou claro

### Ver também

[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)
[ lexicographical_compare_three_way](<#/doc/algorithm/lexicographical_compare_three_way>)(C++20) | compara dois ranges usando comparação de três vias
(modelo de função)
[ ranges::lexicographical_compare](<#/doc/algorithm/ranges/lexicographical_compare>)(C++20) | retorna true se um range é lexicograficamente menor que outro
(objeto de função de algoritmo)