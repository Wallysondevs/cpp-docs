# std::quick_exit

Definido no header `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
[[noreturn]] void quick_exit( int exit_code ) noexcept;  // (desde C++11)
```

Causa a terminação normal do programa sem limpar completamente os recursos.

As funções passadas para [std::at_quick_exit](<#/doc/utility/program/at_quick_exit>) são chamadas na ordem inversa de seu registro. Se uma exceção tentar se propagar para fora de qualquer uma das funções, [std::terminate](<#/doc/error/terminate>) é chamada. Após chamar as funções registradas, chama [std::_Exit](<#/doc/utility/program/_Exit>)(exit_code).

As funções passadas para [std::atexit](<#/doc/utility/program/atexit>) não são chamadas.

### Parâmetros

- **exit_code** — status de saída do programa

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
     
    template<int N>
    void quick_exit_handler()
    {
        std::cout << "quick_exit handler #" << N << std::endl; // flush is intended
    }
     
    void at_exit_handler()
    {
        std::cout << "at_exit handler\n";
    }
     
    int main()
    {
        if (std::at_quick_exit(quick_exit_handler<1>) ||
            std::at_quick_exit(quick_exit_handler<2>))
        {
            std::cerr << "Registration failed\n";
            return EXIT_FAILURE;
        }
     
        std::atexit(at_exit_handler); // the handler will not be called
     
        struct R { ~R() { std::cout << "destructor\n"; } } resource;
     
        /*...*/
     
        std::quick_exit(EXIT_SUCCESS);
     
        std::cout << "This statement is unreachable...\n";
    }
```

Saída:
```
    quick_exit handler #2
    quick_exit handler #1
```

### Veja também

[ abort](<#/doc/utility/program/abort>) | causa a terminação anormal do programa (sem limpeza)
(função)
[ exit](<#/doc/utility/program/exit>) | causa a terminação normal do programa com limpeza
(função)
[ atexit](<#/doc/utility/program/atexit>) | registra uma função para ser chamada na invocação de [std::exit()](<#/doc/utility/program/exit>)
(função)
[ at_quick_exit](<#/doc/utility/program/at_quick_exit>)(C++11) | registra uma função para ser chamada na invocação de **std::quick_exit**
(função)
[Documentação C](<#/>) para quick_exit