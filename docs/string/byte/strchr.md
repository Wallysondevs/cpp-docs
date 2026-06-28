# std::strchr

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
const char* strchr( const char* str, int ch );
char* strchr( char* str, int ch );
```

Encontra a primeira ocorrência do caractere static_cast&lt;char&gt;(ch) na string de bytes apontada por str.

O caractere nulo de terminação é considerado parte da string e pode ser encontrado se a busca for por '\0'.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser analisada
- **ch** — caractere a ser procurado

### Valor de retorno

Ponteiro para o caractere encontrado em str, ou um ponteiro nulo se nenhum caractere for encontrado.

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
     
    int main()
    {
        const char* str = "Try not. Do, or do not. There is no try.";
        char target = 'T';
        const char* result = str;
     
        while ((result = std::strchr(result, target)) != nullptr)
        {
            std::cout << "Found '" << target
                      << "' starting at '" << result << "'\n";
     
            // Increment result, otherwise we'll find target at the same location
            ++result;
        }
    }
```

Saída:
```
    Found 'T' starting at 'Try not. Do, or do not. There is no try.'
    Found 'T' starting at 'There is no try.'
```

### Veja também

[ memchr](<#/doc/string/byte/memchr>) | busca em um array pela primeira ocorrência de um caractere
(função)
[ find](<#/doc/string/basic_string/find>) | encontra a primeira ocorrência da substring fornecida
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)
[ wcschr](<#/doc/string/wide/wcschr>) | encontra a primeira ocorrência de um caractere largo em uma string larga
(função)
[ strrchr](<#/doc/string/byte/strrchr>) | encontra a última ocorrência de um caractere
(função)
[ strpbrk](<#/doc/string/byte/strpbrk>) | encontra a primeira localização de qualquer caractere de um conjunto de separadores
(função)
[Documentação C](<#/>) para strchr