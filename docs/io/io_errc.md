# std::io_errc

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
enum class io_errc {
stream = 1,
};
```

A enumeração com escopo `std::io_errc` define os códigos de erro reportados por streams de E/S em objetos de exceção [std::ios_base::failure](<#/doc/io/ios_base/failure>). Apenas um código de erro (`std::io_errc::stream`) é obrigatório, embora a implementação possa definir códigos de erro adicionais. Como a especialização apropriada de [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>) é fornecida, valores do tipo `std::io_errc` são implicitamente conversíveis para [std::error_code](<#/doc/error/error_code>).

### Constantes membro

Constante de enumeração | Valor
---|---
`stream` | 1

### Funções não-membro

[ make_error_code(std::io_errc)](<#/doc/io/io_errc/make_error_code>)(C++11) | constrói um código de erro de iostream
(função)
[ make_error_condition(std::io_errc)](<#/doc/io/io_errc/make_error_condition>)(C++11) | constrói uma condição de erro de iostream
(função)

### Classes auxiliares

[ is_error_code_enum<std::io_errc>](<#/doc/io/io_errc/is_error_code_enum>)(C++11) | estende o type trait [std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>) para identificar códigos de erro de iostream
(especialização de template de classe)

### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        std::ifstream f("doesn't exist");
        try
        {
            f.exceptions(f.failbit);
        }
        catch (const std::ios_base::failure& e)
        {
            std::cout << "Caught an ios_base::failure.\n";
            if (e.code() == std::io_errc::stream)
                std::cout << "The error code is std::io_errc::stream\n";
        }
    }
```

Saída:
```
    Caught an ios_base::failure.
    The error code is std::io_errc::stream
```

### Veja também

[ error_code](<#/doc/error/error_code>)(C++11) | mantém um código de erro dependente da plataforma
(classe)
[ error_condition](<#/doc/error/error_condition>)(C++11) | mantém um código de erro portátil
(classe)
[ failure](<#/doc/io/ios_base/failure>) | exceção de stream
(classe membro pública de `std::ios_base`)