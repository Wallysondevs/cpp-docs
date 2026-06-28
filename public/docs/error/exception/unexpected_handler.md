# std::unexpected_handler

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
typedef void ( *unexpected_handler )();
(removido em C++17)
```

`std::unexpected_handler` é o tipo de ponteiro para função (ponteiro para uma função que não recebe argumentos e retorna void), que é instalado e consultado pelas funções [std::set_unexpected](<#/doc/error/exception/set_unexpected>) e [std::get_unexpected](<#/doc/error/exception/get_unexpected>) e chamado por [std::unexpected](<#/doc/error/unexpected>).

A implementação C++ fornece uma função `std::unexpected_handler` padrão, que chama [std::terminate()](<#/doc/error/terminate>). Se o valor do ponteiro nulo for instalado (por meio de [std::set_unexpected](<#/doc/error/exception/set_unexpected>)), a implementação pode restaurar o handler padrão em vez disso.

Espera-se que um `std::unexpected_handler` definido pelo usuário termine o programa ou lance uma exceção. Se ele lançar uma exceção, uma das três situações a seguir pode ser encontrada:

1) a exceção lançada por `std::unexpected_handler` satisfaz a especificação de exceção dinâmica que foi violada anteriormente. A nova exceção pode escapar da função e o desenrolamento da pilha continua.

2) a exceção lançada por `std::unexpected_handler` ainda viola a especificação de exceção:

2a) no entanto, a especificação de exceção permite [std::bad_exception](<#/doc/error/bad_exception>): o objeto de exceção lançado é destruído, e [std::bad_exception](<#/doc/error/bad_exception>) é construído pelo runtime C++ e lançado em seu lugar.

2b) a especificação de exceção não permite [std::bad_exception](<#/doc/error/bad_exception>): [std::terminate()](<#/doc/error/terminate>) é chamado.

### Veja também

[ unexpected](<#/doc/error/unexpected>)(obsoleto desde C++11)(removido em C++17) | função chamada quando a especificação de exceção dinâmica é violada
(função)
[ set_unexpected](<#/doc/error/exception/set_unexpected>)(obsoleto desde C++11)(removido em C++17) | altera a função a ser chamada por [std::unexpected](<#/doc/error/unexpected>)
(função)
[ get_unexpected](<#/doc/error/exception/get_unexpected>)(obsoleto desde C++11)(removido em C++17) | obtém o `unexpected_handler` atual
(função)