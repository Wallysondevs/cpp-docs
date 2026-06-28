# std::make_error_code(std::io_errc)

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::error_code make_error_code( std::io_errc e ) noexcept;
```

Constrói um objeto [std::error_code](<#/doc/error/error_code>) a partir de um valor do tipo [std::io_errc](<#/doc/io/io_errc>) como se retornasse [std::error_code](<#/doc/error/error_code>)(static_cast&lt;int&gt;(e), [std::iostream_category](<#/doc/io/iostream_category>)()).

Esta função é chamada pelo construtor de [std::error_code](<#/doc/error/error_code>) com um argumento [std::io_errc](<#/doc/io/io_errc>).

### Parâmetros

- **e** — número do código de erro

### Valor de retorno

Um valor do tipo [std::error_code](<#/doc/error/error_code>) que contém o número do código de erro de e associado à categoria de erro "iostream".

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <system_error>
    
    int main()
    {
        std::error_code ec = std::make_error_code(std::io_errc::stream);
    
        // This works because of the overloaded method
        //    and the is_error_code_enum specialization.
        ec = std::io_errc::stream;
    
        std::cout << "Error code from io_errc::stream has category "
                  << ec.category().name() << '\n';
    }
```

Saída:
```
    Error code from io_errc::stream has category iostream
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2087](<https://cplusplus.github.io/LWG/issue2087>) | C++11 | `make_error_code(io_errc)` não foi declarado noexcept | declarado noexcept

### Veja também

[ error_code](<#/doc/error/error_code>)(C++11) | contém um código de erro dependente da plataforma
(classe)
[ io_errc](<#/doc/io/io_errc>)(C++11) | os códigos de erro de stream de E/S
(enum)
[ make_error_code(std::errc)](<#/doc/error/errc/make_error_code>)(C++11) | cria valor de código de erro para o enum `errc` e
(função)
[ make_error_code(std::future_errc)](<#/doc/thread/future_errc/make_error_code>)(C++11) | constrói um código de erro de future
(função)