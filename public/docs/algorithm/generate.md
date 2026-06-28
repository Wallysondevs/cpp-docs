# std::generate

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt, class Generator >
void generate( ForwardIt first, ForwardIt last, Generator g );
template< class ExecutionPolicy, class ForwardIt, class Generator >
void generate( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, Generator g );
```

1) Atribui a cada elemento no range `[`first`, `last`)` um valor gerado pelo objeto de função g fornecido.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

### Parâmetros

- **first, last** — o range de elementos a serem gerados
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **g** — objeto de função geradora que será chamado.
A assinatura da função deve ser equivalente à seguinte: | Ret fun();

O tipo Ret deve ser tal que um objeto do tipo ForwardIt possa ser desreferenciado e atribuído um valor do tipo Ret.

Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) invocações de g() e atribuições.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamado. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação
```cpp
    template<class ForwardIt, class Generator>
    constexpr // since C++20
    void generate(ForwardIt first, ForwardIt last, Generator g)
    {
        for (; first != last; ++first)
            *first = g();
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    void println(std::string_view fmt, const auto& v)
    {
        for (std::cout << fmt; const auto& e : v)
            std::cout << e << ' ';
        std::cout << '\n';
    };
    
    
    int f()
    {
        static int i;
        return ++i;
    }
    
    int main()
    {
        std::vector<int> v(5);
    
        std::generate(v.begin(), v.end(), f);
        println("v: ", v);
    
        // Initialize with default values 0,1,2,3,4 from a lambda function
        // Equivalent to std::iota(v.begin(), v.end(), 0);
        std::generate(v.begin(), v.end(), [n = 0] () mutable { return n++; });
        println("v: ", v);
    }
```

Saída:
```
    v: 1 2 3 4 5
    v: 0 1 2 3 4
```

### Veja também

[ fill](<#/doc/algorithm/fill>) | atribui por cópia o valor fornecido a cada elemento em um range
(modelo de função)
[ generate_n](<#/doc/algorithm/generate_n>) | atribui os resultados de chamadas de função sucessivas a N elementos em um range
(modelo de função)
[ iota](<#/doc/algorithm/iota>)(C++11) | preenche um range com incrementos sucessivos do valor inicial
(modelo de função)
[ ranges::generate](<#/doc/algorithm/ranges/generate>)(C++20) | salva o resultado de uma função em um range
(objeto de função de algoritmo)