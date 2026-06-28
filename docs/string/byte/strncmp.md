# std::strncmp

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
int strncmp( const char* lhs, const char* rhs, std::size_t count );
```

Compara no máximo `count` caracteres de dois arrays possivelmente terminados em nulo. A comparação é feita lexicograficamente. Caracteres que seguem o caractere nulo não são comparados.

O sinal do resultado é o sinal da diferença entre os valores do primeiro par de caracteres (ambos interpretados como `unsigned char`) que diferem nos arrays sendo comparados.

O comportamento é indefinido quando o acesso ocorre além do final de qualquer um dos arrays `lhs` ou `rhs`. O comportamento é indefinido quando `lhs` ou `rhs` é um ponteiro nulo.

### Parâmetros

- **lhs, rhs** — ponteiros para os arrays possivelmente terminados em nulo a serem comparados
- **count** — número máximo de caracteres a serem comparados

### Valor de retorno

Valor negativo se `lhs` aparecer antes de `rhs` na ordem lexicográfica.

Zero se `lhs` e `rhs` forem iguais na comparação, ou se `count` for zero.

Valor positivo se `lhs` aparecer depois de `rhs` na ordem lexicográfica.

### Notas

Esta função não é sensível à localidade (locale-sensitive), ao contrário de [std::strcoll](<#/doc/string/byte/strcoll>) e [std::strxfrm](<#/doc/string/byte/strxfrm>).

### Exemplo

Execute este código
```
    #include <cstring>
    #include <iostream>
    
    void demo(const char* lhs, const char* rhs, int sz)
    {
        const int rc = std::strncmp(lhs, rhs, sz);
        if (rc < 0)
            std::cout << "First " << sz << " chars of ["
                      << lhs << "] precede [" << rhs << "]\n";
        else if (rc > 0)
            std::cout << "First " << sz << " chars of ["
                      << lhs << "] follow [" << rhs << "]\n";
        else
            std::cout << "First " << sz << " chars of ["
                      << lhs << "] equal [" << rhs << "]\n";
    }
    
    int main()
    {
        demo("Hello, world!", "Hello, everybody!", 13);
        demo("Hello, everybody!", "Hello, world!", 13);
        demo("Hello, everybody!", "Hello, world!", 7);
        demo("Hello, everybody!" + 12, "Hello, somebody!" + 11, 5);
    }
```

Saída:
```
    First 13 chars of [Hello, world!] follow [Hello, everybody!]
    First 13 chars of [Hello, everybody!] precede [Hello, world!]
    First 7 chars of [Hello, everybody!] equal [Hello, world!]
    First 5 chars of [body!] equal [body!]
```

### Veja também

[ strcmp](<#/doc/string/byte/strcmp>) | compara duas strings
(função)
[ wcsncmp](<#/doc/string/wide/wcsncmp>) | compara uma certa quantidade de caracteres de duas wide strings
(função)
[ memcmp](<#/doc/string/byte/memcmp>) | compara dois buffers
(função)
[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com a localidade atual
(função)
[Documentação C](<#/>) para strncmp