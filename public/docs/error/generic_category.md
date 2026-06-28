# std::generic_category

Definido no cabeçalho `[<system_error>](<#/doc/header/system_error>)`

```c
const std::error_category& generic_category() noexcept;
```

Obtém uma referência para o objeto estático de categoria de erro para erros genéricos. O objeto é obrigado a sobrescrever a função virtual error_category::name() para retornar um ponteiro para a string "generic". É usado para identificar condições de erro que correspondem aos códigos POSIX [errno](<#/doc/error/errno>).

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o objeto estático de tipo de tempo de execução não especificado, derivado de [std::error_category](<#/doc/error/error_category>).

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <iostream>
    #include <string>
    #include <system_error>
    
    int main()
    {
        std::error_condition econd = std::generic_category().default_error_condition(EDOM);
        std::cout << "Category: " << econd.category().name() << '\n'
                  << "Value: " << econd.value() << '\n'
                  << "Message: " << econd.message() << '\n';
    }
```

Saída:
```
    Category: generic
    Value: 33
    Message: Numerical argument out of domain
```

### Veja também

[ system_category](<#/doc/error/system_category>)(C++11) | identifica a categoria de erro do sistema operacional
(função)
[ errc](<#/doc/error/errc>)(C++11) | a enumeração [std::error_condition](<#/doc/error/error_condition>) listando todas as constantes de macro padrão de [&lt;cerrno&gt;](<#/doc/header/cerrno>)
(classe)