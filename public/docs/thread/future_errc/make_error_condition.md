# std::make_error_condition(std::future_errc)

Definido no header `[<future>](<#/doc/header/future>)`

```cpp
std::error_condition make_error_condition( std::future_errc e );  // (desde C++11)
```

  
Constrói um objeto [std::error_condition](<#/doc/error/error_condition>) a partir de um valor do tipo [std::future_errc](<#/doc/thread/future_errc>) como se por: 

[std::error_condition](<#/doc/error/error_condition>)(static_cast&lt;int&gt;(e), [std::future_category](<#/doc/thread/future_category>)()). 

### Parâmetros

e  |  \-  |  número do código de erro   
  
### Valor de retorno

Um valor do tipo [std::error_condition](<#/doc/error/error_condition>) que contém o número do código de erro de `e` associado à categoria de erro "future". 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ error_condition](<#/doc/error/error_condition>)(C++11) |  mantém um código de erro portátil   
(classe)  
[ future_errc](<#/doc/thread/future_errc>)(C++11) |  identifica os códigos de erro de future   
(enum)