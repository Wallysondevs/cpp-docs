# std::make_error_code(std::future_errc)

Definido no cabeçalho `[<future>](<#/doc/header/future>)`

```c
std::error_code make_error_code( std::future_errc e );
```

Constrói um objeto [std::error_code](<#/doc/error/error_code>) a partir de um valor do tipo [std::future_errc](<#/doc/thread/future_errc>) como se por:

[std::error_code](<#/doc/error/error_code>)(static_cast&lt;int&gt;(e), [std::future_category](<#/doc/thread/future_category>)()).

Esta função é chamada pelo construtor de [std::error_code](<#/doc/error/error_code>) quando fornecido um argumento [std::future_errc](<#/doc/thread/future_errc>).

### Parâmetros

- **e** — número do código de erro

### Valor de retorno

Um valor do tipo [std::error_code](<#/doc/error/error_code>) que contém o número do código de erro de `e` associado à categoria de erro "future".

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ error_code](<#/doc/error/error_code>)(C++11) | contém um código de erro dependente da plataforma
(classe)
[ future_errc](<#/doc/thread/future_errc>)(C++11) | identifica os códigos de erro de future
(enum)
[ make_error_code(std::errc)](<#/doc/error/errc/make_error_code>)(C++11) | cria um valor de código de erro para o enum `errc` e
(função)
[ make_error_code(std::io_errc)](<#/doc/io/io_errc/make_error_code>)(C++11) | constrói um código de erro de iostream
(função)