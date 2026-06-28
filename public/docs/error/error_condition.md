# std::error_condition

Definido no header `[<system_error>](<#/doc/header/system_error>)`

```cpp
class error_condition;  // (desde C++11)
```

`std::error_condition` armazena um valor independente de plataforma que identifica uma condição de erro. Assim como [std::error_code](<#/doc/error/error_code>), é unicamente identificado por um valor inteiro e uma [std::error_category](<#/doc/error/error_category>), mas, ao contrário de [std::error_code](<#/doc/error/error_code>), o valor não é dependente da plataforma.

Uma implementação típica armazena um membro de dados inteiro (o valor) e um ponteiro para uma [std::error_category](<#/doc/error/error_category>).

### Funções membro

[ (construtor)](<#/doc/error/error_condition/error_condition>) | constrói um `error_condition`
(função membro pública)
[ operator=](<#/>) | substitui o conteúdo
(função membro pública)
[ assign](<#/doc/error/error_condition/assign>) | substitui o conteúdo
(função membro pública)
[ clear](<#/doc/error/error_condition/clear>) | define o `error_condition` para o valor ​0​ em `generic_category`
(função membro pública)
[ value](<#/doc/error/error_condition/value>) | obtém o valor do `error_condition`
(função membro pública)
[ category](<#/doc/error/error_condition/category>) | obtém a `error_category` para este `error_condition`
(função membro pública)
[ message](<#/doc/error/error_condition/message>) | obtém a string explicativa
(função membro pública)
[ operator bool](<#/doc/error/error_condition/operator_bool>) | verifica se o valor é diferente de zero
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=>](<#/doc/error/error_condition/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara `error_condition`s e `error_code`s
(função)

### Classes auxiliares

[ is_error_condition_enum](<#/doc/error/error_condition/is_error_condition_enum>)(C++11) | identifica uma enumeração como um **std::error_condition**
(template de classe)
[ std::hash<std::error_condition>](<#/doc/error/error_condition/hash>)(C++17) | suporte a hash para `std::error_condition`
(especialização de template de classe)

### Notas

A [comparação](<#/doc/error/error_condition/operator_cmp>) entre um [std::error_code](<#/doc/error/error_code>) e um `std::error_condition` é definida por suas categorias de erro. Notavelmente, uma condição de erro de [std::generic_category](<#/doc/error/generic_category>) pode ser comparada como igual a um código de erro de uma categoria específica (por exemplo, [std::system_category](<#/doc/error/system_category>)), se eles representarem o mesmo tipo de erro.

Um valor [std::errc](<#/doc/error/errc>) pode ser comparado a um código de erro via conversão implícita para `std::error_condition`.

Execute este código
```cpp
    #include <cerrno>
    #include <iostream>
    #include <system_error>
    #include <Windows.h>
    
    int main()
    {
        std::error_code ec{ERROR_FILE_EXISTS, std::system_category()};
        std::error_condition econd{EEXIST, std::generic_category()};
    
        std::cout.setf(std::ios::boolalpha);
        std::cout << (ec == econd) << '\n'; // typically true
        std::cout << (ec == std::errc::file_exists) << '\n'; // ditto
        std::cout << (ec == make_error_code(std::errc::file_exists)) << '\n'; // false:
                                                                         // different category
    }
```

Saída possível:
```
    true
    true
    false
```

### Veja também

[ error_code](<#/doc/error/error_code>)(C++11) | armazena um código de erro dependente da plataforma
(classe)
[ error_category](<#/doc/error/error_category>)(C++11) | classe base para categorias de erro
(classe)
[ make_error_condition(std::errc)](<#/doc/error/errc/make_error_condition>)(C++11) | cria uma condição de erro para um valor `errc` e
(função)