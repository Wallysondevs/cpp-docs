# std::regex_error

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
class regex_error;
```

Define o tipo de objeto de exceção lançado para reportar erros na biblioteca de expressões regulares.

Diagrama de herança

### Funções membro

[ (construtor)](<#/doc/regex/regex_error/regex_error>) | constrói um objeto `regex_error`
(função membro pública)
[ operator=](<#/>) | substitui o objeto `regex_error`
(função membro pública)
[ code](<#/doc/regex/regex_error/code>) | obtém o [std::regex_constants::error_type](<#/doc/regex/error_type>) para um `regex_error`
(função membro pública)

## Herdado de [std::runtime_error](<#/doc/error/runtime_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    
    int main()
    {
        try
        {
            std::regex re("[a-b][a");
        }
        catch (const std::regex_error& e)
        {
            std::cout << "regex_error caught: " << e.what() << '\n';
            if (e.code() == std::regex_constants::error_brack)
                std::cout << "The code was error_brack\n";
        }
    }
```

Saída possível:
```
    regex_error caught: The expression contained mismatched [ and ].
    The code was error_brack
```