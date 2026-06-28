# std::strpbrk

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
const char* strpbrk( const char* dest, const char* breakset );
char* strpbrk( char* dest, const char* breakset );
```

Examina a string de bytes terminada em nulo apontada por dest em busca de qualquer caractere da string de bytes terminada em nulo apontada por breakset, e retorna um ponteiro para esse caractere.

### Parâmetros

- **dest** — ponteiro para a string de bytes terminada em nulo a ser analisada
- **breakset** — ponteiro para a string de bytes terminada em nulo que contém os caracteres a serem procurados

### Valor de retorno

Ponteiro para o primeiro caractere em dest que também está em breakset, ou ponteiro nulo se nenhum caractere desse tipo existir.

### Notas

O nome significa "string pointer break" (quebra de ponteiro de string), porque ele retorna um ponteiro para o primeiro dos caracteres separadores ("break").

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        const char* str = "hello world, friend of mine!";
        const char* sep = " ,!";
    
        unsigned int cnt = 0;
        do
        {
            str = std::strpbrk(str, sep); // find separator
            std::cout << std::quoted(str) << '\n';
            if (str)
                str += std::strspn(str, sep); // skip separator
            ++cnt; // increment word count
        } while (str && *str);
    
        std::cout << "There are " << cnt << " words\n";
    }
```

Saída:
```
    " world, friend of mine!"
    ", friend of mine!"
    " of mine!"
    " mine!"
    "!"
    There are 5 words
```

### Veja também

[ strcspn](<#/doc/string/byte/strcspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres não encontrados em outra string de bytes
(função)
[ strtok](<#/doc/string/byte/strtok>) | encontra o próximo token em uma string de bytes
(função)
[ strchr](<#/doc/string/byte/strchr>) | encontra a primeira ocorrência de um caractere
(função)
[ wcspbrk](<#/doc/string/wide/wcspbrk>) | encontra a primeira localização de qualquer caractere largo em uma string larga, em outra string larga
(função)
[Documentação C](<#/>) para strpbrk