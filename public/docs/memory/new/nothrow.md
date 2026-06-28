# std::nothrow

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
struct nothrow_t {};
struct nothrow_t { explicit nothrow_t() = default; };
extern const std::nothrow_t nothrow;
```

`std::nothrow_t` é um tipo de classe vazia usado para desambiguar as sobrecargas de [funções de alocação](<#/doc/memory/new/operator_new>) que lançam exceções e as que não lançam. `std::nothrow` é uma constante desse tipo.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <new>
    
    int main()
    {
        try
        {
            while (true)
            {
                new int[100000000ul];   // throwing overload
            }
        }
        catch (const std::bad_alloc& e)
        {
            std::cout << e.what() << '\n';
        }
    
        while (true)
        {
            int* p = new(std::nothrow) int[100000000ul]; // non-throwing overload
            if (p == nullptr)
            {
                std::cout << "Allocation returned nullptr\n";
                break;
            }
        }
    }
```

Saída:
```
    std::bad_alloc
    Allocation returned nullptr
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2510](<https://cplusplus.github.io/LWG/issue2510>) | C++11 | o construtor padrão não era explícito, o que poderia levar à ambiguidade | tornado explícito

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)