# std::get_unexpected

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
std::unexpected_handler get_unexpected() noexcept;
(removido em C++17)
```

  
Retorna o [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>) atualmente instalado, que pode ser um ponteiro nulo. 

Esta função é thread-safe. Uma chamada anterior a `std::set_unexpected` _sincroniza-com_ (veja [std::memory_order](<#/doc/atomic/memory_order>)) as chamadas subsequentes a esta função.  | (desde C++11)  
  
### Parâmetros

(nenhum) 

### Valor de retorno

O [std::unexpected_handler](<#/doc/error/exception/unexpected_handler>) atualmente instalado. 

### Veja também

[ unexpected_handler](<#/doc/error/exception/unexpected_handler>)(obsoleto desde C++11)(removido em C++17) | o tipo da função chamada por [std::unexpected](<#/doc/error/unexpected>)   
(typedef)  
[ set_unexpected](<#/doc/error/exception/set_unexpected>)(obsoleto desde C++11)(removido em C++17) | altera a função a ser chamada por [std::unexpected](<#/doc/error/unexpected>)   
(função)