# std::strcmp

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
int strcmp( const char* lhs, const char* rhs );
```

Compara duas strings de bytes terminadas em nulo lexicograficamente.

O sinal do resultado é o sinal da diferença entre os valores do primeiro par de caracteres (ambos interpretados como unsigned char) que diferem nas strings sendo comparadas.

O comportamento é indefinido se lhs ou rhs não forem ponteiros para strings terminadas em nulo.

### Parâmetros

- **lhs, rhs** — ponteiros para as strings de bytes terminadas em nulo a serem comparadas

### Valor de retorno

Valor negativo se lhs aparecer antes de rhs na ordem lexicográfica.

Zero se lhs e rhs forem iguais na comparação.

Valor positivo se lhs aparecer depois de rhs na ordem lexicográfica.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cstring>
    #include <iostream>
    #include <vector>
    
    int main() 
    {
        std::vector<const char*> cats{"Heathcliff", "Snagglepuss", "Hobbes", "Garfield"};
        std::sort(cats.begin(), cats.end(), 
        {
            return std::strcmp(strA, strB) < 0;
        }); 
    
        for (const char* cat : cats)
            std::cout << cat << '\n';
    }
```

Saída:
```
    Garfield
    Heathcliff
    Hobbes
    Snagglepuss
```

### Veja também

[ strncmp](<#/doc/string/byte/strncmp>) | compara um certo número de caracteres de duas strings
(função)
[ wcscmp](<#/doc/string/wide/wcscmp>) | compara duas wide strings
(função)
[ memcmp](<#/doc/string/byte/memcmp>) | compara dois buffers
(função)
[ strcoll](<#/doc/string/byte/strcoll>) | compara duas strings de acordo com a locale atual
(função)
[Documentação C](<#/>) para strcmp