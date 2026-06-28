# std::strncpy

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
char* strncpy( char* dest, const char* src, std::size_t count );
```

Copia no máximo `count` caracteres da string de bytes apontada por `src` (incluindo o caractere nulo terminador) para o array de caracteres apontado por `dest`.

Se `count` for atingido antes que a string `src` inteira seja copiada, o array de caracteres resultante não é terminado em nulo.

Se, após copiar o caractere nulo terminador de `src`, `count` não for atingido, caracteres nulos adicionais são escritos em `dest` até que o total de `count` caracteres tenha sido escrito.

Se as strings se sobrepuserem, o comportamento é indefinido.

### Parâmetros

- **dest** — ponteiro para o array de caracteres para o qual copiar
- **src** — ponteiro para a string de bytes da qual copiar
- **count** — número máximo de caracteres a copiar

### Valor de retorno

`dest`

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    
    int main()
    {
        const char* src = "hi";
        char dest[6] = {'a', 'b', 'c', 'd', 'e', 'f'};
        std::strncpy(dest, src, 5);
    
        std::cout << "The contents of dest are: ";
        for (char c : dest)
        {
            if (c)
                std::cout << c << ' ';
            else
                std::cout << "\\0" << ' ';
        }
        std::cout << '\n';
    }
```

Saída:
```
    The contents of dest are: h i \0 \0 \0 f
```

### Veja também

[ strcpy](<#/doc/string/byte/strcpy>) | copia uma string para outra
(função)
[ memcpy](<#/doc/string/byte/memcpy>) | copia um buffer para outro
(função)
[documentação C](<#/>) para strncpy