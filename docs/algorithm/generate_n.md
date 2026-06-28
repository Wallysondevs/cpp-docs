# std::generate_n

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class OutputIt, class Size, class Generator >
OutputIt generate_n( OutputIt first, Size count, Generator g );
template< class ExecutionPolicy,
class ForwardIt, class Size, class Generator >
ForwardIt generate_n( ExecutionPolicy&& policy,
ForwardIt first, Size count, Generator g );
```

1) Atribui valores, gerados pelo objeto de função `g` fornecido, aos primeiros `count` elementos no range que começa em `first`, se `count > 0`. Não faz nada caso contrário.

2) O mesmo que (1), mas executado de acordo com a `policy`.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é `true`. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é `true`. | (desde C++20)

Se `Size` não for [convertível](<#/doc/language/implicit_cast>) para um [tipo integral](<#/doc/language/type-id>), o programa é malformado.

### Parâmetros

- **first** — o início do range de elementos a serem gerados
- **count** — número de elementos a serem gerados
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **g** — objeto de função geradora que será chamado.
A assinatura da função deve ser equivalente ao seguinte: | Ret fun();

O tipo `Ret` deve ser tal que um objeto do tipo `OutputIt` possa ser desreferenciado e atribuído um valor do tipo `Ret`.

Requisitos de tipo
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

Um iterator para uma posição após o último elemento atribuído se `count > 0`, `first` caso contrário.

### Complexidade

Exatamente [std::max](<#/doc/algorithm/max>)(0, count) invocações de `g()` e atribuições.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

*   Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamado. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
*   Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação
```cpp
    template<class OutputIt, class Size, class Generator>
    constexpr // desde C++20
    OutputIt generate_n(OutputIt first, Size count, Generator g)
    {
        for (Size i = 0; i < count; ++i, ++first)
            *first = g();
    
        return first;
    }
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <random>
    
    int main()
    {
        std::mt19937 rng; // construído por padrão, semeado com uma semente fixa
        std::generate_n(std::ostream_iterator<std::mt19937::result_type>(std::cout, " "),
                        5, std::ref(rng));
        std::cout << '\n';
    }
```

Saída:
```
    3499211612 581869302 3890346734 3586334585 545404204
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 426](<https://cplusplus.github.io/LWG/issue426>) | C++98 | o requisito de complexidade era “exatamente `count` invocações
ou atribuições”, o que é problemático se `count` for negativo | nenhuma invocação ou atribuição
se `count` não for positivo
[LWG 865](<https://cplusplus.github.io/LWG/issue865>) | C++98 | a localização do primeiro elemento após
o range de geração não era retornada | retornada

### Ver também

[ fill_n](<#/doc/algorithm/fill_n>) | atribui por cópia o valor fornecido a N elementos em um range
(modelo de função)
[ generate](<#/doc/algorithm/generate>) | atribui os resultados de chamadas de função sucessivas a cada elemento em um range
(modelo de função)
[ ranges::generate_n](<#/doc/algorithm/ranges/generate_n>)(C++20) | salva o resultado de N aplicações de uma função
(objeto de função de algoritmo)