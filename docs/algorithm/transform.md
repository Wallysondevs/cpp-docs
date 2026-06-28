# std::transform

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class OutputIt, class UnaryOp >
OutputIt transform( InputIt first1, InputIt last1,
OutputIt d_first, UnaryOp unary_op );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2, class UnaryOp >
ForwardIt2 transform( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 d_first, UnaryOp unary_op );
template< class InputIt1, class InputIt2,
class OutputIt, class BinaryOp >
OutputIt transform( InputIt1 first1, InputIt1 last1, InputIt2 first2,
OutputIt d_first, BinaryOp binary_op );
template< class ExecutionPolicy,
class ForwardIt1, class ForwardIt2,
class ForwardIt3, class BinaryOp >
ForwardIt3 transform( ExecutionPolicy&& policy,
ForwardIt1 first1, ForwardIt1 last1,
ForwardIt2 first2,
ForwardIt3 d_first, BinaryOp binary_op );
```

`std::transform` aplica a função fornecida aos elementos do(s) range(s) de entrada fornecido(s), e armazena o resultado em um range de saída começando em d_first.

1) A operação unária unary_op é aplicada aos elementos de `[`first1`, `last1`)`.

Se unary_op invalidar um iterator ou modificar um elemento em qualquer um dos seguintes ranges, o comportamento é indefinido:

  * `[`first1`, `last1`]`.
  * O range de [std::distance](<#/doc/iterator/distance>)(first1, last1) + 1 elementos começando em d_first.

3) A operação binária binary_op é aplicada a pares de elementos de dois ranges: `[`first1`, `last1`)` e outro range de [std::distance](<#/doc/iterator/distance>)(first1, last1) elementos começando em first2.

Se binary_op invalidar um iterator ou modificar um elemento em qualquer um dos seguintes ranges, o comportamento é indefinido:

  * `[`first1`, `last1`]`.
  * O range de [std::distance](<#/doc/iterator/distance>)(first1, last1) + 1 elementos começando em first2.
  * O range de [std::distance](<#/doc/iterator/distance>)(first1, last1) + 1 elementos começando em d_first.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas:
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (desde C++20)

### Parâmetros

- **first1, last1** — o primeiro range de elementos a transformar
- **first2** — o início do segundo range de elementos a transformar
- **d_first** — o início do range de destino, pode ser igual a first1 ou first2
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **unary_op** — objeto de função de operação unária que será aplicado.
A assinatura da função deve ser equivalente à seguinte: Ret fun(const Type &a); A assinatura não precisa ter const &. O tipo Type deve ser tal que um objeto do tipo InputIt possa ser desreferenciado e então implicitamente convertido para Type. O tipo Ret deve ser tal que um objeto do tipo OutputIt possa ser desreferenciado e receba um valor do tipo Ret. ​
- **binary_op** — objeto de função de operação binária que será aplicado.
A assinatura da função deve ser equivalente à seguinte: Ret fun(const Type1 &a, const Type2 &b); A assinatura não precisa ter const &. Os tipos Type1 e Type2 devem ser tais que objetos dos tipos InputIt1 e InputIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2 respectivamente. O tipo Ret deve ser tal que um objeto do tipo OutputIt possa ser desreferenciado e receba um valor do tipo Ret. ​
Requisitos de tipo
-`InputIt, InputIt1, InputIt2` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2, ForwardIt3` devem satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Iterator de saída para o elemento que segue o último elemento transformado.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first1, last1):

1,2) Exatamente \\(\scriptsize N\\)N aplicações de unary_op.

3,4) Exatamente \\(\scriptsize N\\)N aplicações de binary_op.

### Exceções

As sobrecargas com um parâmetro de template chamado `ExecutionPolicy` reportam erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Implementação possível

[transform (1)](<#/doc/algorithm/transform>)
```cpp
    template<class InputIt, class OutputIt, class UnaryOp>
    constexpr // < since C++20
    OutputIt transform(InputIt first1, InputIt last1,
                       OutputIt d_first, UnaryOp unary_op)
    {
        for (; first1 != last1; ++d_first, ++first1)
            *d_first = unary_op(*first1);
    
        return d_first;
    }
```

[transform (3)](<#/doc/algorithm/transform>)
```cpp
    template<class InputIt1, class InputIt2, 
             class OutputIt, class BinaryOp>
    constexpr // < since C++20
    OutputIt transform(InputIt1 first1, InputIt1 last1, InputIt2 first2,
                       OutputIt d_first, BinaryOp binary_op)
    {
        for (; first1 != last1; ++d_first, ++first1, ++first2)
            *d_first = binary_op(*first1, *first2);
    
        return d_first;
    }
```

### Observações

`std::transform` não garante a aplicação em ordem de unary_op ou binary_op. Para aplicar uma função a uma sequência em ordem ou para aplicar uma função que modifica os elementos de uma sequência, use [std::for_each](<#/doc/algorithm/for_each>).

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cctype>
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <utility>
    #include <vector>
    
    void print_ordinals(const std::vector<unsigned>& ordinals)
    {
        std::cout << "ordinals: ";
        for (unsigned ord : ordinals)
            std::cout << std::setw(3) << ord << ' ';
        std::cout << '\n';
    }
    
    char to_uppercase(unsigned char c)
    {
        return std::toupper(c);
    }
    
    void to_uppercase_inplace(char& c)
    {
        c = to_uppercase(c);
    }
    
    void unary_transform_example(std::string& hello, std::string world)
    {
        // Transform string to uppercase in-place
    
        std::transform(hello.cbegin(), hello.cend(), hello.begin(), to_uppercase);
        std::cout << "hello = " << std::quoted(hello) << '\n';
    
        // for_each version (see Notes above)
        std::for_each(world.begin(), world.end(), to_uppercase_inplace);
        std::cout << "world = " << std::quoted(world) << '\n';
    }
    
    void binary_transform_example(std::vector<unsigned> ordinals)
    {
        // Transform numbers to doubled values
    
        print_ordinals(ordinals);
    
        std::transform(ordinals.cbegin(), ordinals.cend(), ordinals.cbegin(),
                       ordinals.begin(), std::plus<>{});
    
        print_ordinals(ordinals);
    }
    
    int main()
    {
        std::string hello("hello");
        unary_transform_example(hello, "world");
    
        std::vector<unsigned> ordinals;
        std::copy(hello.cbegin(), hello.cend(), std::back_inserter(ordinals));
        binary_transform_example(std::move(ordinals));
    }
```

Saída:
```
    hello = "HELLO"
    world = "WORLD"
    ordinals:  72  69  76  76  79 
    ordinals: 144 138 152 152 158
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 242](<https://cplusplus.github.io/LWG/issue242>) | C++98 | unary_op e binary_op não podiam ter efeitos colaterais | eles não podem modificar os ranges envolvidos

### Veja também

[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um range de elementos
(function template)
[ ranges::transform](<#/doc/algorithm/ranges/transform>)(C++20) | aplica uma função a um range de elementos
(algorithm function object)