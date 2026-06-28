# std::transform_inclusive_scan

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt, class OutputIt,
class BinaryOp, class UnaryOp >
OutputIt transform_inclusive_scan
( InputIt first, InputIt last, OutputIt d_first,
BinaryOp binary_op, UnaryOp unary_op );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class BinaryOp, class UnaryOp >
ForwardIt2 transform_inclusive_scan
( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first,
BinaryOp binary_op, UnaryOp unary_op );
template< class InputIt, class OutputIt,
class BinaryOp, class UnaryOp, class T >
OutputIt transform_inclusive_scan
( InputIt first, InputIt last, OutputIt d_first,
BinaryOp binary_op, UnaryOp unary_op, T init );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class BinaryOp, class UnaryOp, class T >
ForwardIt2 transform_inclusive_scan
( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first,
BinaryOp binary_op, UnaryOp unary_op, T init );
```

1) Calcula a soma de prefixo inclusiva usando op.

Para cada inteiro i em `[`0`, `[std::distance](<#/doc/iterator/distance>)(first, last)`)`, executa as seguintes operações em ordem:

  1. Cria uma sequência formada pelos valores transformados dos elementos de `[`first`, `iter`]` em ordem por unary_op, onde iter é o i-ésimo próximo iterator de first.
  2. Calcula a soma não comutativa generalizada da sequência sobre binary_op.
  3. Atribui o resultado a *dest, onde dest é o i-ésimo próximo iterator de d_first.

3) O mesmo que (1), mas cada sequência criada é formada por init seguido pelos elementos de `[`first`, `iter`]` em ordem.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

A _soma não comutativa generalizada_ de uma sequência de elementos sobre uma operação binária binary_op é definida da seguinte forma:

  * Se a sequência tiver apenas um elemento, a soma é o valor do elemento.
  * Caso contrário, executa as seguintes operações em ordem:

  1. Seleciona quaisquer dois elementos adjacentes elem1 e elem2 da sequência.
  2. Calcula binary_op(elem1, elem2) e substitui os dois elementos na sequência pelo resultado.
  3. Repete os passos 1 e 2 até que haja apenas um elemento na sequência.

O resultado é não determinístico se binary_op não for associativa (como a adição de ponto flutuante).

Para as sobrecargas (1,2), se binary_op(unary_op(*first), unary_op(*first)) não for conversível para o [tipo de valor](<#/doc/iterator>) de decltype(first), o programa é malformado.

Para as sobrecargas (3,4), se qualquer um dos seguintes valores não for conversível para `T`, o programa é malformado:

  * binary_op(init, init)
  * binary_op(init, unary_op(*first))
  * binary_op(unary_op(*first), unary_op(*first))

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * Para as sobrecargas (1,2), o tipo de valor de decltype(first) não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * Para as sobrecargas (3,4), `T` não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * unary_op ou binary_op modifica qualquer elemento de `[`first`, `last`)`.
  * unary_op ou binary_op invalida qualquer iterator ou sub-range de `[`first`, `last`]`.

### Parâmetros

- **first, last** — o range de elementos a serem somados
- **d_first** — o início do range de destino; pode ser igual a first
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **init** — o valor inicial
- **unary_op** — [FunctionObject](<#/doc/named_req/FunctionObject>) unário que será aplicado a cada elemento do range de entrada. O tipo de retorno deve ser aceitável como entrada para binary_op.
- **binary_op** — [FunctionObject](<#/doc/named_req/FunctionObject>) binário que será aplicado ao resultado de unary_op, aos resultados de outros binary_op, e a init se fornecido
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator para o elemento após o último elemento escrito.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1-4) \\(\scriptsize O(N)\\)O(N) aplicações de unary_op e binary_op respectivamente.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Notas

unary_op nunca é aplicado a init.

O parâmetro init aparece por último, diferindo de [std::transform_exclusive_scan](<#/doc/algorithm/transform_exclusive_scan>), porque é opcional para esta função.

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
    
        auto times_10 =  { return x * 10; };
    
        std::cout << "10 times exclusive sum: ";
        std::transform_exclusive_scan(data.begin(), data.end(),
                                      std::ostream_iterator<int>(std::cout, " "),
                                      0, std::plus<int>{}, times_10);
        std::cout << "\n10 times inclusive sum: ";
        std::transform_inclusive_scan(data.begin(), data.end(),
                                      std::ostream_iterator<int>(std::cout, " "),
                                      std::plus<int>{}, times_10);
        std::cout << '\n';
    }
```

Saída:
```
    10 times exclusive sum: 0 30 40 80 90 140 230 250 
    10 times inclusive sum: 30 40 80 90 140 230 250 310
```

### Veja também

[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)
[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ inclusive_scan](<#/doc/algorithm/inclusive_scan>)(C++17) | similar a [std::partial_sum](<#/doc/algorithm/partial_sum>), inclui o i-ésimo elemento de entrada na i-ésima soma
(modelo de função)
[ transform_exclusive_scan](<#/doc/algorithm/transform_exclusive_scan>)(C++17) | aplica um invocável, então calcula o scan exclusivo
(modelo de função)