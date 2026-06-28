# std::iostream_category

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
const std::error_category& iostream_category() noexcept;
```

Obtém uma referência para o objeto estático de categoria de erro para erros de iostream. O objeto é obrigado a sobrescrever a função virtual error_category::name() para retornar um ponteiro para a string "iostream". Ele é usado para identificar códigos de erro fornecidos nas exceções do tipo [std::ios_base::failure](<#/doc/io/ios_base/failure>).

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o objeto estático de tipo de tempo de execução não especificado, derivado de [std::error_category](<#/doc/error/error_category>).

### Exemplo

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
            std::cout << "Caught an ios_base::failure.\n"
                      << "Error code: " << e.code().value() 
                      << " (" << e.code().message() << ")\n"
                      << "Error category: " << e.code().category().name() << '\n';
     
        }
    }
```

Saída possível:
```
    Caught an ios_base::failure.
    Error code: 1 (unspecified iostream_category error)
    Error category: iostream
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2087](<https://cplusplus.github.io/LWG/issue2087>) | C++11 | `iostream_category` não foi declarado noexcept | declarado noexcept

### Veja também

[ failure](<#/doc/io/ios_base/failure>) | exceção de stream
(classe membro pública de `std::ios_base`)
[ io_errc](<#/doc/io/io_errc>)(C++11) | os códigos de erro de stream de E/S
(enum)