# std::_Exit

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
[[noreturn]] void _Exit( int exit_code ) noexcept;
```

Causa o encerramento normal do programa sem limpar completamente os recursos.

Destrutores de variáveis com duração de armazenamento automática, thread-local e estática não são chamados. Funções passadas para [std::at_quick_exit()](<#/doc/utility/program/at_quick_exit>) ou [std::atexit()](<#/doc/utility/program/atexit>) não são chamadas. Se recursos abertos, como arquivos, são fechados é definido pela implementação.

Se `exit_code` for 0 ou [EXIT_SUCCESS](<#/doc/utility/program/EXIT_status>), um status definido pela implementação indicando encerramento bem-sucedido é retornado ao ambiente hospedeiro. Se `exit_code` for [EXIT_FAILURE](<#/doc/utility/program/EXIT_status>), um status definido pela implementação, indicando encerramento _mal-sucedido_, é retornado. Em outros casos, um valor de status definido pela implementação é retornado.

Uma implementação freestanding é obrigada a fornecer `std::_Exit`. | (desde C++23)

### Parâmetros

- **exit_code** — status de saída do programa

### Valor de retorno

(nenhum)

### Observações

Embora `_Exit` seja exigido como freestanding desde C++23, não é exigido que esteja disponível em uma implementação C freestanding.

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    class Static
    {
    public:
        ~Static() 
        {
            std::cout << "Static dtor\n";
        }
    };
     
    class Local
    {
    public:
        ~Local() 
        {
            std::cout << "Local dtor\n";
        }
    };
     
    Static static_variable; // o dtor deste objeto *não* será chamado
     
    void atexit_handler()
    {
        std::cout << "atexit handler\n";
    }
     
    int main()
    {
        Local local_variable; // o dtor deste objeto *não* será chamado
     
        // o handler *não* será chamado
        const int result = std::atexit(atexit_handler);
     
        if (result != 0)
        {
            std::cerr << "atexit registration failed\n";
            return EXIT_FAILURE;
        }
     
        std::cout << "test" << std::endl; // o flush de std::endl
            // precisa estar aqui, caso contrário nada será impresso
        std::_Exit(EXIT_FAILURE);
    }
```

Saída:
```
    test
```

### Veja também

[ abort](<#/doc/utility/program/abort>) | causa o encerramento anormal do programa (sem limpeza)
(função)
[ exit](<#/doc/utility/program/exit>) | causa o encerramento normal do programa com limpeza
(função)
[Documentação C](<#/>) para _Exit