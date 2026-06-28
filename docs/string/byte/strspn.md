# std::strspn

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
size_t strspn( const char* dest, const char* src );
```

Retorna o comprimento do segmento inicial máximo (span) da string de bytes apontada por dest, que consiste apenas dos caracteres encontrados na string de bytes apontada por src.

### Parâmetros

- **dest** — ponteiro para a string de bytes terminada em nulo a ser analisada
- **src** — ponteiro para a string de bytes terminada em nulo que contém os caracteres a serem procurados

### Valor de retorno

O comprimento do segmento inicial máximo que contém apenas caracteres da string de bytes apontada por src.

### Exemplo

Execute este código
```
    #include <cstring>
    #include <iostream>
    #include <string>
     
    const char* low_alpha = "qwertyuiopasdfghjklzxcvbnm";
     
    int main()
    {
        std::string s = "abcde312$#@";
     
        std::size_t spnsz = std::strspn(s.c_str(), low_alpha);
        std::cout << "After skipping initial lowercase letters from '" << s
                  << "'\nThe remainder is '" << s.substr(spnsz) << "'\n";
    }
```

Saída:
```
    After skipping initial lowercase letters from 'abcde312$#@'
    The remainder is '312$#@'
```

### Veja também

[ strcspn](<#/doc/string/byte/strcspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas dos caracteres não encontrados em outra string de bytes
(função)
[ wcsspn](<#/doc/string/wide/wcsspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas dos caracteres largos encontrados em outra string larga
(função)
[ strpbrk](<#/doc/string/byte/strpbrk>) | encontra a primeira ocorrência de qualquer caractere de um conjunto de separadores
(função)
[C documentation](<#/>) para strspn