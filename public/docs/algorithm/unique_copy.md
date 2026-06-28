# std::unique_copy

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class OutputIt >
OutputIt unique_copy( InputIt first, InputIt last, OutputIt d_first );
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
ForwardIt2 unique_copy( ExecutionPolicy&& policy, ForwardIt1 first,
ForwardIt1 last, ForwardIt2 d_first );
template< class InputIt, class OutputIt, class BinaryPred >
OutputIt unique_copy( InputIt first, InputIt last,
OutputIt d_first, BinaryPred p );
template< class ExecutionPolicy, class ForwardIt1,
class ForwardIt2, class BinaryPred >
ForwardIt2 unique_copy( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, BinaryPred p );
```

Copia os elementos do range `[`first`, `last`)` para outro range começando em d_first de tal forma que não haja elementos consecutivos iguais. Apenas o primeiro elemento de cada grupo de elementos iguais é copiado.

1) Os elementos são comparados usando operator==.

Se operator== não estabelecer uma [relação de equivalência](<https://en.wikipedia.org/wiki/equivalence_relation> "enwiki:equivalence relation"), o comportamento é indefinido.

3) Os elementos são comparados usando o predicado binário p fornecido.

Se p não estabelecer uma relação de equivalência, o comportamento é indefinido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se `*d_first = *first` for inválido (até C++20) ou `*first` não for [gravável](<#/doc/iterator>) para `d_first` (desde C++20), o programa é malformado.

Se os ranges de origem e destino se sobrepuserem, o comportamento é indefinido.

Dado `T` como o tipo de valor de `InputIt`, se a sobrecarga (1) ou (3) **não** satisfizer todas as seguintes condições, o comportamento é indefinido:

*   `InputIt` atende aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

| (até C++20)

*   `InputIt` modela [`forward_iterator`](<#/doc/iterator/forward_iterator>).

| (desde C++20)

*   `T` é tanto [CopyConstructible](<#/doc/named_req/CopyConstructible>) quanto [CopyAssignable](<#/doc/named_req/CopyAssignable>).
*   Todas as seguintes condições são satisfeitas:

    

*   `OutputIt` atende aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
*   O tipo de valor de `OutputIt` também é `T`.
*   `T` é [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

- **first, last** — o range de elementos a processar
- **d_first** — o início do range de destino
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado binário que retorna ​true se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: `bool pred(const Type1 &a, const Type2 &b);` Embora a assinatura não precise ter `const &`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1 &` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo InputIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve atender aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` devem atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Output iterator para o elemento após o último elemento escrito.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize max(0,N-1)\\)max(0,N-1) comparações usando operator==.

3,4) Exatamente \\(\scriptsize max(0,N-1)\\)max(0,N-1) aplicações do predicado p.

Para as sobrecargas (2,4), pode haver um custo de desempenho se o tipo de valor de `ForwardIt1` não for tanto [CopyConstructible](<#/doc/named_req/CopyConstructible>) quanto [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Exceções

As sobrecargas com um parâmetro template chamado `ExecutionPolicy` reportam erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1046>) e [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L2177>).

### Notas

Se `InputIt` satisfaz [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), esta função relê a entrada para detectar duplicatas.

Caso contrário, se `OutputIt` satisfaz [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>), e o tipo de valor de `InputIt` é o mesmo que o de `OutputIt`, esta função compara `*d_first` com `*first`.

Caso contrário, esta função compara `*first` com uma cópia local do elemento.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::string s1 {"A string with mmmany letters!"};
        std::cout << "Before: " << s1 << '\n';
    
        std::string s2;
        std::unique_copy(s1.begin(), s1.end(), std::back_inserter(s2),
                          { return c1 == 'm' && 'm' == c2; });
    
        std::cout << "After:  " << s2 << '\n';
    }
```

Saída:
```
    Before: A string with mmmany letters!
    After:  A string with many letters!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 239](<https://cplusplus.github.io/LWG/issue239>) | C++98 | o predicado foi aplicado [std::distance](<#/doc/iterator/distance>)(first, last) vezes | aplicado uma vez a menos
(para ranges não vazios)
[LWG 241](<https://cplusplus.github.io/LWG/issue241>) | C++98 | o tipo de valor de `InputIt` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) | condicionalmente exigido
---|---|---|---
[LWG 538](<https://cplusplus.github.io/LWG/issue538>) | C++98 | o tipo de valor de `InputIt` não era exigido ser [CopyAssignable](<#/doc/named_req/CopyAssignable>) | condicionalmente exigido
[LWG 2439](<https://cplusplus.github.io/LWG/issue2439>) | C++98 | o tipo de valor de `InputIt` não era exigido ser
[CopyConstructible](<#/doc/named_req/CopyConstructible>) se `OutputIt` for um [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>) | condicionalmente exigido

### Veja também

[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[ unique](<#/doc/algorithm/unique>) | remove elementos duplicados consecutivos em um range
(modelo de função)
[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(modelo de função)
[ ranges::unique_copy](<#/doc/algorithm/ranges/unique_copy>)(C++20) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(objeto de função de algoritmo)