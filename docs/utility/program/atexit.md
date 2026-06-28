# std::atexit

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int atexit( /* c-atexit-handler */* func );
int atexit( /* atexit-handler */* func );
int atexit( /* c-atexit-handler */* func ) noexcept;
int atexit( /* atexit-handler */* func ) noexcept;
extern "C" using /* c-atexit-handler */ = void();
extern "C++" using /* atexit-handler */ = void();
```

Registra a função apontada por func para ser chamada na terminação normal do programa (via [std::exit()](<#/doc/utility/program/exit>) ou retornando da [função main](<#/doc/language/main_function>))

As funções serão chamadas durante a destruição dos objetos estáticos, em ordem inversa: se A foi registrada antes de B, então a chamada para B é feita antes da chamada para A. O mesmo se aplica à ordenação entre os construtores de objetos estáticos e as chamadas para `atexit`: veja [std::exit](<#/doc/utility/program/exit>). | (ate C++11)
---|---
As funções podem ser chamadas concorrentemente com a destruição dos objetos com duração de armazenamento estática e entre si, mantendo a garantia de que se o registro de A foi sequenciado antes do registro de B, então a chamada para B é sequenciada antes da chamada para A. O mesmo se aplica ao sequenciamento entre os construtores de objetos estáticos e as chamadas para `atexit`: veja [std::exit](<#/doc/utility/program/exit>). | (desde C++11)

A mesma função pode ser registrada mais de uma vez.

Se uma função termina via uma exceção, [std::terminate](<#/doc/error/terminate>) é chamada.

`atexit` é thread-safe: chamar a função de várias threads não induz uma data race.

A implementação tem garantia de suportar o registro de pelo menos 32 funções. O limite exato é definido pela implementação.

### Parâmetros

- **func** — ponteiro para uma função a ser chamada na terminação normal do programa

### Valor de retorno

`0` se o registro for bem-sucedido, valor diferente de zero caso contrário.

### Observações

As duas sobrecargas são distintas porque os tipos do parâmetro func são distintos ([language linkage](<#/doc/language/language_linkage>) faz parte do seu tipo).

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
    
    void atexit_handler_1()
    {
        std::cout << "At exit #1\n";
    }
    
    void atexit_handler_2()
    {
        std::cout << "At exit #2\n";
    }
    
    int main()
    {
        const int result_1 = std::atexit(atexit_handler_1);
        const int result_2 = std::atexit(atexit_handler_2);
    
        if (result_1 || result_2)
        {
            std::cerr << "Registration failed!\n";
            return EXIT_FAILURE;
        }
    
        std::cout << "Returning from main...\n";
        return EXIT_SUCCESS;
    }
```

Saída:
```
    Returning from main...
    At exit #2
    At exit #1
```

### Veja também

[ abort](<#/doc/utility/program/abort>) | causa a terminação anormal do programa (sem limpeza)
(função)
[ exit](<#/doc/utility/program/exit>) | causa a terminação normal do programa com limpeza
(função)
[ quick_exit](<#/doc/utility/program/quick_exit>)(C++11) | causa a terminação rápida do programa sem limpeza completa
(função)
[ at_quick_exit](<#/doc/utility/program/at_quick_exit>)(C++11) | registra uma função a ser chamada na invocação de [std::quick_exit](<#/doc/utility/program/quick_exit>)
(função)
[documentação C](<#/>) para atexit