# std::for_each

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class UnaryFunc >
UnaryFunc for_each( InputIt first, InputIt last, UnaryFunc f );
template< class ExecutionPolicy, class ForwardIt, class UnaryFunc >
void for_each( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, UnaryFunc f );
```

Aplica o objeto de função f fornecido ao resultado da desreferenciação de cada iterator no range `[`first`, `last`)`. Se f retornar um resultado, o resultado é ignorado.

1) f é aplicado em ordem, começando de first. Se `UnaryFunc` não for [MoveConstructible](<#/doc/named_req/MoveConstructible>), o comportamento é indefinido. | (desde C++11)

2) f pode não ser aplicado em ordem. O algoritmo é executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se `UnaryFunc` não for [CopyConstructible](<#/doc/named_req/CopyConstructible>), o comportamento é indefinido.

Se o tipo do iterator (`InputIt`/`ForwardIt`) for mutável, f pode modificar os elementos do range através do iterator desreferenciado.

Ao contrário dos demais algoritmos paralelos, `for_each` não tem permissão para fazer cópias dos elementos na sequência, mesmo que sejam [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Parâmetros

- **first, last** — o range ao qual aplicar a função
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **f** — objeto de função, a ser aplicado ao resultado da desreferenciação de cada iterator no range `[`first`, `last`)`
A assinatura da função deve ser equivalente à seguinte: void fun(const Type &a); A assinatura não precisa ter const &. O tipo Type deve ser tal que um objeto do tipo InputIt possa ser desreferenciado e então implicitamente convertido para Type. ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

1) f

2) (nenhum)

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) aplicações de f.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/d9375e490072d1aae73a93949aa158fcd2a27018/libstdc%2B%2B-v3/include/bits/stl_algo.h#L3858>), [libc++](<https://github.com/llvm-mirror/libcxx/blob/a12cb9d211019d99b5875b6d8034617cbc24c2cc/include/algorithm#L880>) e [MSVC stdlib](<https://github.com/microsoft/STL/blob/ff83542af4b683fb2f2dea1423fd6c50fe3e13b0/stl/inc/algorithm#L229>).
```cpp
    template<class InputIt, class UnaryFunc>
    constexpr UnaryFunc for_each(InputIt first, InputIt last, UnaryFunc f)
    {
        for (; first != last; ++first)
            f(*first);
    
        return f; // move implícito desde C++11
    }
```

---

### Observações

Para a sobrecarga (1), f pode ser um objeto de função com estado. O valor de retorno pode ser considerado como o estado final da operação em lote.

Para a sobrecarga (2), múltiplas cópias de f podem ser criadas para realizar a invocação paralela. Nenhum valor é retornado porque a paralelização frequentemente não permite o acúmulo eficiente de estado.

### Exemplo

O exemplo a seguir usa uma [lambda-expression](<#/doc/language/lambda>) para incrementar todos os elementos de um vector e, em seguida, usa um `operator()` sobrecarregado em um objeto de função (também conhecido como "functor") para calcular sua soma. Note que para calcular a soma, é recomendado usar o algoritmo dedicado [std::accumulate](<#/doc/algorithm/accumulate>).

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{3, -4, 2, -8, 15, 267};
    
        auto print =  { std::cout << n << ' '; };
    
        std::cout << "before:\t";
        std::for_each(v.cbegin(), v.cend(), print);
        std::cout << '\n';
    
        // incrementa elementos no local
        std::for_each(v.begin(), v.end(),  { n++; });
    
        std::cout << "after:\t";
        std::for_each(v.cbegin(), v.cend(), print);
        std::cout << '\n';
    
        struct Sum
        {
            void operator()(int n) { sum += n; }
            int sum {0};
        };
    
        // invoca Sum::operator() para cada elemento
        Sum s = std::for_each(v.cbegin(), v.cend(), Sum());    
        std::cout << "sum:\t" << s.sum << '\n';
    }
```

Saída:
```
    before:	3 -4 2 -8 15 267 
    after:	4 -3 3 -7 16 268 
    sum:	281
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 475](<https://cplusplus.github.io/LWG/issue475>) | C++98 | não estava claro se f pode modificar os elementos da sequência sendo iterada (`for_each` é classificado como “operações de sequência não modificadoras”) | esclarecido (permitido se o tipo do iterator for mutável)
[LWG 2747](<https://cplusplus.github.io/LWG/issue2747>) | C++11 | a sobrecarga (1) retornava std::move(f) | retorna f (que move implicitamente)

### Veja também

[ transform](<#/doc/algorithm/transform>) | aplica uma função a um range de elementos, armazenando os resultados em um range de destino
(function template)
[ for_each_n](<#/doc/algorithm/for_each_n>)(C++17) | aplica um objeto de função aos primeiros N elementos de uma sequência
(function template)
[ ranges::for_each](<#/doc/algorithm/ranges/for_each>)(C++20) | aplica uma função a um range de elementos
(algorithm function object)
[ ranges::for_each_n](<#/doc/algorithm/ranges/for_each_n>)(C++20) | aplica um objeto de função aos primeiros N elementos de uma sequência
(algorithm function object)
[ range-`for` loop](<#/doc/language/range-for>)(C++11) | executa um loop sobre um range