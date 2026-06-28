# std::wcspbrk

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
const wchar_t* wcspbrk( const wchar_t* dest, const wchar_t* src );
wchar_t* wcspbrk( wchar_t* dest, const wchar_t* src );
```

  
Encontra o primeiro caractere na wide string apontada por `dest`, que também está na wide string apontada por `src`.

### Parâmetros

dest  |  \-  |  ponteiro para a wide string terminada em nulo a ser analisada   
---|---|---
src  |  \-  |  ponteiro para a wide string terminada em nulo que contém os caracteres a serem procurados   
  
### Valor de retorno

Ponteiro para o primeiro caractere em `dest` que também está em `src`, ou um ponteiro nulo se nenhum caractere desse tipo existir.

### Notas

O nome significa "wide character string pointer break" (quebra de ponteiro de string de caractere largo), porque ele retorna um ponteiro para o primeiro dos caracteres separadores ("break").

### Exemplo

Execute este código
```
    #include <cwchar>
    #include <iomanip>
    #include <iostream>
     
    int main()
    {
        const wchar_t* str = L"Hello world, friend of mine!";
        const wchar_t* sep = L" ,!";
     
        unsigned int cnt = 0;
        do
        {
            str = std::wcspbrk(str, sep); // find separator
            std::wcout << std::quoted(str) << L'\n';
            if (str)
                str += std::wcsspn(str, sep); // skip separator
            ++cnt; // increment word count
        } while (str && *str);
     
        std::wcout << L"There are " << cnt << L" words\n";
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

### Ver também

[ wcscspn](<#/doc/string/wide/wcscspn>) |  retorna o comprimento do segmento inicial máximo que consiste  
apenas nos caracteres largos _não_ encontrados em outra wide string   
(função)  
[ wcschr](<#/doc/string/wide/wcschr>) |  encontra a primeira ocorrência de um caractere largo em uma wide string   
(função)  
[ strpbrk](<#/doc/string/byte/strpbrk>) |  encontra a primeira localização de qualquer caractere de um conjunto de separadores   
(função)  
[Documentação C](<#/>) para wcspbrk