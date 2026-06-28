# std::set_new_handler

Definido no cabeçalho `[<new>](<#/doc/header/new>)`

```c
std::new_handler set_new_handler( std::new_handler new_p ) throw();
std::new_handler set_new_handler( std::new_handler new_p ) noexcept;
```

Torna new_p a nova função global new-handler e retorna o new-handler previamente instalado.

A função _new-handler_ é a função chamada pelas [funções de alocação](<#/doc/memory/new/operator_new>) sempre que uma tentativa de alocação de memória falha. Seu propósito é um de três:

1) tornar mais memória disponível,

2) encerrar o programa (por exemplo, chamando [std::terminate](<#/doc/error/terminate>)),

3) lançar uma exceção do tipo [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou derivada de [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

A implementação padrão lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>). O usuário pode instalar seu próprio _new-handler_, que pode oferecer um comportamento diferente do padrão.

Se o _new-handler_ retornar, a função de alocação repete a tentativa de alocação que falhou anteriormente e chama o _new-handler_ novamente se a alocação falhar novamente. Para encerrar o loop, o _new-handler_ pode chamar std::set_new_handler(nullptr): se, após uma tentativa de alocação falha, a função de alocação descobrir que [std::get_new_handler](<#/doc/memory/new/get_new_handler>) retorna um valor de ponteiro nulo, ela lançará [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

No início do programa, o _new-handler_ é um ponteiro nulo.

Esta função é thread-safe. Cada chamada a `std::set_new_handler` _sincroniza-com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) as chamadas subsequentes a `std::set_new_handler` e [std::get_new_handler](<#/doc/memory/new/get_new_handler>). | (desde C++11)

### Parâmetros

- **new_p** — ponteiro para função do tipo [std::new_handler](<#/doc/memory/new/new_handler>), ou ponteiro nulo

### Valor de retorno

O new-handler previamente instalado, ou um valor de ponteiro nulo se nenhum foi instalado.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <new>
    
    void handler()
    {
        std::cout << "Memory allocation failed, terminating\n";
        std::set_new_handler(nullptr);
    }
    
    int main()
    {
        std::set_new_handler(handler);
        try
        {
            while (true)
            {
                new int1000'000'000ul;
            }
        }
        catch (const std::bad_alloc& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Saída possível:
```
    Memory allocation failed, terminating
    std::bad_alloc
```

### Veja também

[ operator newoperator new[]](<#/doc/memory/new/operator_new>) | funções de alocação
(função)
[ get_new_handler](<#/doc/memory/new/get_new_handler>)(C++11) | obtém o new-handler atual
(função)
[ new_handler](<#/doc/memory/new/new_handler>) | tipo de ponteiro de função do new-handler
(typedef)
[ bad_alloc](<#/doc/memory/new/bad_alloc>) | exceção lançada quando a alocação de memória falha
(classe)