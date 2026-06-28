# std::filesystem::filesystem_error

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
class filesystem_error;
```

A classe `std::filesystem::filesystem_error` define um objeto de exceção que é lançado em caso de falha pelas sobrecargas lançadoras das funções na biblioteca filesystem.

Diagrama de herança

### Funções membro

[ (construtor)](<#/doc/filesystem/filesystem_error/filesystem_error>) | constrói o objeto de exceção
(função membro pública)
[ operator=](<#/>) | substitui o objeto de exceção
(função membro pública)
[ path1path2](<#/doc/filesystem/filesystem_error/path>) | retorna os paths que estiveram envolvidos na operação que causou o erro
(função membro pública)
[ what](<#/doc/filesystem/filesystem_error/what>) | retorna a string explicativa
(função membro pública)

## Herdado de [std::system_error](<#/doc/error/system_error>)

### Funções membro

[ code](<#/doc/error/system_error/code>) | retorna o código de erro
(função membro pública de `std::system_error`)
[ what](<#/doc/error/system_error/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::system_error`)

## Herdado de [std::runtime_error](<#/doc/error/runtime_error>)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

Para garantir que as funções de cópia de `filesystem_error` sejam noexcept, implementações típicas armazenam um objeto contendo o valor de retorno de [what()](<#/doc/filesystem/filesystem_error/what>) e dois objetos [std::filesystem::path](<#/doc/filesystem/path>) referenciados por [path1()](<#/doc/filesystem/filesystem_error/path>) e [path2()](<#/doc/filesystem/filesystem_error/path>) respectivamente em um armazenamento separado, alocado e com contagem de referências.

Atualmente, a [implementação da MS STL](<https://github.com/microsoft/STL/blob/master/stl/inc/filesystem#L1749>) não está em conformidade: os objetos mencionados acima são armazenados diretamente no objeto `filesystem`, o que torna as funções de cópia não noexcept.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    #include <system_error>
    
    int main()
    {
        const std::filesystem::path from{"/none1/a"}, to{"/none2/b"};
    
        try
        {
            std::filesystem::copy_file(from, to); // throws: files do not exist
        }
        catch (std::filesystem::filesystem_error const& ex)
        {
            std::cout << "what():  " << ex.what() << '\n'
                      << "path1(): " << ex.path1() << '\n'
                      << "path2(): " << ex.path2() << '\n'
                      << "code().value():    " << ex.code().value() << '\n'
                      << "code().message():  " << ex.code().message() << '\n'
                      << "code().category(): " << ex.code().category().name() << '\n';
        }
    
        // All functions have non-throwing equivalents
        std::error_code ec;
        std::filesystem::copy_file(from, to, ec); // does not throw
        std::cout << "\nNon-throwing form sets error_code: " << ec.message() << '\n';
    }
```

Saída possível:
```
    what():  filesystem error: cannot copy file: No such file or directory [/none1/a] [/none2/b]
    path1(): "/none1/a"
    path2(): "/none2/b"
    code().value():    2
    code().message():  No such file or directory
    code().category(): generic
    
    Non-throwing form sets error_code: No such file or directory
```