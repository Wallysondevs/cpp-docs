# std::unique

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
ForwardIt unique( ForwardIt first, ForwardIt last );
template< class ExecutionPolicy, class ForwardIt >
ForwardIt unique( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last );
template< class ForwardIt, class BinaryPred >
ForwardIt unique( ForwardIt first, ForwardIt last, BinaryPred p );
template< class ExecutionPolicy,
class ForwardIt, class BinaryPred >
ForwardIt unique( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt last, BinaryPred p );
```

Remove todos, exceto o primeiro elemento, de cada grupo consecutivo de elementos equivalentes do range `[`first`, `last`)` e retorna um iterador past-the-end para o novo final do range.

1) Os elementos são comparados usando operator==.

Se operator== não estabelecer uma [relação de equivalência](<https://en.wikipedia.org/wiki/equivalence_relation> "enwiki: equivalence relation"), o comportamento é indefinido.

3) Os elementos são comparados usando o predicado binário p fornecido.

Se p não estabelecer uma relação de equivalência, o comportamento é indefinido.

2,4) O mesmo que (1,3), mas executado de acordo com a policy.

Essas sobrecargas participam da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for true. | (desde C++20)

### Explicação

A remoção é feita deslocando os elementos no range de tal forma que os elementos que não devem ser removidos apareçam no início do range.

* O deslocamento é feito por [atribuição por cópia](<#/doc/language/as_operator>)(até C++11)[atribuição por movimento](<#/doc/language/move_operator>)(desde C++11).
* A operação de remoção é estável: a ordem relativa dos elementos que não devem ser removidos permanece a mesma.
* A sequência subjacente de `[`first`, `last`)` não é encurtada pela operação de remoção. Dado result como o iterador retornado:

* Todos os iteradores em `[`result`, `last`)` ainda são [desreferenciáveis](<#/doc/iterator>).

* Cada elemento de `[`result`, `last`)` tem um estado válido, mas não especificado, porque a atribuição por movimento pode eliminar elementos movendo-os de elementos que estavam originalmente nesse range.

| (desde C++11)

### Parâmetros

- **first, last** — o range de elementos a ser processado
- **policy** — a [política de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
- **p** — predicado binário que retorna true se os elementos devem ser tratados como iguais.
A assinatura da função predicado deve ser equivalente à seguinte: bool pred(const Type1 &a, const Type2 &b); Embora a assinatura não precise ter const &, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, Type1 & não é permitido, nem Type1 a menos que para `Type1` um movimento seja equivalente a uma cópia(desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo ForwardIt possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-O tipo de `ForwardIt` desreferenciado deve satisfazer os requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>).

### Valor de retorno

Um `ForwardIt` para o novo final do range.

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1,2) Exatamente \\(\scriptsize max(0,N-1)\\)max(0,N-1) comparações usando operator==.

3,4) Exatamente \\(\scriptsize max(0,N-1)\\)max(0,N-1) aplicações do predicado p.

### Exceções

As sobrecargas com um parâmetro de template nomeado `ExecutionPolicy` reportam erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [políticas padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/7f2f4b87910506effb8dffffc60eeb2451573126/libstdc%2B%2B-v3/include/bits/stl_algo.h#L919-L1000>), [libc++](<https://github.com/llvm/llvm-project/blob/5ba396011377bdf4086757d56cd48fc7d3c9f2ad/libcxx/include/__algorithm/unique.h>) e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L3804-L3848>).

[unique (1)](<#/doc/algorithm/unique>)
---
```cpp
    template<class ForwardIt>
    ForwardIt unique(ForwardIt first, ForwardIt last)
    {
        if (first == last)
            return last;
    
        ForwardIt result = first;
        while (++first != last)
            if (!(*result == *first) && ++result != first)
                *result = std::move(*first);
    
        return ++result;
    }
```

[unique (3)](<#/doc/algorithm/unique>)
```cpp
    template<class ForwardIt, class BinaryPredicate>
    ForwardIt unique(ForwardIt first, ForwardIt last, BinaryPredicate p)
    {
        if (first == last)
            return last;
    
        ForwardIt result = first;
        while (++first != last)
            if (!p(*result, *first) && ++result != first)
                *result = std::move(*first);
    
        return ++result;
    }
```

### Notas

Uma chamada para `unique` é tipicamente seguida por uma chamada para a função membro `erase` de um container para realmente remover elementos do container.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    int main()
    {
        // a vector containing several duplicate elements
        std::vector<int> v{1, 2, 1, 1, 3, 3, 3, 4, 5, 4};
        auto print = &
        {
            std::cout << "@" << id << ": ";
            for (int i : v)
                std::cout << i << ' ';
            std::cout << '\n';
        };
        print(1);
    
        // remove consecutive (adjacent) duplicates
        auto last = std::unique(v.begin(), v.end());
        // v now holds {1 2 1 3 4 5 4 x x x}, where 'x' is indeterminate
        v.erase(last, v.end());
        print(2);
    
        // sort followed by unique, to remove all duplicates
        std::sort(v.begin(), v.end()); // {1 1 2 3 4 4 5}
        print(3);
    
        last = std::unique(v.begin(), v.end());
        // v now holds {1 2 3 4 5 x x}, where 'x' is indeterminate
        v.erase(last, v.end());
        print(4);
    }
```

Saída:
```
    @1: 1 2 1 1 3 3 3 4 5 4
    @2: 1 2 1 3 4 5 4
    @3: 1 1 2 3 4 4 5
    @4: 1 2 3 4 5
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 202](<https://cplusplus.github.io/LWG/issue202>) | C++98 | o comportamento era incerto se os elementos são
comparados usando uma relação de não-equivalência | o comportamento é
indefinido neste caso

### Veja também

[ adjacent_find](<#/doc/algorithm/adjacent_find>) | encontra os dois primeiros itens adjacentes que são iguais (ou satisfazem um dado predicado)
(modelo de função)
[ unique_copy](<#/doc/algorithm/unique_copy>) | cria uma cópia de um range de elementos que não contém duplicatas consecutivas
(modelo de função)
[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ unique](<#/doc/container/list/unique>) | remove elementos duplicados consecutivos
(função membro pública de `std::list<T,Allocator>`)
[ unique](<#/doc/container/forward_list/unique>) | remove elementos duplicados consecutivos
(função membro pública de `std::forward_list<T,Allocator>`)
[ ranges::unique](<#/doc/algorithm/ranges/unique>)(C++20) | remove elementos duplicados consecutivos em um range
(objeto de função de algoritmo)