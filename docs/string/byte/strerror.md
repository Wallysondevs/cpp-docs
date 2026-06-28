# std::strerror

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
char* strerror( int errnum );
```

Retorna um ponteiro para a descrição textual do código de erro de sistema errnum, idêntica à descrição que seria impressa por [`std::perror()`](<#/doc/io/c/perror>).

errnum é geralmente adquirido da variável `errno`, no entanto, a função aceita qualquer valor do tipo int. O conteúdo da string é específico da localidade.

A string retornada não deve ser modificada pelo programa, mas pode ser sobrescrita por uma chamada subsequente à função `strerror`. `strerror` não é exigida ser thread-safe. As implementações podem retornar diferentes ponteiros para literais de string estáticas somente leitura ou podem retornar o mesmo ponteiro repetidamente, apontando para um buffer estático no qual `strerror` coloca a string.

### Parâmetros

- **errnum** — valor inteiro que se refere a um código de erro

### Valor de retorno

Ponteiro para uma string de bytes terminada em nulo correspondente ao código de erro [`errno`](<#/doc/error/errno>) errnum.

### Notas

[`POSIX`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/strerror.html>) permite que chamadas subsequentes a `strerror` invalidem o valor do ponteiro retornado por uma chamada anterior. Também especifica que é o facet de localidade [`LC_MESSAGES`](<#/doc/locale/LC_categories>) que controla o conteúdo dessas mensagens.

POSIX possui uma versão thread-safe chamada `strerror_r` definida. Glibc [`define uma versão incompatível`](<https://www.club.cc.cmu.edu/~cmccabe/blog_strerror.html>)`.`

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <clocale>
    #include <cmath>
    #include <cstring>
    #include <iostream>
    
    int main()
    {
        const double not_a_number = std::log(-1.0);
        std::cout << not_a_number << '\n';
    
        if (errno == EDOM)
        {
            std::cout << "log(-1) failed: " << std::strerror(errno) << '\n';
            std::setlocale(LC_MESSAGES, "de_DE.utf8");
            std::cout << "Or, in German, " << std::strerror(errno) << '\n';
        }
    }
```

Saída possível:
```
    nan
    log(-1) failed: Numerical argument out of domain
    Or, in German, Das numerische Argument ist ausserhalb des Definitionsbereiches
```

### Veja também

[` perror`](<#/doc/io/c/perror>) | exibe uma string de caracteres correspondente ao erro atual para [`stderr`](<#/doc/io/c/std_streams>)
(função)
[` E2BIG, EACCES, ..., EXDEV`](<#/doc/error/errno_macros>) | macros para condições de erro padrão compatíveis com POSIX
(constante macro)
[`Documentação C`](<#/>) para strerror