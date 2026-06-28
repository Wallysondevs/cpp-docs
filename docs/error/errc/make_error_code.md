# std::make_error_code(std::errc)

Definido no header `[<system_error>](<#/doc/header/system_error>)`

```cpp
std::error_code make_error_code( std::errc e ) noexcept;  // (desde C++11)
```

Cria um valor de error code para o enum `errc` e.

Equivalente a [std::error_code](<#/doc/error/error_code>)(static_cast&lt;int&gt;(e), [std::generic_category](<#/doc/error/generic_category>)())

### Parâmetros

- **e** — enum de error code para o qual criar o error code

### Valor de retorno

Error code correspondente a e.

### Veja também

[ make_error_code(std::io_errc)](<#/doc/io/io_errc/make_error_code>)(C++11) | constrói um error code de iostream
(função)
[ make_error_code(std::future_errc)](<#/doc/thread/future_errc/make_error_code>)(C++11) | constrói um error code de future
(função)