# std::strncat

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
char* strncat( char* dest, const char* src, std::size_t count );
```

  
Anexa uma string de bytes apontada por src a uma string de bytes apontada por dest. No máximo count caracteres são copiados. A string de bytes resultante é terminada em nulo.

A string de bytes de destino deve ter espaço suficiente para o conteúdo de dest e src, mais o caractere nulo de terminação, exceto que o tamanho de src é limitado por count.

O comportamento é indefinido se as strings se sobrepuserem.

### Parâmetros

dest  |  \-  |  ponteiro para a string de bytes terminada em nulo à qual anexar   
---|---|---
src  |  \-  |  ponteiro para a string de bytes terminada em nulo da qual copiar   
count  |  \-  |  número máximo de caracteres a copiar   
  
### Valor de retorno

dest

### Observações

Como `std::strncat` precisa procurar o final de dest em cada chamada, é ineficiente concatenar muitas strings em uma usando `std::strncat`.

### Exemplo

Execute este código
```
    #include <cstdio>
    #include <cstring>
     
    int main() 
    {
        char str[50] = "Hello ";
        const char str2[50] = "World!";
        std::strcat(str, str2);
        std::strncat(str, " Goodbye World!", 3); // may issue "truncated output" warning
        std::puts(str);
    }
```

Saída: 
```
    Hello World! Go
```

### Veja também

[ strcat](<#/doc/string/byte/strcat>) |  concatena duas strings   
(função)  
[ strcpy](<#/doc/string/byte/strcpy>) |  copia uma string para outra   
(função)  
[Documentação C](<#/>) para strncat