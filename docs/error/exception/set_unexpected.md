# std::set_unexpected

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
std::unexpected_handler set_unexpected( std::unexpected_handler f ) throw();
std::unexpected_handler set_unexpected( std::unexpected_handler f ) noexcept;
(removido em C++17)
```

Torna f o novo [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>) global e retorna o [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>) previamente instalado.

Esta função é thread-safe. Cada chamada a `std::set_unexpected` _sincroniza-com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) as chamadas subsequentes a `std::set_unexpected` e [std::get_unexpected](<#/doc/error/exception/get_unexpected>) | (desde C++11)

### Parâmetros

- **f** — ponteiro para função do tipo [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>), ou ponteiro nulo

### Valor de retorno

O unexpected handler previamente instalado, ou um valor de ponteiro nulo se nenhum foi instalado.

### Veja também

[ unexpected](<#/doc/error/unexpected>)(obsoleto desde C++11)(removido em C++17) | função chamada quando a especificação de exceção dinâmica é violada
(função)
[ get_unexpected](<#/doc/error/exception/get_unexpected>)(obsoleto desde C++11)(removido em C++17) | obtém o `unexpected_handler` atual
(função)
[ unexpected_handler](<#/doc/error/exception/unexpected_handler>)(obsoleto desde C++11)(removido em C++17) | o tipo da função chamada por [std::unexpected](<#/doc/error/unexpected>)
(typedef)