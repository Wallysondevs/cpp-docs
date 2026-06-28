# std::vector&lt;T,Allocator&gt;::shrink_to_fit

void shrink_to_fit(); | | (constexpr desde C++20)

Solicita a remoção da capacidade não utilizada.

É uma solicitação não vinculativa para reduzir [capacity()](<#/doc/container/vector/capacity>) para [size()](<#/doc/container/vector/size>). Depende da implementação se a solicitação será atendida.

Se ocorrer realocação, todos os iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e todas as referências aos elementos são invalidados. Se nenhuma realocação ocorrer, nenhum iterator ou referência é invalidado.

Se `T` não for [MoveInsertable](<#/doc/named_req/MoveInsertable>) em [std::vector](<#/doc/container/vector>)<T, Allocator>, o comportamento é indefinido. | (desde C++11)

### Complexidade

No máximo linear no tamanho do container.

### Exceções

Se uma exceção for lançada que não seja pelo move constructor de um `T` não-[CopyInsertable](<#/doc/named_req/CopyInsertable>), não há efeitos. | (desde C++11)

### Notas

No libstdc++, `shrink_to_fit()` [não está disponível](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/strings.html#strings.string.shrink>) no modo C++98.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
     
    int main()
    {
        std::vector<int> v;
        std::cout << "Default-constructed capacity is " << v.capacity() << '\n';
        v.resize(100);
        std::cout << "Capacity of a 100-element vector is " << v.capacity() << '\n';
        v.resize(50);
        std::cout << "Capacity after resize(50) is " << v.capacity() << '\n';
        v.shrink_to_fit();
        std::cout << "Capacity after shrink_to_fit() is " << v.capacity() << '\n';
        v.clear();
        std::cout << "Capacity after clear() is " << v.capacity() << '\n';
        v.shrink_to_fit();
        std::cout << "Capacity after shrink_to_fit() is " << v.capacity() << '\n';
        for (int i = 1000; i < 1300; ++i)
            v.push_back(i);
        std::cout << "Capacity after adding 300 elements is " << v.capacity() << '\n';
        v.shrink_to_fit();
        std::cout << "Capacity after shrink_to_fit() is " << v.capacity() << '\n';
    }
```

Saída possível:
```
    Default-constructed capacity is 0
    Capacity of a 100-element vector is 100
    Capacity after resize(50) is 100
    Capacity after shrink_to_fit() is 50
    Capacity after clear() is 50
    Capacity after shrink_to_fit() is 0
    Capacity after adding 300 elements is 512
    Capacity after shrink_to_fit() is 300
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 755](<https://cplusplus.github.io/LWG/issue755>) | C++98 | `std::vector` não possuía operações explícitas de shrink-to-fit | fornecido
[LWG 2033](<https://cplusplus.github.io/LWG/issue2033>) | C++98 C++11 | 1. o requisito de complexidade estava ausente (C++98) 2. `T` não era exigido ser [MoveInsertable](<#/doc/named_req/MoveInsertable>) (C++11) | 1. adicionado 2. exigido
[LWG 2223](<https://cplusplus.github.io/LWG/issue2223>) | C++98 C++11 | 1. referências, ponteiros e iterators não eram invalidados (C++98) 2. não havia garantia de segurança de exceção (C++11) | 1. eles podem ser invalidados 2. adicionado

### Veja também

[ size](<#/doc/container/vector/size>) | retorna o número de elementos
(função membro pública)
[ capacity](<#/doc/container/vector/capacity>) | retorna o número de elementos que podem ser armazenados na memória alocada atualmente
(função membro pública)