# std::system_category

Definido no header `[<system_error>](<#/doc/header/system_error>)`

```cpp
const std::error_category& system_category() noexcept;  // (desde C++11)
```

Obtém uma referência para o objeto de categoria de erro estático para erros reportados pelo sistema operacional. O objeto é obrigado a sobrescrever a função virtual [std::error_category::name()](<#/doc/error/error_category/name>) para retornar um ponteiro para a string "system". Ele também é obrigado a sobrescrever a função virtual [std::error_category::default_error_condition()](<#/doc/error/error_category/default_error_condition>) para mapear os códigos de erro que correspondem aos valores POSIX [errno](<#/doc/error/errno>) para [std::generic_category](<#/doc/error/generic_category>).

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência para o objeto estático de tipo de tempo de execução não especificado, derivado de [std::error_category](<#/doc/error/error_category>).

### Notas

No Windows, `system_category()` tipicamente mapeia alguns [códigos de erro do Windows](<https://learn.microsoft.com/en-us/windows/win32/debug/system-error-codes#system-error-codes>) para os POSIX. No POSIX, `system_category()` tende a ser equivalente a [std::generic_category()](<#/doc/error/generic_category>) exceto pelo nome.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <system_error>
    
    int main()
    {
        for (int const code : {EDOM, 10001})
        {
            const std::error_condition econd =
                std::system_category().default_error_condition(code);
    
            std::cout << "Category: " << econd.category().name() << '\n'
                      << "Value:    " << econd.value() << '\n'
                      << "Message:  " << econd.message() << "\n\n";
        }
    }
```

Saída possível:
```
    Category: generic
    Value:    33
    Message:  Numerical argument out of domain
    
    Category: system
    Value:    10001
    Message:  Unknown error 10001
```

### Veja também

[ generic_category](<#/doc/error/generic_category>)(C++11) | identifica a categoria de erro genérica
(função)
[ errc](<#/doc/error/errc>)(C++11) | a enumeração [std::error_condition](<#/doc/error/error_condition>) listando todas as constantes de macro padrão [`<cerrno>`](<#/doc/header/cerrno>)
(classe)