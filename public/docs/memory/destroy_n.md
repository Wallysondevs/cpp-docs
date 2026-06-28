# std::destroy_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class ForwardIt, class Size >
ForwardIt destroy_n( ForwardIt first, Size n );
(até C++20)
template< class ForwardIt, class Size >
constexpr ForwardIt destroy_n( ForwardIt first, Size n );
template< class ExecutionPolicy, class ForwardIt, class Size >
ForwardIt destroy_n( ExecutionPolicy&& policy, ForwardIt first, Size n );
```

1) Destrói os n objetos no range começando em first, como se por
```cpp
    for (; n > 0; (void) ++first, --n)
        std::destroy_at(std::addressof(*first));
```

2) O mesmo que (1), mas executado de acordo com a policy. Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: [std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::decay_t](<#/doc/types/decay>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (até C++20)
---|---
[std::is_execution_policy_v](<#/doc/algorithm/is_execution_policy>)<[std::remove_cvref_t](<#/doc/types/remove_cvref>)&lt;ExecutionPolicy&gt;> for verdadeiro. | (desde C++20)

### Parâmetros

- **first** — o início do range de elementos a serem destruídos
- **n** — o número de elementos a serem destruídos
- **policy** — a [execution policy](<#/doc/algorithm/execution_policy_tag_t>) a ser usada
Requisitos de tipo
-`ForwardIt` deve satisfazer os requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-Nenhum incremento, atribuição, comparação ou indireção através de instâncias válidas de `ForwardIt` pode lançar exceções.

### Valor de retorno

O fim do range de objetos que foram destruídos (isto é, [std::next](<#/doc/iterator/next>)(first, n)).

### Complexidade

Linear em n.

### Exceções

A sobrecarga com um parâmetro de template nomeado `ExecutionPolicy` reporta erros da seguinte forma:

* Se a execução de uma função invocada como parte do algoritmo lançar uma exceção e `ExecutionPolicy` for uma das [standard policies](<#/doc/algorithm/execution_policy_tag_t>), [std::terminate](<#/doc/error/terminate>) é chamada. Para qualquer outra `ExecutionPolicy`, o comportamento é indefinido pela implementação.
* Se o algoritmo falhar ao alocar memória, [std::bad_alloc](<#/doc/memory/new/bad_alloc>) é lançada.

### Possível implementação
```cpp
    template<class ForwardIt, class Size>
    constexpr // since C++20
    ForwardIt destroy_n(ForwardIt first, Size n)
    {
        for (; n > 0; (void) ++first, --n)
            std::destroy_at(std::addressof(*first));
        return first;
    }
```

---

### Exemplo

O exemplo a seguir demonstra como usar `destroy_n` para destruir uma sequência contígua de elementos.

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <new>
    
    struct Tracer
    {
        int value;
        ~Tracer() { std::cout << value << " destructed\n"; }
    };
    
    int main()
    {
        alignas(Tracer) unsigned char buffer[sizeof(Tracer) * 8];
    
        for (int i = 0; i < 8; ++i)
            new(buffer + sizeof(Tracer) * i) Tracer{i}; //manually construct objects
    
        auto ptr = std::launder(reinterpret_cast<Tracer*>(buffer));
    
        std::destroy_n(ptr, 8);
    }
```

Saída:
```
    0 destructed
    1 destructed
    2 destructed
    3 destructed
    4 destructed
    5 destructed
    6 destructed
    7 destructed
```

### Veja também

[ destroy](<#/doc/memory/destroy>)(C++17) | destrói um range de objetos
(modelo de função)
[ destroy_at](<#/doc/memory/destroy_at>)(C++17) | destrói um objeto em um endereço dado
(modelo de função)
[ ranges::destroy_n](<#/doc/memory/ranges/destroy_n>)(C++20) | destrói um número de objetos em um range
(objeto de função de algoritmo)