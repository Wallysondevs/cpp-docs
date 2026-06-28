# std::rotate

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class ForwardIt >
ForwardIt rotate( ForwardIt first, ForwardIt middle, ForwardIt last );
template< class ExecutionPolicy, class ForwardIt >
ForwardIt rotate( ExecutionPolicy&& policy,
ForwardIt first, ForwardIt middle, ForwardIt last );
```

1) Realiza uma rotação à esquerda em um range de elementos.

Especificamente, `std::rotate` troca os elementos no range `[`first`, `last`)` de tal forma que os elementos em `[`first`, `middle`)` são colocados após os elementos em `[`middle`, `last`)` enquanto as ordens dos elementos em ambos os ranges são preservadas.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (desde C++20)

Se qualquer uma das seguintes condições for satisfeita, o comportamento é indefinido:

  * `[`first`, `middle`)` ou `[`middle`, `last`)` não é um [range válido](<#/doc/iterator>).

  * O tipo de *first não é [Swappable](<#/doc/named_req/Swappable>).

| (até C++11)

  * `ForwardIt` não é [ValueSwappable](<#/doc/named_req/ValueSwappable>).
  * O tipo de *first não é [MoveConstructible](<#/doc/named_req/MoveConstructible>).
  * O tipo de *first não é [MoveAssignable](<#/doc/named_req/MoveAssignable>).

| (desde C++11)

### Parâmetros

- **first** — o início do range original
- **middle** — o elemento que deve aparecer no início do range rotacionado
- **last** — o fim do range original
- **policy** — a [policy de execução](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

O iterator para o elemento originalmente referenciado por *first, ou seja, o [std::distance](<#/doc/iterator/distance>)(middle, last)-ésimo próximo iterator de first.

### Complexidade

No máximo [std::distance](<#/doc/iterator/distance>)(first, last) trocas.

### Exceções

A sobrecarga com um parâmetro template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [policies padrão](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação

Veja também as implementações em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/stl_algo.h#L1213-L1416>), [libc++](<https://github.com/llvm/llvm-project/tree/6adbc83ee9e46b476e0f75d5671c3a21f675a936/libcxx/include/__algorithm/rotate.h>), e [MSVC STL](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/xutility#L5392-L5446>).
```cpp
    template<class ForwardIt>
    constexpr // since C++20
    ForwardIt rotate(ForwardIt first, ForwardIt middle, ForwardIt last)
    {
        if (first == middle)
            return last;
    
        if (middle == last)
            return first;
    
        ForwardIt write = first;
        ForwardIt next_read = first; // posição de leitura para quando “read” atinge “last”
    
        for (ForwardIt read = middle; read != last; ++write, ++read)
        {
            if (write == next_read)
                next_read = read; // rastreia para onde “first” foi
            std::iter_swap(write, read);
        }
    
        // rotaciona a sequência restante para o lugar
        rotate(write, next_read, last);
        return write;
    }
```

---

### Notas

`std::rotate` tem melhor eficiência em implementações comuns se `ForwardIt` satisfaz [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) ou (melhor) [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).

Implementações (por exemplo, [MSVC STL](<https://github.com/microsoft/STL/blob/main/stl/src/vector_algorithms.cpp>)) podem habilitar a vetorização quando o tipo de iterator satisfaz [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) e a troca de seu tipo de valor não chama nenhuma função membro especial não trivial nem `swap` encontrado por [ADL](<#/doc/language/adl>).

### Exemplo

`std::rotate` é um bloco de construção comum em muitos algoritmos. Este exemplo demonstra o [insertion sort](<https://en.wikipedia.org/wiki/insertion_sort> "enwiki:insertion sort").

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <vector>
    
    auto print = 
    {
        std::cout << remark;
        for (auto n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    };
    
    int main()
    {
        std::vector<int> v{2, 4, 2, 0, 5, 10, 7, 3, 7, 1};
        print("antes da ordenação:\t\t", v);
    
        // insertion sort
        for (auto i = v.begin(); i != v.end(); ++i)
            std::rotate(std::upper_bound(v.begin(), i, *i), i, i + 1);
        print("depois da ordenação:\t\t", v);
    
        // rotação simples para a esquerda
        std::rotate(v.begin(), v.begin() + 1, v.end());
        print("rotação simples à esquerda:\t", v);
    
        // rotação simples para a direita
        std::rotate(v.rbegin(), v.rbegin() + 1, v.rend());
        print("rotação simples à direita:\t", v);
    }
```

Saída:
```
    antes da ordenação:		2 4 2 0 5 10 7 3 7 1
    depois da ordenação:		0 1 2 2 3 4 5 7 7 10
    rotação simples à esquerda:	1 2 2 3 4 5 7 7 10 0
    rotação simples à direita:	0 1 2 2 3 4 5 7 7 10
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 488](<https://cplusplus.github.io/LWG/issue488>) | C++98 | a nova localização do elemento apontado por first não era retornada | retornada

### Veja também

[ rotate_copy](<#/doc/algorithm/rotate_copy>) | copia e rotaciona um range de elementos
(modelo de função)
[ ranges::rotate](<#/doc/algorithm/ranges/rotate>)(C++20) | rotaciona a ordem dos elementos em um range
(objeto de função de algoritmo)