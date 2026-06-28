# std::get_terminate

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
std::terminate_handler get_terminate() noexcept;
```

Retorna o [std::terminate_handler](<#/doc/error/terminate_handler>) atualmente instalado, que pode ser um ponteiro nulo.

Esta função é thread-safe. Uma chamada anterior a [std::set_terminate](<#/doc/error/set_terminate>) _sincroniza-se com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) esta função.

### Parâmetros

(nenhum)

### Valor de retorno

O [std::terminate_handler](<#/doc/error/terminate_handler>) atualmente instalado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ terminate_handler](<#/doc/error/terminate_handler>) | o tipo da função chamada por [std::terminate](<#/doc/error/terminate>)
(typedef)
[ set_terminate](<#/doc/error/set_terminate>) | altera a função a ser chamada por [std::terminate](<#/doc/error/terminate>)
(função)