# std::abort

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
void abort();
[[noreturn]] void abort() noexcept;
```

  
Causa a terminação anormal do programa, a menos que [SIGABRT](<#/doc/utility/program/SIG_types>) esteja sendo capturado por um manipulador de sinal (signal handler) passado para [std::signal](<#/doc/utility/program/signal>) e o manipulador não retorne.

Destrutores de variáveis com [duração de armazenamento](<#/doc/language/storage_duration>) automática, thread local (desde C++11) e estática não são chamados. Funções registradas com [std::atexit()](<#/doc/utility/program/atexit>) e [std::at_quick_exit](<#/doc/utility/program/at_quick_exit>) (desde C++11) também não são chamadas. Se recursos abertos, como arquivos, são fechados é definido pela implementação. Um status definido pela implementação é retornado ao ambiente hospedeiro que indica execução mal-sucedida.

### Parâmetros

(nenhum)

### Valor de retorno

Nenhum, pois não retorna.

### Exceções

Não lança exceções.

### Notas

POSIX especifica que a função [`abort()`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/abort.html>) anula o bloqueio ou a ignorância do sinal `SIGABRT`.

Alguns intrinsics de compilador, por exemplo, [`__builtin_trap`](<https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html>) (gcc, clang e icc) ou [`__fastfail`](<https://learn.microsoft.com/en-us/cpp/intrinsics/fastfail>)/[`__debugbreak`](<https://learn.microsoft.com/en-us/cpp/intrinsics/debugbreak>) (msvc), podem ser usados para terminar o programa o mais rápido possível.

### Exemplo

Execute este código
```cpp
    #include <csignal>
    #include <cstdlib>
    #include <iostream>
    
    class Tester
    {
    public:
        Tester()  { std::cout << "Tester ctor\n"; }
        ~Tester() { std::cout << "Tester dtor\n"; }
    };
    
    Tester static_tester; // Destructor not called
    
    void signal_handler(int signal) 
    {
        if (signal == SIGABRT)
            std::cerr << "SIGABRT received\n";
        else
            std::cerr << "Unexpected signal " << signal << " received\n";
        std::_Exit(EXIT_FAILURE);
    }
    
    int main()
    {
        Tester automatic_tester; // Destructor not called
    
        // Setup handler
        auto previous_handler = std::signal(SIGABRT, signal_handler);
        if (previous_handler == SIG_ERR)
        {
            std::cerr << "Setup failed\n";
            return EXIT_FAILURE;
        }
    
        std::abort(); // Raise SIGABRT
        std::cout << "This code is unreachable\n";
    }
```

Saída: 
```
    Tester ctor
    Tester ctor
    SIGABRT received
```

### Veja também

[ exit](<#/doc/utility/program/exit>) |  causa a terminação normal do programa com limpeza   
(função)  
[ atexit](<#/doc/utility/program/atexit>) |  registra uma função a ser chamada na invocação de [std::exit()](<#/doc/utility/program/exit>)   
(função)  
[ quick_exit](<#/doc/utility/program/quick_exit>)(C++11) |  causa a terminação rápida do programa sem limpeza completa   
(função)  
[ at_quick_exit](<#/doc/utility/program/at_quick_exit>)(C++11) |  registra uma função a ser chamada na invocação de [std::quick_exit](<#/doc/utility/program/quick_exit>)   
(função)  
[ signal](<#/doc/utility/program/signal>) |  define um manipulador de sinal para um sinal específico   
(função)  
[ terminate](<#/doc/error/terminate>) |  função chamada quando o tratamento de exceções falha   
(função)  
[Documentação C](<#/>) para abort