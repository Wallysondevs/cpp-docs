# std::terminate_handler

Definido no header `[<exception>](<#/doc/header/exception>)`

```cpp
typedef void ( *terminate_handler )();
```

`std::terminate_handler` é o tipo de ponteiro para função (ponteiro para uma função que não recebe argumentos e retorna void), que é instalado e consultado pelas funções [std::set_terminate](<#/doc/error/set_terminate>) e [std::get_terminate](<#/doc/error/get_terminate>) e chamado por [std::terminate](<#/doc/error/terminate>).

Um `std::terminate_handler` deve encerrar a execução do programa sem retornar ao chamador, caso contrário, o comportamento é indefinido.

A implementação C++ fornece uma função `std::terminate_handler` padrão, que chama [std::abort()](<#/doc/utility/program/abort>). Se o valor do ponteiro nulo for instalado (por meio de [std::set_terminate](<#/doc/error/set_terminate>)), a implementação pode restaurar o handler padrão em vez disso.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ terminate](<#/doc/error/terminate>) | função chamada quando o tratamento de exceções falha
(função)
[ set_terminate](<#/doc/error/set_terminate>) | altera a função a ser chamada por [std::terminate](<#/doc/error/terminate>)
(função)
[ get_terminate](<#/doc/error/get_terminate>)(C++11) | obtém o terminate_handler atual
(função)