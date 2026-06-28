# std::strstr

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
const char* strstr( const char* haystack, const char* needle );
char* strstr( char* haystack, const char* needle );
```

Encontra a primeira ocorrência da string de bytes `needle` na string de bytes apontada por `haystack`. Os caracteres nulos terminadores não são comparados.

### Parâmetros

- **haystack** — ponteiro para a string de bytes terminada em nulo a ser examinada
- **needle** — ponteiro para a string de bytes terminada em nulo a ser procurada

### Valor de retorno

Ponteiro para o primeiro caractere da substring encontrada em `haystack`, ou um ponteiro nulo se nenhum caractere for encontrado. Se `needle` apontar para uma string vazia, `haystack` é retornado.

### Exemplo

Execute este código
```
    #include <cstring>
    #include <iomanip>
    #include <iostream>
     
    int main()
    {
        const char* str = "Try not. Do, or do not. There is no try.";
        const char* target = "not";
     
        for (const char* result = str; (result = std::strstr(result, target)); ++result)
            std::cout << "Found " << std::quoted(target)
                      << " starting at (" << result - str << "): "
                      << std::quoted(result) << '\n';
    }
```

Saída:
```
    Found "not" starting at (4): "not. Do, or do not. There is no try."
    Found "not" starting at (19): "not. There is no try."
```

### Veja também

[ find](<#/doc/string/basic_string/find>) | encontra a primeira ocorrência da substring fornecida
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ wcsstr](<#/doc/string/wide/wcsstr>) | encontra a primeira ocorrência de uma wide string dentro de outra wide string
(função)
[ strchr](<#/doc/string/byte/strchr>) | encontra a primeira ocorrência de um caractere
(função)
[ strrchr](<#/doc/string/byte/strrchr>) | encontra a última ocorrência de um caractere
(função)
[Documentação C](<#/>) para strstr