# std::set_terminate

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
std::terminate_handler set_terminate( std::terminate_handler f ) throw();
std::terminate_handler set_terminate( std::terminate_handler f ) noexcept;
```

Torna f a nova função global de tratamento de terminação e retorna a [std::terminate_handler](<#/doc/error/terminate_handler>) previamente instalada. f deve encerrar a execução do programa sem retornar ao seu chamador, caso contrário, o comportamento é indefinido.

Esta função é thread-safe. Cada chamada a `std::set_terminate` _sincroniza-com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) chamadas subsequentes a `std::set_terminate` e [std::get_terminate](<#/doc/error/get_terminate>). | (desde C++11)

### Parâmetros

- **f** — ponteiro para função do tipo [std::terminate_handler](<#/doc/error/terminate_handler>), ou ponteiro nulo

### Valor de retorno

O handler de terminação previamente instalado, ou um valor de ponteiro nulo se nenhum foi instalado.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <exception>
    #include <iostream>
     
    int main()
    {
        std::set_terminate(
        {
            std::cout << "Unhandled exception\n" << std::flush;
            std::abort();
        });
        throw 1;
    }
```

Saída possível:
```
    Unhandled exception
    bash: line 7:  7743 Aborted                 (core dumped) ./a.out
```

O handler de terminação também funcionará para threads lançadas, então pode ser usado como uma alternativa para envolver a função da thread com um bloco try/catch. No exemplo a seguir, como a exceção não é tratada, [std::terminate](<#/doc/error/terminate>) será chamado.

Execute este código
```cpp
    #include <iostream>
    #include <thread>
     
    void run()
    {
        throw std::runtime_error("Thread failure");
    }
     
    int main()
    {
        try
        {
            std::thread t{run};
            t.join();
            return EXIT_SUCCESS;
        }
        catch (const std::exception& ex)
        {
            std::cerr << "Exception: " << ex.what() << '\n';
        }
        catch (...)
        {
            std::cerr << "Unknown exception caught\n";
        }
        return EXIT_FAILURE;
    }
```

Saída possível:
```
    terminate called after throwing an instance of 'std::runtime_error'
      what():  Thread failure
    Aborted (core dumped)
```

Com a introdução do handler de terminação, a exceção lançada da thread não-principal pode ser analisada, e a saída pode ser realizada de forma graciosa.

Execute este código
```cpp
    #include <iostream>
    #include <thread>
     
    class foo
    {
    public:
        foo() { std::cerr << "foo::foo()\n"; }
        ~foo() { std::cerr << "foo::~foo()\n"; }
    };
     
    // Static object, expecting destructor on exit
    foo f;
     
    void run()
    {
        throw std::runtime_error("Thread failure");
    }
     
    int main()
    {
        std::set_terminate(
        {
            try
            {
                std::exception_ptr eptr{std::current_exception()};
                if (eptr)
                {
                    std::rethrow_exception(eptr);
                }
                else
                {
                    std::cerr << "Exiting without exception\n";
                }
            }
            catch (const std::exception& ex)
            {
                std::cerr << "Exception: " << ex.what() << '\n';
            }
            catch (...)
            {
                std::cerr << "Unknown exception caught\n";
            }
            std::exit(EXIT_FAILURE);
        });
     
        std::thread t{run};
        t.join();
    }
```

Saída:
```
    foo::foo()
    Exception: Thread failure
    foo::~foo()
```

### Veja também

[ terminate](<#/doc/error/terminate>) | função chamada quando o tratamento de exceções falha
(função)
[ get_terminate](<#/doc/error/get_terminate>)(C++11) | obtém o terminate_handler atual
(função)
[ terminate_handler](<#/doc/error/terminate_handler>) | o tipo da função chamada por [std::terminate](<#/doc/error/terminate>)
(typedef)