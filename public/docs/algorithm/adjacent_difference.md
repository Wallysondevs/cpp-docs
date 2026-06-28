# std::adjacent_difference

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt, class OutputIt >
OutputIt adjacent_difference( InputIt first, InputIt last,
OutputIt d_first );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2 >
ForwardIt2 adjacent_difference( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first );
template< class InputIt, class OutputIt, class BinaryOp >
OutputIt adjacent_difference( InputIt first, InputIt last,
OutputIt d_first, BinaryOp op );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class BinaryOp >
ForwardIt2 adjacent_difference( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first, BinaryOp op );
```

Seja `T` o tipo de valor de decltype(first).

1) Se `[`first`, `last`)` estiver vazio, não faz nada.

Caso contrário, executa as seguintes operações em ordem:

  1. Cria um acumulador acc do tipo `T`, e o inicializa com *first.
  2. Atribui acc a *d_first.
  3. Para cada iterator iter em `[`++first`, `last`)` em ordem, executa as seguintes operações em ordem:

a) Cria um objeto val do tipo `T`, e o inicializa com *iter.

b) Calcula val - acc(até C++20)val - std::move(acc)(desde C++20).

c) Atribui o resultado a *++d_first.

d) Atribui por cópia(até C++20)Atribui por movimento(desde C++20) de val para acc.

2) Se `[`first`, `last`)` estiver vazio, não faz nada.

Caso contrário, executa as seguintes operações em ordem:

  1. Atribui *first a *d_first.
  2. Para cada inteiro i em `[`1`, `[std::distance](<#/doc/iterator/distance>)(first, last)`)`, executa as seguintes operações em ordem:

a) Calcula curr - prev, onde curr é o i-ésimo iterator seguinte de first, e prev é o (i-1)-ésimo iterator seguinte de first.

b) Atribui o resultado a *dest, onde dest é o i-ésimo iterator seguinte de d_first.

3) O mesmo que (1), mas calcula op(val, acc)(até C++20)op(val, std::move(acc))(desde C++20) em vez disso.

4) O mesmo que (2), mas calcula op(curr, prev) em vez disso.

Dada binary_op como a operação binária real:

  * Se qualquer das seguintes condições for satisfeita, o programa é malformado:

  * Para as sobrecargas (1,3):

  * `T` não é construtível a partir de *first.
  * acc não é [gravável](<#/doc/iterator>) para d_first.
  * O resultado de binary_op(val, acc)(até C++20)binary_op(val, std::move(acc))(desde C++20) não é gravável para d_first.

  * Para as sobrecargas (2,4):

  * *first não é gravável para d_first.
  * O resultado de binary_op(*first, *first) não é gravável para d_first.

  * Dado d_last como o iterator a ser [retornado](<#/doc/algorithm/adjacent_difference>), se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

  * Para as sobrecargas (1,3), `T` não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++20)

  * Para as sobrecargas (2,4), `[`first`, `last`)` e `[`d_first`, `d_last`)` se sobrepõem.
  * binary_op modifica qualquer elemento de `[`first`, `last`)` ou `[`d_first`, `d_last`)`.
  * binary_op invalida qualquer iterator ou sub-range em `[`first`, `last`]` ou `[`d_first`, `d_last`]`.

### Parâmetros

- **first, last** — o range de elementos
- **d_first** — o início do range de destino
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **op** — objeto de função de operação binária que será aplicado.
A assinatura da função deve ser equivalente à seguinte: Ret fun(const Type1 &a, const Type2 &b); A assinatura não precisa ter const &.
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo iterator_traits&lt;InputIt&gt;::value_type possa ser implicitamente convertido para ambos. O tipo Ret deve ser tal que um objeto do tipo OutputIt possa ser desreferenciado e atribuído um valor do tipo Ret. ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator para o elemento após o último elemento escrito, ou d_first se `[`first`, `last`)` estiver vazio.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize N-1\\)N-1 aplicações do operador-.

3,4) Exatamente \\(\scriptsize N-1\\)N-1 aplicações da função binária op.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[adjacent_difference (1)](<#/doc/algorithm/adjacent_difference>)
---
```cpp
    template<class InputIt, class OutputIt>
    constexpr // desde C++20
    OutputIt adjacent_difference(InputIt first, InputIt last, OutputIt d_first)
    {
        if (first == last)
            return d_first;
    
        typedef typename std::iterator_traits<InputIt>::value_type value_t;
        value_t acc = *first;
        *d_first = acc;
    
        while (++first != last)
        {
            value_t val = *first;
            *++d_first = val - std::move(acc); // std::move desde C++20
            acc = std::move(val);
        }
    
        return ++d_first;
    }
