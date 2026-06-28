# std::at_quick_exit

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int at_quick_exit( /*atexit-handler*/* func ) noexcept;
int at_quick_exit( /*c-atexit-handler*/* func ) noexcept;
extern "C++" using /*atexit-handler*/ = void();
extern "C" using /*c-atexit-handler*/ = void();
```

Registra a função apontada por `func` para ser chamada na terminação rápida do programa (via [std::quick_exit](<#/doc/utility/program/quick_exit>)).

Chamar a função de várias threads não induz uma data race. A implementação tem garantia de suportar o registro de pelo menos 32 funções. O limite exato é definido pela implementação.

As funções registradas não serão chamadas na [terminação normal do programa](<#/doc/utility/program/exit>). Se uma função precisar ser chamada nesse caso, [std::atexit](<#/doc/utility/program/atexit>) deve ser usado.

### Parâmetros

- **func** — ponteiro para uma função a ser chamada na terminação rápida do programa

### Valor de retorno

​0​ se o registro for bem-sucedido, valor diferente de zero caso contrário.

### Notas

As duas sobrecargas são distintas porque os tipos do parâmetro `func` são distintos ([language linkage](<#/doc/language/language_linkage>) faz parte do seu tipo).

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
     
    void f1()
    {
        std::cout << "pushed first" << std::endl; // flush is intentional
    }
     
    extern "C" void f2()
    {
        std::cout << "pushed second\n";
    }
     
    int main()
    {
        auto f3 = []
        {
            std::cout << "pushed third\n";
        };
     
        std::at_quick_exit(f1);
        std::at_quick_exit(f2);
        std::at_quick_exit(f3);
        std::quick_exit(0);
    }
```

Saída:
```
    pushed third
    pushed second
    pushed first
```

### Veja também

[ abort](<#/doc/utility/program/abort>) | causa a terminação anormal do programa (sem limpeza)
(função)
[ exit](<#/doc/utility/program/exit>) | causa a terminação normal do programa com limpeza
(função)
[ atexit](<#/doc/utility/program/atexit>) | registra uma função para ser chamada na invocação de [std::exit()](<#/doc/utility/program/exit>)
(função)
[ quick_exit](<#/doc/utility/program/quick_exit>)(C++11) | causa a terminação rápida do programa sem limpeza completa
(função)
[Documentação C](<#/>) para at_quick_exit