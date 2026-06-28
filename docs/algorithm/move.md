# std::move

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class InputIt, class OutputIt >
OutputIt move( InputIt first, InputIt last,
OutputIt d_first );
(constexpr desde C++20)
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >
ForwardIt2 move( ExecutionPolicy&& policy,
ForwardIt1 first, ForwardIt1 last,
ForwardIt2 d_first );
```

1) Move os elementos no range `[`first`, `last`)` para outro range começando em d_first, iniciando de first e prosseguindo até last. Após esta operação, os elementos no range de onde foram movidos ainda conterão valores válidos do tipo apropriado, mas não necessariamente os mesmos valores de antes da move.

2) O mesmo que (1), mas executado de acordo com a policy.

Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> é true. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> é true. | (desde C++20)

Se d_first estiver dentro do range `[`first`, `last`)`, o comportamento é indefinido. Neste caso, [std::move_backward](<#/doc/algorithm/move_backward>) pode ser usado em vez disso.

### Parâmetros

- **first, last** — o range de elementos a serem movidos
- **d_first** — o início do range de destino
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`ForwardIt1, ForwardIt2` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Valor de retorno

O iterator para o elemento após o último elemento movido.

### Complexidade

Exatamente [std::distance](<#/doc/iterator/distance>)(first, last) atribuições de move.

### Exceções

A sobrecarga com um parâmetro de template chamado `ExecutionPolicy` reporta erros da seguinte forma:

  * Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é definido pela implementação.
  * Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação
```cpp
    template<class InputIt, class OutputIt>
    OutputIt move(InputIt first, InputIt last, OutputIt d_first)
    {
        for (; first != last; ++d_first, ++first)
            *d_first = std::move(*first);
    
        return d_first;
    }
```

---

### Notas

Ao mover ranges sobrepostos, `std::move` é apropriado ao mover para a esquerda (o início do range de destino está fora do range de origem), enquanto [std::move_backward](<#/doc/algorithm/move_backward>) é apropriado ao mover para a direita (o fim do range de destino está fora do range de origem).

### Exemplo

O código a seguir move objetos thread (que não são copiáveis) de um container para outro.

Execute este código
```cpp
    #include <algorithm>
    #include <chrono>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <thread>
    #include <vector>
    
    void f(int n)
    {
        std::this_thread::sleep_for(std::chrono::seconds(n));
        std::cout << "thread " << n << " ended" << std::endl;
    }
    
    int main()
    {
        std::vector<std::jthread> v;
        v.emplace_back(f, 1);
        v.emplace_back(f, 2);
        v.emplace_back(f, 3);
        std::list<std::jthread> l;
    
        // copy() would not compile, because std::jthread is noncopyable
        std::move(v.begin(), v.end(), std::back_inserter(l));
    }
```

Saída:
```
    thread 1 ended
    thread 2 ended
    thread 3 ended
```

### Veja também

[ move_backward](<#/doc/algorithm/move_backward>)(C++11) | move um range de elementos para um novo local em ordem inversa
(modelo de função)
[ move](<#/doc/utility/move>)(C++11) | converte o argumento para um xvalue
(modelo de função)
[ ranges::move](<#/doc/algorithm/ranges/move>)(C++20) | move um range de elementos para um novo local
(objeto de função de algoritmo)