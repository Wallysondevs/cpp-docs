# LC_ALL, LC_COLLATE, LC_CTYPE, LC_MONETARY, LC_NUMERIC, LC_TIME

Definido no cabeçalho `[<clocale>](<#/doc/header/clocale>)`

```c
#define LC_ALL /* implementation defined */
#define LC_COLLATE /* implementation defined */
#define LC_CTYPE /* implementation defined */
#define LC_MONETARY /* implementation defined */
#define LC_NUMERIC /* implementation defined */
#define LC_TIME /* implementation defined */
```

  
Cada uma das constantes de macro acima se expande para expressões constantes inteiras com valores distintos que são adequados para uso como o primeiro argumento de [std::setlocale](<#/doc/locale/setlocale>). 

Constante  |  Explicação   
---|---
`LC_ALL` |  seleciona o locale C inteiro   
`LC_COLLATE` |  seleciona a categoria de ordenação (collation) do locale C   
`LC_CTYPE` |  seleciona a categoria de classificação de caracteres do locale C   
`LC_MONETARY` |  seleciona a categoria de formatação monetária do locale C   
`LC_NUMERIC` |  seleciona a categoria de formatação numérica do locale C   
`LC_TIME` |  seleciona a categoria de formatação de tempo do locale C   
  
Constantes de macro adicionais, com nomes que começam com `LC_` seguidos por pelo menos uma letra maiúscula, podem ser definidas em [`<clocale>`](<#/doc/header/clocale>). Por exemplo, a especificação POSIX exige `LC_MESSAGES` (que controla [std::perror](<#/doc/io/c/perror>) e [std::strerror](<#/doc/string/byte/strerror>)), ISO/IEC 30112:2014 ([rascunho de 2014](<https://www.open-std.org/JTC1/SC35/WG5/docs/30112d10.pdf>)) define adicionalmente `LC_IDENTIFICATION`, `LC_XLITERATE`, `LC_NAME`, `LC_ADDRESS`, `LC_TELEPHONE`, `LC_PAPER`, `LC_MEASUREMENT` e `LC_KEYBOARD`, que são suportadas pela biblioteca C GNU (exceto por `LC_XLITERATE`). 

### Exemplo

Run this code
```cpp
    #include <clocale>
    #include <cstdio>
    #include <ctime>
    #include <cwchar>
    
    int main()
    {
        // the C locale will be the UTF-8 enabled English:
        std::setlocale(LC_ALL, "en_US.UTF-8");
    
        // decimal dot will be German:
        std::setlocale(LC_NUMERIC, "de_DE.UTF-8");
    
        // date/time formatting will be Japanese:
        std::setlocale(LC_TIME, "ja_JP.UTF-8");
    
        wchar_t str[100];
        std::time_t t = std::time(nullptr);
        std::wcsftime(str, 100, L"%A %c", std::localtime(&t));
        std::wprintf(L"Number: %.2f\nDate: %Ls\n", 3.14, str);
    }
```

Saída: 
```
    Number: 3,14
    Date: 日曜日 2022年11月06日 17時55分10秒
```

### Veja também

[ setlocale](<#/doc/locale/setlocale>) |  obtém e define o locale C atual   
(função)  
[ locale](<#/doc/locale/locale>) |  conjunto de facets polimórficos que encapsulam diferenças culturais   
(classe)  
[Documentação C](<#/>) para categorias de locale