# std::perror

Definido no cabeçalho `[<cstdio>](<#/doc/header/cstdio>)`

```c
void perror( const char *s );
```

Imprime uma descrição textual do código de erro atualmente armazenado na variável de sistema [errno](<#/doc/error/errno>) para [stderr](<#/doc/io/c/std_streams>).

A descrição é formada pela concatenação dos seguintes componentes:

*   o conteúdo da string de bytes terminada em nulo apontada por s, seguido por ": " (a menos que s seja um ponteiro nulo ou o caractere apontado por s seja o caractere nulo).
*   uma string de mensagem de erro definida pela implementação descrevendo o código de erro armazenado em `errno`, seguida por '\n'. A string da mensagem de erro é idêntica ao resultado de [std::strerror](<#/doc/string/byte/strerror>)(errno).

### Parâmetros

s | \- | ponteiro para uma string terminada em nulo com mensagem explicativa

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cmath>
    #include <cstdio>
    
    int main()
    {
        double not_a_number = std::log(-1.0);
        if (errno == EDOM)
            std::perror("log(-1) failed");
        std::printf("%f\n", not_a_number);
    }
```

Saída possível:
```
    log(-1) failed: Numerical argument out of domain
    nan
```

### Veja também

[ errno](<#/doc/error/errno>) | macro que se expande para uma variável de número de erro thread-local compatível com POSIX
---|---
(variável macro) |
[ strerror](<#/doc/string/byte/strerror>) | retorna uma versão textual de um dado código de erro
(função) |
[Documentação C](<#/>) para perror