```

[adjacent_difference (3)](<#/doc/algorithm/adjacent_difference>)
```cpp
    template<class InputIt, class OutputIt, class BinaryOp>
    constexpr // desde C++20
    OutputIt adjacent_difference(InputIt first, InputIt last, 
                                 OutputIt d_first, BinaryOp op)
    {
        if (first == last)
            return d_first;
    
        typedef typename std::iterator_traits<InputIt>::value_type value_t;
        value_t acc = *first;
        *d_first = acc;
    
        while (++first != last)
        {
            value_t val = *first;
            *++d_first = op(val, std::move(acc)); // std::move desde C++20
            acc = std::move(val);
        }
    
        return ++d_first;
    }
```

### Notas

acc foi introduzido devido à resolução do [LWG issue 539](<https://cplusplus.github.io/LWG/issue539>). A razão para usar acc em vez de calcular diretamente as diferenças é porque a semântica desta última é confusa se os seguintes tipos não corresponderem:

  * o tipo de valor de `InputIt`
  * o(s) tipo(s) gravável(eis) de `OutputIt`
  * os tipos dos parâmetros de operator- ou op
  * o tipo de retorno de operator- ou op

acc serve como o objeto intermediário para armazenar em cache os valores dos elementos iterados:

  * seu tipo é o tipo de valor de `InputIt`
  * o valor escrito em d_first (que é o valor de retorno de operator- ou op) é atribuído a ele
  * seu valor é passado para operator- ou op

```cpp
    char i_array[4] = {100, 100, 100, 100};
    int  o_array[4];
    
    // OK: realiza conversões quando necessário
    // 1. cria "acc" do tipo char (o tipo de valor)
    // 2. "acc" é atribuído ao primeiro elemento de "o_array"
    // 3. os argumentos char são usados para multiplicação longa (char -> long)
    // 4. o produto long é atribuído ao range de saída (long -> int)
    // 5. o próximo valor de "i_array" é atribuído a "acc"
    // 6. volta ao passo 3 para processar os elementos restantes no range de entrada
    std::adjacent_difference(i_array, i_array + 4, o_array, std::multiplies<long>{});
```

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
    
    void println(auto comment, const auto& sequence)
    {
        std::cout << comment;
        for (const auto& n : sequence)
            std::cout << n << ' ';
        std::cout << '\n';
    };
    
    int main()
    {
        // Implementação padrão - a diferença entre dois itens adjacentes
        std::vector v{4, 6, 9, 13, 18, 19, 19, 15, 10};
        println("Inicialmente, v = ", v);
        std::adjacent_difference(v.begin(), v.end(), v.begin());
        println("v modificado = ", v);
    
        // Fibonacci
        std::array<int, 10> a {1};
        std::adjacent_difference(std::begin(a), std::prev(std::end(a)),
                                 std::next(std::begin(a)), std::plus<>{});
        println("Fibonacci, a = ", a);
    }
```

Saída:
```
    Initially, v = 4 6 9 13 18 19 19 15 10 
    Modified v = 4 2 3 4 5 1 0 -4 -5 
    Fibonacci, a = 1 1 2 3 5 8 13 21 34 55
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 242](<https://cplusplus.github.io/LWG/issue242>) | C++98 | op não podia ter efeitos colaterais | não pode modificar
os ranges envolvidos
[LWG 539](<https://cplusplus.github.io/LWG/issue539>) | C++98 | os requisitos de tipo necessários para que as avaliações e atribuições de resultado fossem válidas estavam ausentes | adicionado
[LWG 3058](<https://cplusplus.github.io/LWG/issue3058>) | C++17 | para as sobrecargas (2,4), o resultado de cada invocação
de operator- ou op era atribuído a um objeto
temporário, e esse objeto era atribuído ao range de saída | atribuir os resultados
diretamente ao range
de saída

### Ver também

[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou dobra um range de elementos
(modelo de função)