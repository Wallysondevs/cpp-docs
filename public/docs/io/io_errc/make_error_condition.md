# std::make_error_condition(std::io_errc)

Definido no header `[<ios>](<#/doc/header/ios>)`

```cpp
std::error_condition make_error_condition( std::io_errc e ) noexcept;  // (desde C++11)
```

Constrói um objeto [std::error_condition](<#/doc/error/error_condition>) a partir de um valor do tipo [std::io_errc](<#/doc/io/io_errc>) como se retornasse [std::error_condition](<#/doc/error/error_condition>)(static_cast&lt;int&gt;(e), [std::iostream_category](<#/doc/io/iostream_category>)()).

### Parâmetros

- **e** — número do código de erro

### Valor de retorno

Um valor do tipo [std::error_condition](<#/doc/error/error_condition>) que contém o número do código de erro de 'e' associado à categoria de erro "iostream".

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <system_error>
    
    int main()
    {
        std::error_condition ec = std::make_error_condition(std::io_errc::stream);
        std::cout << "error condition for io_errc::stream has value " << ec.value()
                  << "\nand message \"" << ec.message() << "\"\n";
    }
```

Saída:
```
    error condition for io_errc::stream has value 1
    and message "unspecified iostream_category error"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2087](<https://cplusplus.github.io/LWG/issue2087>) | C++11 | `make_error_condition(io_errc)` não foi declarado noexcept | declarado noexcept

### Veja também

[ error_condition](<#/doc/error/error_condition>)(C++11) | contém um código de erro portátil
(classe)
[ io_errc](<#/doc/io/io_errc>)(C++11) | os códigos de erro de stream de E/S
(enum)