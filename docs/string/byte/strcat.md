# std::strcat

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
char* strcat( char* dest, const char* src );
```

Anexa uma cópia da string de caracteres apontada por src ao final da string de caracteres apontada por dest. O caractere src[0] substitui o terminador nulo no final de dest. A string de bytes resultante é terminada em nulo.

O comportamento é indefinido se o array de destino não for grande o suficiente para o conteúdo de src e dest e o caractere nulo terminador.

O comportamento é indefinido se as strings se sobrepuserem.

### Parâmetros

- **dest** — ponteiro para a string de bytes terminada em nulo à qual anexar
- **src** — ponteiro para a string de bytes terminada em nulo da qual copiar

### Valor de retorno

dest

### Observações

Como `strcat` precisa procurar o final de dest em cada chamada, é ineficiente concatenar muitas strings em uma usando `strcat`.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <cstring>
    
    int main() 
    {
        char str[50] = "Hello ";
        char str2[50] = "World!";
        std::strcat(str, str2);
        std::strcat(str, " Goodbye World!");
        std::puts(str);
    }
```

Saída:
```
    Hello World! Goodbye World!
```

### Veja também

[ strncat](<#/doc/string/byte/strncat>) | concatena uma certa quantidade de caracteres de duas strings
(função)
[ strcpy](<#/doc/string/byte/strcpy>) | copia uma string para outra
(função)
[Documentação C](<#/>) para strcat