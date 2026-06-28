# std::mismatch

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt1, class InputIt2 >
std::pair<InputIt1, InputIt2>
mismatch( InputIt1 first1, InputIt1 last1,
InputIt2 first2 );
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
std::pair<ForwardIt1, ForwardIt2>
mismatch( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2 );
template< class InputIt1, class InputIt2, class BinaryPred >
std::pair<InputIt1, InputIt2>
mismatch( InputIt1 first1, InputIt1 last1,
InputIt2 first2, BinaryPred p );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryPred >
std::pair<ForwardIt1, ForwardIt2>
mismatch( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, BinaryPred p );
template< class InputIt1, class InputIt2 >
std::pair<InputIt1, InputIt2>
mismatch( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2 );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
std::pair<ForwardIt1, ForwardIt2>
mismatch( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2 );
template< class InputIt1, class InputIt2, class BinaryPred >
std::pair<InputIt1, InputIt2>
mismatch( InputIt1 first1, InputIt1 last1,
InputIt2 first2, InputIt2 last2, BinaryPred p );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryPred >
std::pair<ForwardIt1, ForwardIt2>
mismatch( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2, ForwardIt2 last2, BinaryPred p );
```

Retorna um par de iteradores para a primeira divergência de elementos de `[`first1`, `last1`)` e um range começando de first2:

  * Para as sobrecargas (1-4), o segundo range possui [std::distance](<#/doc/iterator/distance>)(first1, last1) elementos.
  * Para as sobrecargas (5-8), o segundo range é `[`first2`, `last2`)`.

  * Se [std::distance](<#/doc/iterator/distance>)(first1, last1) e [std::distance](<#/doc/iterator/distance>)(first2, last2) forem diferentes, a comparação para quando last1 ou last2 é alcançado.

1,5) Os elementos são comparados usando operator==.

3,7) Os elementos são comparados usando o predicado binário p fornecido.

2,4,6,8) O mesmo que (1,3,5,7), mas executado de acordo com a policy.

Estas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

### Parâmetros

- **first1, last1** — o primeiro range de elementos
- **first2, last2** — o segundo range de elementos
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado binário que retorna `true` se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: `bool pred(const Type1 &a, const Type2 &b);` Embora a assinatura não precise ter `const &`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2`, independentemente da [value category](<#/doc/language/value_category>) (assim, `Type1 &` não é permitido, nem `Type1`, a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que objetos dos tipos `InputIt1` e `InputIt2` possam ser desreferenciados e então implicitamente convertidos para `Type1` e `Type2`, respectivamente. ​
Requisitos de tipo
-`InputIt1` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`InputIt2` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt1` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`BinaryPred` deve satisfazer os requisitos de [BinaryPredicate](<#/doc/named_req/BinaryPredicate>).

### Valor de retorno

[std::pair](<#/doc/utility/pair>) com iteradores para os dois primeiros elementos não iguais.

Se last1 for alcançado, o segundo iterator no par é o [std::distance](<#/doc/iterator/distance>)(first1, last1)-ésimo iterator após first2.

Para as sobrecargas (5-8), se last2 for alcançado, o primeiro iterator no par é o [std::distance](<#/doc/iterator/distance>)(first2, last2)-ésimo iterator após first1.

### Complexidade

Dado \\(\scriptsize N_1\\)N1 como [std::distance](<#/doc/iterator/distance>)(first1, last1) e \\(\scriptsize N_2\\)N2 como [std::distance](<#/doc/iterator/distance>)(first2, last2):

1,2) No máximo \\(\scriptsize N_1\\)N1 comparações usando operator==.

3,4) No máximo \\(\scriptsize N_1\\)N1 aplicações do predicado p.

5,6) No máximo \\(\scriptsize \min(N_1,N_2)\\)min(N1,N2) comparações usando operator==.

7,8) No máximo \\(\scriptsize \min(N_1,N_2)\\)min(N1,N2) aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamado. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançado.

### Implementação possível

[mismatch (1)](<#/doc/algorithm/mismatch>)
```cpp
    template<class InputIt1, class InputIt2>
    std::pair<InputIt1, InputIt2>
        mismatch(InputIt1 first1, InputIt1 last1, InputIt2 first2)
    {
        while (first1 != last1 && *first1 == *first2)
            ++first1, ++first2;
    
        return std::make_pair(first1, first2);
    }
```

[mismatch (3)](<#/doc/algorithm/mismatch>)
```cpp
    template<class InputIt1, class InputIt2, class BinaryPred>
    std::pair<InputIt1, InputIt2>
        mismatch(InputIt1 first1, InputIt1 last1, InputIt2 first2, BinaryPred p)
    {
        while (first1 != last1 && p(*first1, *first2))
            ++first1, ++first2;
    
        return std::make_pair(first1, first2);
    }
```

[mismatch (5)](<#/doc/algorithm/mismatch>)
```cpp
    template<class InputIt1, class InputIt2>
    std::pair<InputIt1, InputIt2>
        mismatch(InputIt1 first1, InputIt1 last1, InputIt2 first2, InputIt2 last2)
    {
        while (first1 != last1 && first2 != last2 && *first1 == *first2)
            ++first1, ++first2;
    
        return std::make_pair(first1, first2);
    }
```

[mismatch (7)](<#/doc/algorithm/mismatch>)
```cpp
    template<class InputIt1, class InputIt2, class BinaryPred>
    std::pair<InputIt1, InputIt2>
        mismatch(InputIt1 first1, InputIt1 last1,
                 InputIt2 first2, InputIt2 last2, BinaryPred p)
    {
        while (first1 != last1 && first2 != last2 && p(*first1, *first2))
            ++first1, ++first2;
    
        return std::make_pair(first1, first2);
    }
```

### Exemplo

Este programa determina a substring mais longa que é encontrada simultaneamente no início da string fornecida e no final dela, em ordem inversa (possivelmente sobreposta).

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string>
    
    std::string mirror_ends(const std::string& in)
    {
        return std::string(in.begin(),
                           std::mismatch(in.begin(), in.end(), in.rbegin()).first);
    }
    
    int main()
    {
        std::cout << mirror_ends("abXYZba") << '\n'
                  << mirror_ends("abca") << '\n'
                  << mirror_ends("aba") << '\n';
    }
```

Saída:
```
    ab
    a
    aba
```

### Veja também

[ equal](<#/doc/algorithm/equal>) | determina se dois conjuntos de elementos são os mesmos
(modelo de função)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(modelo de função)
[ lexicographical_compare](<#/doc/algorithm/lexicographical_compare>) | retorna true se um range é lexicograficamente menor que outro
(modelo de função)
[ search](<#/doc/algorithm/search>) | procura pela primeira ocorrência de um range de elementos
(modelo de função)
[ ranges::mismatch](<#/doc/algorithm/ranges/mismatch>)(C++20) | encontra a primeira posição onde dois ranges diferem
(objeto de função de algoritmo)