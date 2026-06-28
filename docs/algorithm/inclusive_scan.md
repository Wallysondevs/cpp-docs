# std::inclusive_scan

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt, class OutputIt >
OutputIt inclusive_scan( InputIt first, InputIt last,
OutputIt d_first );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2 >
ForwardIt2 inclusive_scan( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first );
template< class InputIt, class OutputIt, class BinaryOp >
OutputIt inclusive_scan( InputIt first, InputIt last,
OutputIt d_first, BinaryOp op );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryOp >
ForwardIt2 inclusive_scan( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, BinaryOp op );
template< class InputIt, class OutputIt,
class BinaryOp, class T >
OutputIt inclusive_scan( InputIt first, InputIt last,
OutputIt d_first, BinaryOp op, T init );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class BinaryOp, class T >
ForwardIt2 inclusive_scan( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, BinaryOp op, T init );
```

1) Equivalente a inclusive_scan(first, last, d_first, [std::plus](<#/doc/utility/functional/plus>)<>().

3) Calcula a soma de prefixo inclusiva usando op.

Para cada inteiro i em `[`​0​`, `[std::distance](<#/doc/iterator/distance>)(first, last)`)`, executa as seguintes operações em ordem:

  1. Cria uma sequência formada pelos elementos de `[`first`, `iter`]` em ordem, onde iter é o i-ésimo próximo iterator de first.
  2. Calcula a soma não comutativa generalizada da sequência sobre op.
  3. Atribui o resultado a *dest, onde dest é o i-ésimo próximo iterator de d_first.

5) O mesmo que (3), mas cada sequência criada é formada por init seguido pelos elementos de `[`first`, `iter`]` em ordem.

2,4,6) O mesmo que (1,3,5), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

A _soma generalizada não comutativa_ de uma sequência de elementos sobre uma operação binária binary_op é definida como segue:

  * Se a sequência tiver apenas um elemento, a soma é o valor do elemento.
  * Caso contrário, executa as seguintes operações em ordem:

  1. Seleciona quaisquer dois elementos adjacentes elem1 e elem2 da sequência.
  2. Calcula binary_op(elem1, elem2) e substitui os dois elementos na sequência pelo resultado.
  3. Repete os passos 1 e 2 até que haja apenas um elemento na sequência.

Dado binary_op como a operação binária real:

  * O resultado é não determinístico se binary_op não for associativa (como a adição de ponto flutuante).

  * Para as sobrecargas (1-4), se binary_op(*first, *first) não for conversível para o [tipo de valor](<#/doc/iterator>) de decltype(first), o programa é malformado.

  * Para as sobrecargas (5,6), se qualquer um dos seguintes valores não for conversível para `T`, o programa é malformado:

    

  * binary_op(init, *first)
  * binary_op(init, init)
  * binary_op(*first, *first)

  * Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

    

  * Para as sobrecargas (1-4), o tipo de valor de decltype(first) não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * Para as sobrecargas (5,6), `T` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * binary_op modifica qualquer elemento de `[`first`, `last`)`.
  * binary_op invalida qualquer iterator ou sub-range de `[`first`, `last`]`.

### Parâmetros

- **first, last** — o range de elementos a somar
- **d_first** — o início do range de destino; pode ser igual a first
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **init** — o valor inicial
- **op** — [FunctionObject](<#/doc/named_req/FunctionObject>) binário que será aplicado ao resultado da desreferenciação dos iterators de entrada, aos resultados de outras operações op, e a init (se fornecido)
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator para o elemento após o último elemento escrito.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) \\(\scriptsize O(N)\\)O(N) aplicações de [std::plus](<#/doc/utility/functional/plus>)<>().

3-6) \\(\scriptsize O(N)\\)O(N) aplicações de op.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
    
    int main()
    {
        std::vector data{3, 1, 4, 1, 5, 9, 2, 6};
    
        std::cout << "Exclusive sum: ";
        std::exclusive_scan(data.begin(), data.end(),
                            std::ostream_iterator<int>(std::cout, " "),
                            0);
    
        std::cout << "\nInclusive sum: ";
        std::inclusive_scan(data.begin(), data.end(),
                            std::ostream_iterator<int>(std::cout, " "));
    
        std::cout << "\n\nExclusive product: ";
        std::exclusive_scan(data.begin(), data.end(),
                            std::ostream_iterator<int>(std::cout, " "),
                            1, std::multiplies<>{});
    
        std::cout << "\nInclusive product: ";
        std::inclusive_scan(data.begin(), data.end(),
                            std::ostream_iterator<int>(std::cout, " "),
                            std::multiplies<>{});
    }
```

Saída:
```
    Exclusive sum: 0 3 4 8 9 14 23 25
    Inclusive sum: 3 4 8 9 14 23 25 31
    
    Exclusive product: 1 3 3 12 12 60 540 1080
    Inclusive product: 3 3 12 12 60 540 1080 6480
```

### Veja também

[ adjacent_difference](<#/doc/algorithm/adjacent_difference>) | calcula as diferenças entre elementos adjacentes em um range
(modelo de função)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou "dobra" um range de elementos
(modelo de função)
[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)
[ transform_inclusive_scan](<#/doc/algorithm/transform_inclusive_scan>)(C++17) | aplica um invocável, então calcula o scan inclusivo
(modelo de função)
[ exclusive_scan](<#/doc/algorithm/exclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), exclui o i-ésimo elemento de entrada da i-ésima soma
(modelo de função)