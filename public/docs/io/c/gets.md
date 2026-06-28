# std::gets

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
char* gets( char* str );
(removido em C++14)
```

Lê [stdin](<#/doc/io/c/std_streams>) para a string de caracteres fornecida até que um caractere de nova linha seja encontrado ou o fim do arquivo ocorra.

### Parâmetros

- **str** — string de caracteres a ser escrita

### Valor de retorno

`str` em caso de sucesso, um ponteiro nulo em caso de falha.

Se a falha foi causada pela condição de fim de arquivo, adicionalmente define o indicador _eof_ (veja [std::feof()](<#/doc/io/c/feof>)) em [stdin](<#/doc/io/c/std_streams>). Se a falha foi causada por algum outro erro, define o indicador _error_ (veja [std::ferror()](<#/doc/io/c/ferror>)) em [stdin](<#/doc/io/c/std_streams>).

### Observações

A função `std::gets()` não realiza verificação de limites. Portanto, esta função é extremamente vulnerável a ataques de estouro de buffer. Ela não pode ser usada com segurança (a menos que o programa seja executado em um ambiente que restrinja o que pode aparecer em `stdin`). Por esta razão, a função foi obsoleta em C++11 e removida completamente em C++14. [std::fgets()](<#/doc/io/c/fgets>) pode ser usada em seu lugar.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cstdio>
    #include <cstring>
    
    int main()
    {
        std::puts("Never use std::gets(). Use std::fgets() instead!");
    
        std::array<char, 16> buf;
    
        std::printf("Enter a string:\n>");
    
        if (std::fgets(buf.data(), buf.size(), stdin))
        {
            const auto len = std::strlen(buf.data());
            std::printf(
                "The input string:\n[%s] is %s and has the length %li characters.\n",
                buf.data(), len + 1 < buf.size() ? "not truncated" : "truncated", len
            );
        }
        else if (std::feof(stdin))
        {
            std::puts("Error: the end of stdin stream has been reached.");
        }
        else if (std::ferror(stdin))
        {
            std::puts("I/O error when reading from stdin.");
        }
        else
        {
            std::puts("Unknown stdin error.");
        }
    }
```

Saída possível:
```
    Never use std::gets(). Use std::fgets() instead!
    Enter a string:
    >Living on Earth is expensive, but it does include a free trip around the Sun.
    The input string:
    [Living on Earth] is truncated and has the length 15 characters.
```

### Ver também

[ scanffscanfsscanf](<#/doc/io/c/scanf>) | lê entrada formatada de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ fgets](<#/doc/io/c/fgets>) | obtém uma string de caracteres de um stream de arquivo
(função)
[ fputs](<#/doc/io/c/fputs>) | escreve uma string de caracteres para um stream de arquivo
(função)
[Documentação C](<#/>) para gets