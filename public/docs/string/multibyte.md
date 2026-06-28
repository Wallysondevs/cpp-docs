# Strings multibyte terminadas em nulo

Uma string multibyte terminada em nulo (NTMBS), ou "string multibyte", é uma sequência de bytes não nulos seguida por um byte com valor zero (o caractere nulo terminador).

Cada caractere armazenado na string pode ocupar mais de um byte. A codificação usada para representar caracteres em uma string de caracteres multibyte é específica da localidade (locale-specific): pode ser UTF-8, GB18030, EUC-JP, Shift-JIS, etc. Por exemplo, o array de char {'\xe4','\xbd','\xa0','\xe5','\xa5','\xbd','\0'} é uma NTMBS contendo a string "你好" na codificação multibyte UTF-8: os primeiros três bytes codificam o caractere 你, os próximos três bytes codificam o caractere 好. A mesma string codificada em GB18030 é o array de char {'\xc4', '\xe3', '\xba', '\xc3', '\0'}, onde cada um dos dois caracteres é codificado como uma sequência de dois bytes.

Em algumas codificações multibyte, qualquer sequência de caracteres multibyte pode representar caracteres diferentes dependendo das sequências de bytes anteriores, conhecidas como "sequências de mudança" (shift sequences). Tais codificações são conhecidas como dependentes de estado: o conhecimento do estado de mudança atual é necessário para interpretar cada caractere. Uma NTMBS é válida apenas se começar e terminar no estado de mudança inicial: se uma sequência de mudança foi usada, a sequência de "desmudança" (unshift sequence) correspondente deve estar presente antes do caractere nulo terminador. Exemplos de tais codificações são o JIS de 7 bits, BOCU-1 e [SCSU](<https://www.unicode.org/reports/tr6>).

Uma string de caracteres multibyte é compatível em layout com uma string de bytes terminada em nulo (NTBS), ou seja, pode ser armazenada, copiada e examinada usando as mesmas facilidades, exceto para o cálculo do número de caracteres. Se a localidade (locale) correta estiver em vigor, as funções de I/O também manipulam strings multibyte. Strings multibyte podem ser convertidas para e de wide strings usando as funções membro [std::codecvt](<#/doc/locale/codecvt>), [std::wstring_convert](<#/doc/locale/wstring_convert>), ou as seguintes funções de conversão dependentes da localidade:

### Funções

##### Conversões de caracteres multibyte/wide

---
Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
 mblen
(função)
 mbtowc
(função)
 wctomb
(função)
 mbstowcs
(função)
 wcstombs
(função)
Definido no cabeçalho `<cwchar>`
 mbrlen
(função)
 mbsinit
(função)
 btowc
(função)
 wctob
(função)
 mbrtowc
(função)
 wcrtomb
(função)
 mbsrtowcs
(função)
 wcsrtombs
(função)
Definido no cabeçalho `<cuchar>`
 mbrtoc8(C++20)
(função)
 c8rtomb(C++20)
(função)
 mbrtoc16(C++11)
(função)
 c16rtomb(C++11)
(função)
 mbrtoc32(C++11)
(função)
 c32rtomb(C++11)
(função)
```

### Tipos

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`
---
[ mbstate_t](<#/doc/string/multibyte/mbstate_t>) | informações de estado de conversão necessárias para iterar strings de caracteres multibyte
(classe)

### Macros

Definido no cabeçalho `[<climits>](<#/doc/header/climits>)`
---
MB_LEN_MAX | número máximo de bytes em um caractere multibyte
(constante de macro)
Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```cpp
MB_CUR_MAX
(variável de macro)
Definido no cabeçalho `<cuchar>`
__STDC_UTF_16__(C++11)
(constante de macro)
__STDC_UTF_32__(C++11)
(constante de macro)
```

### Veja também

[documentação C](<#/>) para Strings multibyte terminadas em nulo
---