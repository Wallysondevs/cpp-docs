# std::setlocale

Definido no cabeçalho `[<clocale>](<#/doc/header/clocale>)`

```c
char* setlocale( int category, const char* locale );
```

A função `setlocale` instala o locale de sistema especificado ou uma porção dele como o novo locale C. As modificações permanecem em vigor e influenciam a execução de todas as funções da biblioteca C sensíveis ao locale até a próxima chamada a `setlocale`. Se `locale` for um ponteiro nulo, `setlocale` consulta o locale C atual sem modificá-lo.

### Parâmetros

- **category** — identificador da categoria do locale, uma das macros [`LC_xxx`](<#/doc/locale/LC_categories>). Pode ser ​0​.
- **locale** — identificador de locale específico do sistema. Pode ser "" para o locale preferido pelo usuário ou "C" para o locale mínimo

### Valor de retorno

Ponteiro para uma string estreita terminada em nulo que identifica o locale C após aplicar as alterações, se houver, ou ponteiro nulo em caso de falha.

Uma cópia da string retornada, juntamente com a categoria usada nesta chamada a `std::setlocale`, pode ser usada posteriormente no programa para restaurar o locale ao estado no final desta chamada.

### Observações

Durante a inicialização do programa, o equivalente a `std::setlocale([LC_ALL](<#/doc/locale/LC_categories>), "C");` é executado antes que qualquer código de usuário seja executado.

Embora o tipo de retorno seja `char*`, modificar os caracteres apontados é comportamento indefinido.

Como `setlocale` modifica o estado global que afeta a execução de funções dependentes de locale, é comportamento indefinido chamá-la de uma thread, enquanto outra thread está executando qualquer uma das seguintes funções: [std::fprintf](<#/doc/io/c/printf>), std::isprint, [std::iswdigit](<#/doc/string/wide/iswdigit>), [std::localeconv](<#/doc/locale/localeconv>), std::tolower, [std::fscanf](<#/doc/io/c/scanf>), std::ispunct, [std::iswgraph](<#/doc/string/wide/iswgraph>), [std::mblen](<#/doc/string/multibyte/mblen>), std::toupper, std::isalnum, std::isspace, [std::iswlower](<#/doc/string/wide/iswlower>), [std::mbstowcs](<#/doc/string/multibyte/mbstowcs>), [std::towlower](<#/doc/string/wide/towlower>), std::isalpha, std::isupper, [std::iswprint](<#/doc/string/wide/iswprint>), [std::mbtowc](<#/doc/string/multibyte/mbtowc>), [std::towupper](<#/doc/string/wide/towupper>), std::isblank, [std::iswalnum](<#/doc/string/wide/iswalnum>), [std::iswpunct](<#/doc/string/wide/iswpunct>), `std::setlocale`, [std::wcscoll](<#/doc/string/wide/wcscoll>), std::iscntrl, [std::iswalpha](<#/doc/string/wide/iswalpha>), [std::iswspace](<#/doc/string/wide/iswspace>), [std::strcoll](<#/doc/string/byte/strcoll>), [std::wcstod](<#/doc/string/wide/wcstof>), std::isdigit, [std::iswblank](<#/doc/string/wide/iswblank>), [std::iswupper](<#/doc/string/wide/iswupper>), [std::strerror](<#/doc/string/byte/strerror>), [std::wcstombs](<#/doc/string/multibyte/wcstombs>), std::isgraph, [std::iswcntrl](<#/doc/string/wide/iswcntrl>), [std::iswxdigit](<#/doc/string/wide/iswxdigit>), [std::strtod](<#/doc/string/byte/strtof>), [std::wcsxfrm](<#/doc/string/wide/wcsxfrm>), std::islower, [std::iswctype](<#/doc/string/wide/iswctype>), std::isxdigit.

POSIX também define um locale chamado "POSIX", que é sempre acessível e é exatamente equivalente ao locale mínimo padrão "C".

POSIX também especifica que o ponteiro retornado, e não apenas o conteúdo da string apontada, pode ser invalidado por chamadas subsequentes a `setlocale`.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstdio>
    #include <ctime>
    #include <cwchar>
    #include <iterator>
    #include <string>
    
    int main()
    {
        // Make a "deep copy" of current locale name.
        std::string prev_loc = std::setlocale(LC_ALL, nullptr);
    
        // The C locale will be UTF-8 enabled English,
        // decimal dot will be German,
        // date and time formatting will be Japanese.
        if (const char* loc = std::setlocale(LC_ALL, "en_US.UTF-8"))
            std::wprintf(L"New LC_ALL locale: %s\n", loc);
        if (const char* loc = std::setlocale(LC_NUMERIC, "de_DE.UTF-8"))
            std::wprintf(L"New LC_NUMERIC locale: %s\n", loc);
        if (const char* loc = std::setlocale(LC_TIME, "ja_JP.UTF-8"))
            std::wprintf(L"New LC_TIME locale: %s\n", loc);
    
        wchar_t buf[100];
        std::time_t t = std::time(nullptr);
        std::wcsftime(buf, std::size(buf), L"%A %c", std::localtime(&t));
        std::wprintf(L"Number: %.2f\nDate: %Ls\n", 3.14, buf);
    
        // Restore the previous locale.
        if (const char* loc = std::setlocale(LC_ALL, prev_loc.c_str()))
            std::wprintf(L"Restorred LC_ALL locale: %s\n", loc);
    }
```

Saída possível:
```
    New LC_ALL locale: en_US.UTF-8
    New LC_NUMERIC locale: de_DE.UTF-8
    New LC_TIME locale: ja_JP.UTF-8
    Number: 3,14
    Date: 日曜日 2022年11月06日 20時40分59秒
    Restorred LC_ALL locale: C
```

### Veja também

[ LC_ALLLC_COLLATELC_CTYPELC_MONETARYLC_NUMERICLC_TIME](<#/doc/locale/LC_categories>) | categorias de locale para **std::setlocale**
(macro constante)
[ locale](<#/doc/locale/locale>) | conjunto de facets polimórficos que encapsulam diferenças culturais
(classe)
[Documentação C](<#/>) para setlocale

### Links externos

1. | [Lista de nomes de locale do Windows](<https://ss64.com/locale.html>).
---|---
2. | [Lista de nomes de locale do Linux](<https://lh.2xlibre.net/locales/>).