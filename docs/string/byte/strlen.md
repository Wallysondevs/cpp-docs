# std::strlen

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
std::size_t strlen( const char* str );
```

Retorna o comprimento da string de bytes fornecida, ou seja, o número de caracteres em um array de caracteres cujo primeiro elemento é apontado por str até, mas não incluindo, o primeiro caractere nulo. O comportamento é indefinido se não houver um caractere nulo no array de caracteres apontado por str.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser examinada

### Valor de retorno

O comprimento da string str terminada em nulo.

### Possível implementação
```
    std::size_t strlen(const char* start)
    {
        // NB: start não é verificado para nullptr!
        const char* end = start;
        while (*end != '\0')
            ++end;
        return end - start;
    }
```

---

### Exemplo

Execute este código
```
    #include <cstring>
    #include <iostream>

    int main()
    {
        const char str[] = "dog cat\0mouse";

        std::cout << "without null character: " << std::strlen(str) << '\n'
                  << "with null character: " << sizeof str << '\n';
    }
```

Saída:
```
    without null character: 7
    with null character: 14
```

### Veja também

[ wcslen](<#/doc/string/wide/wcslen>) | retorna o comprimento de uma wide string
(função)
[ mblen](<#/doc/string/multibyte/mblen>) | retorna o número de bytes no próximo caractere multibyte
(função)
[Documentação C](<#/>) para strlen