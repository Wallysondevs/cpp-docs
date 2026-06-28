# Cabeçalho da biblioteca padrão &lt;cwchar&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<wchar.h>`](<#/>).

Este cabeçalho faz parte das bibliotecas de strings [wide](<#/doc/string/wide>) e [multibyte](<#/doc/string/multibyte>) terminadas em nulo. Ele também fornece algumas funções de [E/S no estilo C](<#/doc/io/c>) e conversão de [Data no estilo C](<#/doc/chrono/c>).

### Macros

[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(constante de macro)
WEOF | um valor não-caractere do tipo `std::wint_t` usado para indicar erros
(constante de macro)
WCHAR_MIN | o menor valor válido de wchar_t
(constante de macro)
WCHAR_MAX | o maior valor válido de wchar_t
(constante de macro)

### Tipos

[ mbstate_t](<#/doc/string/multibyte/mbstate_t>) | informações de estado de conversão necessárias para iterar strings de caracteres multibyte
(classe)
[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)
`wint_t` | tipo inteiro que pode conter qualquer caractere wide válido e pelo menos mais um valor
---|---
[ tm](<#/doc/chrono/c/tm>) | tipo de tempo de calendário
(classe)

### Funções

##### Manipulação de strings

---
[ wcscpy](<#/doc/string/wide/wcscpy>) | copia uma string wide para outra
(função)
[ wcsncpy](<#/doc/string/wide/wcsncpy>) | copia uma certa quantidade de caracteres wide de uma string para outra
(função)
[ wcscat](<#/doc/string/wide/wcscat>) | anexa uma cópia de uma string wide a outra
(função)
[ wcsncat](<#/doc/string/wide/wcsncat>) | anexa uma certa quantidade de caracteres wide de uma string wide a outra
(função)
[ wcsxfrm](<#/doc/string/wide/wcsxfrm>) | transforma uma string wide para que `wcscmp` produza o mesmo resultado que `wcscoll`
(função)

##### Análise de strings

[ wcslen](<#/doc/string/wide/wcslen>) | retorna o comprimento de uma string wide
(função)
[ wcscmp](<#/doc/string/wide/wcscmp>) | compara duas strings wide
(função)
[ wcsncmp](<#/doc/string/wide/wcsncmp>) | compara uma certa quantidade de caracteres de duas strings wide
(função)
[ wcscoll](<#/doc/string/wide/wcscoll>) | compara duas strings wide de acordo com a locale atual
(função)
[ wcschr](<#/doc/string/wide/wcschr>) | encontra a primeira ocorrência de um caractere wide em uma string wide
(função)
[ wcsrchr](<#/doc/string/wide/wcsrchr>) | encontra a última ocorrência de um caractere wide em uma string wide
(função)
[ wcsspn](<#/doc/string/wide/wcsspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres wide encontrados em outra string wide
(função)
[ wcscspn](<#/doc/string/wide/wcscspn>) | retorna o comprimento do segmento inicial máximo que consiste
apenas nos caracteres wide _não_ encontrados em outra string wide
(função)
[ wcspbrk](<#/doc/string/wide/wcspbrk>) | encontra a primeira ocorrência de qualquer caractere wide em uma string wide, em outra string wide
(função)
[ wcsstr](<#/doc/string/wide/wcsstr>) | encontra a primeira ocorrência de uma string wide dentro de outra string wide
(função)
[ wcstok](<#/doc/string/wide/wcstok>) | encontra o próximo token em uma string wide
(função)

##### Manipulação de array de caracteres wide

[ wmemcpy](<#/doc/string/wide/wmemcpy>) | copia uma certa quantidade de caracteres wide entre dois arrays não sobrepostos
(função)
[ wmemmove](<#/doc/string/wide/wmemmove>) | copia uma certa quantidade de caracteres wide entre dois arrays, possivelmente sobrepostos
(função)
[ wmemcmp](<#/doc/string/wide/wmemcmp>) | compara uma certa quantidade de caracteres wide de dois arrays
(função)
[ wmemchr](<#/doc/string/wide/wmemchr>) | encontra a primeira ocorrência de um caractere wide em um array de caracteres wide
(função)
[ wmemset](<#/doc/string/wide/wmemset>) | copia o caractere wide fornecido para cada posição em um array de caracteres wide
(função)

##### Conversão de caracteres multibyte/wide

[ mbsinit](<#/doc/string/multibyte/mbsinit>) | verifica se o objeto [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>) representa o estado de mudança inicial
(função)
[ btowc](<#/doc/string/multibyte/btowc>) | expande um caractere narrow de byte único para caractere wide, se possível
(função)
[ wctob](<#/doc/string/multibyte/wctob>) | restringe um caractere wide para um caractere narrow de byte único, se possível
(função)
[ mbrlen](<#/doc/string/multibyte/mbrlen>) | retorna o número de bytes no próximo caractere multibyte, dado o estado
(função)
[ mbrtowc](<#/doc/string/multibyte/mbrtowc>) | converte o próximo caractere multibyte para caractere wide, dado o estado
(função)
[ wcrtomb](<#/doc/string/multibyte/wcrtomb>) | converte um caractere wide para sua representação multibyte, dado o estado
(função)
[ mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>) | converte uma string de caracteres multibyte narrow para string wide, dado o estado
(função)
[ wcsrtombs](<#/doc/string/multibyte/wcsrtombs>) | converte uma string wide para string de caracteres multibyte narrow, dado o estado
(função)

##### Entrada/Saída

[ fgetwcgetwc](<#/doc/io/c/fgetwc>) | obtém um caractere wide de um stream de arquivo
(função)
[ fgetws](<#/doc/io/c/fgetws>) | obtém uma string wide de um stream de arquivo
(função)
[ fputwcputwc](<#/doc/io/c/fputwc>) | escreve um caractere wide em um stream de arquivo
(função)
[ fputws](<#/doc/io/c/fputws>) | escreve uma string wide em um stream de arquivo
(função)
[ getwchar](<#/doc/io/c/getwchar>) | lê um caractere wide de [stdin](<#/doc/io/c/std_streams>)
(função)
[ putwchar](<#/doc/io/c/putwchar>) | escreve um caractere wide em [stdout](<#/doc/io/c/std_streams>)
(função)
[ ungetwc](<#/doc/io/c/ungetwc>) | coloca um caractere wide de volta em um stream de arquivo
(função)
[ fwide](<#/doc/io/c/fwide>) | alterna um stream de arquivo entre E/S de caracteres wide e E/S de caracteres narrow
(função)
[ wscanffwscanfswscanf](<#/doc/io/c/fwscanf>) | lê entrada formatada de caracteres wide de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vwscanfvfwscanfvswscanf](<#/doc/io/c/vfwscanf>)(desde C++11)(desde C++11)(desde C++11) | lê entrada formatada de caracteres wide de [stdin](<#/doc/io/c/std_streams>), um stream de arquivo
ou um buffer usando lista de argumentos variáveis
(função)
[ wprintffwprintfswprintf](<#/doc/io/c/fwprintf>) | imprime saída formatada de caracteres wide para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo ou um buffer
(função)
[ vwprintfvfwprintfvswprintf](<#/doc/io/c/vfwprintf>) | imprime saída formatada de caracteres wide para [stdout](<#/doc/io/c/std_streams>), um stream de arquivo
ou um buffer usando lista de argumentos variáveis
(função)

##### Conversões de string

[ wcsftime](<#/doc/chrono/c/wcsftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual de string wide personalizada
(função)
[ wcstolwcstoll](<#/doc/string/wide/wcstol>) | converte uma string wide para um valor inteiro
(função)
[ wcstoulwcstoull](<#/doc/string/wide/wcstoul>) | converte uma string wide para um valor inteiro sem sinal
(função)
[ wcstofwcstodwcstold](<#/doc/string/wide/wcstof>) | converte uma string wide para um valor de ponto flutuante
(função)

### Notas

*   [ NULL](<#/doc/types/NULL>) também é definido nos seguintes cabeçalhos:
    *   [`<cstddef>`](<#/doc/header/cstddef>)
    *   [`<cstring>`](<#/doc/header/cstring>)
    *   [`<ctime>`](<#/doc/header/ctime>)
    *   [`<clocale>`](<#/doc/header/clocale>)
    *   [`<cstdio>`](<#/doc/header/cstdio>)
*   [std::size_t](<#/doc/types/size_t>) também é definido nos seguintes cabeçalhos:
    *   [`<cstddef>`](<#/doc/header/cstddef>)
    *   [`<ctime>`](<#/doc/header/ctime>)
    *   [`<cstdio>`](<#/doc/header/cstdio>)
*   `std::wint_t` também é definido nos seguintes cabeçalhos:
    *   [`<cwctype>`](<#/doc/header/cwctype>)
*   [std::tm](<#/doc/chrono/c/tm>) também é definido nos seguintes cabeçalhos:
    *   [`<ctime>`](<#/doc/header/ctime>)

### Sinopse
```cpp
    namespace std {
      using size_t =    /* see description */; // freestanding
      using mbstate_t = /* see description */; // freestanding
      using wint_t =    /* see description */; // freestanding
    
      struct tm;
    
      int fwprintf(FILE* stream, const wchar_t* format, ...);
      int fwscanf(FILE* stream, const wchar_t* format, ...);
      int swprintf(wchar_t* s, size_t n, const wchar_t* format, ...);
      int swscanf(const wchar_t* s, const wchar_t* format, ...);
      int vfwprintf(FILE* stream, const wchar_t* format, va_list arg);
      int vfwscanf(FILE* stream, const wchar_t* format, va_list arg);
      int vswprintf(wchar_t* s, size_t n, const wchar_t* format, va_list arg);
      int vswscanf(const wchar_t* s, const wchar_t* format, va_list arg);
      int vwprintf(const wchar_t* format, va_list arg);
      int vwscanf(const wchar_t* format, va_list arg);
      int wprintf(const wchar_t* format, ...);
      int wscanf(const wchar_t* format, ...);
      wint_t fgetwc(FILE* stream);
      wchar_t* fgetws(wchar_t* s, int n, FILE* stream);
      wint_t fputwc(wchar_t c, FILE* stream);
      int fputws(const wchar_t* s, FILE* stream);
      int fwide(FILE* stream, int mode);
      wint_t getwc(FILE* stream);
      wint_t getwchar();
      wint_t putwc(wchar_t c, FILE* stream);
      wint_t putwchar(wchar_t c);
      wint_t ungetwc(wint_t c, FILE* stream);
      double wcstod(const wchar_t* nptr, wchar_t** endptr);
      float wcstof(const wchar_t* nptr, wchar_t** endptr);
      long double wcstold(const wchar_t* nptr, wchar_t** endptr);
      long int wcstol(const wchar_t* nptr, wchar_t** endptr, int base);
      long long int wcstoll(const wchar_t* nptr, wchar_t** endptr, int base);
      unsigned long int wcstoul(const wchar_t* nptr, wchar_t** endptr, int base);
      unsigned long long int wcstoull(const wchar_t* nptr, wchar_t** endptr, int base);
      wchar_t* wcscpy(wchar_t* s1, const wchar_t* s2);                // freestanding
      wchar_t* wcsncpy(wchar_t* s1, const wchar_t* s2, size_t n);     // freestanding
      wchar_t* wmemcpy(wchar_t* s1, const wchar_t* s2, size_t n);     // freestanding
      wchar_t* wmemmove(wchar_t* s1, const wchar_t* s2, size_t n);    // freestanding
      wchar_t* wcscat(wchar_t* s1, const wchar_t* s2);                // freestanding
      wchar_t* wcsncat(wchar_t* s1, const wchar_t* s2, size_t n);     // freestanding
      int wcscmp(const wchar_t* s1, const wchar_t* s2);               // freestanding
      int wcscoll(const wchar_t* s1, const wchar_t* s2);
      int wcsncmp(const wchar_t* s1, const wchar_t* s2, size_t n);    // freestanding
      size_t wcsxfrm(wchar_t* s1, const wchar_t* s2, size_t n);
      int wmemcmp(const wchar_t* s1, const wchar_t* s2, size_t n);    // freestanding
      const wchar_t* wcschr(const wchar_t* s, wchar_t c);             // freestanding
      wchar_t* wcschr(wchar_t* s, wchar_t c);                         // freestanding
      size_t wcscspn(const wchar_t* s1, const wchar_t* s2);           // freestanding
      const wchar_t* wcspbrk(const wchar_t* s1, const wchar_t* s2);   // freestanding
      wchar_t* wcspbrk(wchar_t* s1, const wchar_t* s2);               // freestanding
      const wchar_t* wcsrchr(const wchar_t* s, wchar_t c);            // freestanding
      wchar_t* wcsrchr(wchar_t* s, wchar_t c);                        // freestanding
      size_t wcsspn(const wchar_t* s1, const wchar_t* s2);            // freestanding
      const wchar_t* wcsstr(const wchar_t* s1, const wchar_t* s2);    // freestanding
      wchar_t* wcsstr(wchar_t* s1, const wchar_t* s2);                // freestanding
      wchar_t* wcstok(wchar_t* s1, const wchar_t* s2, wchar_t** ptr); // freestanding
      const wchar_t* wmemchr(const wchar_t* s, wchar_t c, size_t n);  // freestanding
      wchar_t* wmemchr(wchar_t* s, wchar_t c, size_t n);              // freestanding
      size_t wcslen(const wchar_t* s);                                // freestanding
      wchar_t* wmemset(wchar_t* s, wchar_t c, size_t n);              // freestanding
      size_t wcsftime(wchar_t* s, size_t maxsize, const wchar_t* format, const tm* timeptr);
      wint_t btowc(int c);
      int wctob(wint_t c);
    
      // multibyte / wide string and character conversion functions
      int mbsinit(const mbstate_t* ps);
      size_t mbrlen(const char* s, size_t n, mbstate_t* ps);
      size_t mbrtowc(wchar_t* pwc, const char* s, size_t n, mbstate_t* ps);
      size_t wcrtomb(char* s, wchar_t wc, mbstate_t* ps);
      size_t mbsrtowcs(wchar_t* dst, const char** src, size_t len, mbstate_t* ps);
      size_t wcsrtombs(char* dst, const wchar_t** src, size_t len, mbstate_t* ps);
    }
    
    #define NULL      /* see description */ // freestanding
    #define WCHAR_MAX /* see description */ // freestanding
    #define WCHAR_MIN /* see description */ // freestanding
    #define WEOF      /* see description */ // freestanding
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 345](<https://cplusplus.github.io/LWG/issue345>) | C++98 | [std::tm](<#/doc/chrono/c/tm>) não era fornecido em `<cwchar>` | fornecido