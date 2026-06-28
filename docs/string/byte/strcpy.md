# std::strcpy

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
char* strcpy( char* dest, const char* src );
```

  
Copia a string de caracteres apontada por src, incluindo o terminador nulo, para o array de caracteres cujo primeiro elemento é apontado por dest.

O comportamento é indefinido se o array dest não for grande o suficiente. O comportamento é indefinido se as strings se sobrepuserem.

### Parâmetros

dest  |  \-  |  ponteiro para o array de caracteres onde escrever   
---|---|---
src  |  \-  |  ponteiro para a string de bytes terminada em nulo de onde copiar   
  
### Valor de retorno

dest

### Exemplo

Execute este código
```
    #include <cstring>
    #include <iostream>
    #include <memory>
     
    int main()
    {
        const char* src = "Take the test.";
    //  src[0] = 'M'; // can't modify string literal
        auto dst = std::make_unique<char[]>(std::strlen(src) + 1); // +1 for null terminator
        std::strcpy(dst.get(), src);
        dst[0] = 'M';
        std::cout << src << '\n' << dst.get() << '\n';
    }
```

Saída: 
```
    Take the test.
    Make the test.
```

### Veja também

[ strncpy](<#/doc/string/byte/strncpy>) |  copia uma certa quantidade de caracteres de uma string para outra   
(função)  
[ memcpy](<#/doc/string/byte/memcpy>) |  copia um buffer para outro   
(função)  
[Documentação C](<#/>) para strcpy