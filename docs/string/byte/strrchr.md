# std::strrchr

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
const char* strrchr( const char* str, int ch );
char* strrchr( char* str, int ch );
```

Encontra a última ocorrência de ch (após conversão para char) na string de bytes apontada por str. O caractere nulo de terminação é considerado parte da string e pode ser encontrado se a busca for por '\0'.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser analisada
- **ch** — caractere a ser procurado

### Valor de retorno

Ponteiro para o caractere encontrado em str, ou ponteiro nulo se nenhum caractere for encontrado.

### Exemplo

Execute este código
```
    #include <cstring>
    #include <iostream>
     
    int main()
    {
        char input[] = "/home/user/hello.c";
        char* output = std::strrchr(input, '/');
        if (output)
            std::cout << output + 1 << '\n';
    }
```

Saída:
```
    hello.c
```

### Veja também

[ strchr](<#/doc/string/byte/strchr>) | encontra a primeira ocorrência de um caractere
(função)
[ wcsrchr](<#/doc/string/wide/wcsrchr>) | encontra a última ocorrência de um caractere largo em uma string larga
(função)
[ rfind](<#/doc/string/basic_string/rfind>) | encontra a última ocorrência de uma substring
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[Documentação C](<#/>) para strrchr