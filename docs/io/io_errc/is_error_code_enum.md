# std::is_error_code_enum&lt;std::io_errc&gt;

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
template<>
struct is_error_code_enum<std::io_errc> : public std::true_type {};
```

Esta especialização de `[std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)` informa outros componentes da biblioteca que valores do tipo `[std::io_errc](<#/doc/io/io_errc>)` são enumerações que contêm códigos de erro, o que os torna implicitamente conversíveis e atribuíveis a objetos do tipo `[std::error_code](<#/doc/error/error_code>)`.

## Herdado de `[ std::integral_constant](<#/doc/types/integral_constant>)`

### Constantes membro

value[estático] | true
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | `[std::integral_constant](<#/doc/types/integral_constant>)<bool, value>`

### Exemplo

A comparação entre e.code() e `[std::io_errc::stream](<#/doc/io/io_errc>)` compila porque `[std::is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)<[std::io_errc](<#/doc/io/io_errc>)>::value == true`.

Execute este código
```cpp
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

### Ver também

`[ is_error_code_enum](<#/doc/error/error_code/is_error_code_enum>)(C++11)` | identifica uma classe como uma enumeração `error_code`
(modelo de classe)
`[ error_code](<#/doc/error/error_code>)(C++11)` | contém um código de erro dependente da plataforma
(classe)
`[ io_errc](<#/doc/io/io_errc>)(C++11)` | os códigos de erro de stream de E/S
(enum)