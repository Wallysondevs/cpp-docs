# std::for_each_n

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class Size, class UnaryFunc >
InputIt for_each_n( InputIt first, Size n, UnaryFunc f );
(constexpr desde C++20)
template< class ExecutionPolicy,
class ForwardIt, class Size, class UnaryFunc >
ForwardIt for_each_n( ExecutionPolicy&& policy,
ForwardIt first, Size n, UnaryFunc f );
```

Aplica o objeto de função `f` fornecido ao resultado da desreferenciação de cada iterator no range `[`first`, `first + n`)`. Se `f` retornar um resultado, o resultado é ignorado.

1) `f` é aplicado em ordem, começando de `first`.

Se `UnaryFunc` não for [MoveConstructible](<#/doc/named_req/MoveConstructible>), o comportamento é indefinido.

2) `f` pode não ser aplicado em ordem. O algoritmo é executado de acordo com a `policy`.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é verdadeiro. | (desde C++20)

Se `UnaryFunc` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>), o comportamento é indefinido.

Se `n >= 0` não for verdadeiro, o comportamento é indefinido.

Se o tipo do iterator (`InputIt`/`ForwardIt`) for mutável, `f` pode modificar os elementos do range através do iterator desreferenciado.

Ao contrário dos demais algoritmos paralelos, `for_each_n` não tem permissão para fazer cópias dos elementos na sequência, mesmo que sejam [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Parâmetros

- **first** — o início do range ao qual aplicar a função
- **n** — o número de elementos aos quais aplicar a função
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **f** — objeto de função, a ser aplicado ao resultado da desreferenciação de cada iterator no range `[`first`, `first + n`)`
A assinatura da função deve ser equivalente à seguinte: `void fun(const Type &a);` A assinatura não precisa ter `const &`.
O tipo `Type` deve ser tal que um objeto do tipo `InputIt` possa ser desreferenciado e então implicitamente convertido para `Type`. ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-`Size` deve ser conversível para um tipo integral.

### Valor de retorno

Um iterator igual a `first + n`, ou mais formalmente, a [std::advance](<#/doc/iterator/advance>)(first, n).

### Complexidade

Exatamente `n` aplicações de `f`.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também a implementação em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/pstl/algorithm_impl.h#L82>), [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L896>) e [MSVC stdlib](<https://github.com/microsoft/STL/blob/ff83542af4b683fb2f2dea1423fd6c50fe3e13b0/stl/inc/algorithm#L246>).
```cpp
    template<class InputIt, class Size, class UnaryFunc>
    InputIt for_each_n(InputIt first, Size n, UnaryFunc f)
    {
        for (Size i = 0; i < n; ++first, (void) ++i)
            f(*first);
    
        return first;
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    void println(auto const& v)
    {
        for (auto count{v.size()}; const auto& e : v)
            std::cout << e << (--count ? ", " : "\n");
    }
    
    int main()
    {
        std::vector<int> vi{1, 2, 3, 4, 5};
        println(vi);
    
        std::for_each_n(vi.begin(), 3,  { n *= 2; });
        println(vi);
    }
```

Saída:
```
    1, 2, 3, 4, 5
    2, 4, 6, 4, 5
```

### Ver também

[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(modelo de função)
[ range-`for` loop](<#/doc/language/range-for>)(C++11) | executa um loop sobre um range
---|---
[ for_each](<#/doc/algorithm/for_each>) | aplica uma função a um range de elementos
(modelo de função)
[ ranges::for_each_n](<#/doc/algorithm/ranges/for_each_n>)(C++20) | aplica um objeto de função aos primeiros N elementos de uma sequência
(objeto de função de algoritmo)