# Strings de bytes terminadas em nulo

Uma string de bytes terminada em nulo (NTBS) é uma sequência possivelmente vazia de bytes não nulos seguida por um byte com valor zero (o caractere nulo terminador). Cada byte em uma string de bytes codifica um caractere de algum conjunto de caracteres. Por exemplo, o array de caracteres `{'x63', 'x61', 'x74', '\0'}` é uma NTBS que contém a string "cat" na codificação ASCII.

### Funções

##### Classificação de caracteres

---
Definido no header `[<cctype>](<#/doc/header/cctype>)`

```cpp
 isalnum
(função)
 isalpha
(função)
 islower
(função)
 isupper
(função)
 isdigit
(função)
 isxdigit
(função)
 iscntrl
(função)
 isgraph
(função)
 isspace
(função)
 isblank(desde C++11)
(função)
 isprint
(função)
 ispunct
(função)
```

##### Manipulação de caracteres

[ tolower](<#/doc/string/byte/tolower>) | converte um caractere para minúsculo
(função)
[ toupper](<#/doc/string/byte/toupper>) | converte um caractere para maiúsculo
(função)
Valores ASCII | caracteres | [`iscntrl`](<#/doc/string/byte/iscntrl>)
---|---
[`iswcntrl`](<#/doc/string/wide/iswcntrl>) | [`isprint`](<#/doc/string/byte/isprint>)
[`iswprint`](<#/doc/string/wide/iswprint>) | [`isspace`](<#/doc/string/byte/isspace>)
[`iswspace`](<#/doc/string/wide/iswspace>) | [`isblank`](<#/doc/string/byte/isblank>)
[`iswblank`](<#/doc/string/wide/iswblank>) | [`isgraph`](<#/doc/string/byte/isgraph>)
[`iswgraph`](<#/doc/string/wide/iswgraph>) | [`ispunct`](<#/doc/string/byte/ispunct>)
[`iswpunct`](<#/doc/string/wide/iswpunct>) | [`isalnum`](<#/doc/string/byte/isalnum>)
[`iswalnum`](<#/doc/string/wide/iswalnum>) | [`isalpha`](<#/doc/string/byte/isalpha>)
[`iswalpha`](<#/doc/string/wide/iswalpha>) | [`isupper`](<#/doc/string/byte/isupper>)
[`iswupper`](<#/doc/string/wide/iswupper>) | [`islower`](<#/doc/string/byte/islower>)
[`iswlower`](<#/doc/string/wide/iswlower>) | [`isdigit`](<#/doc/string/byte/isdigit>)
[`iswdigit`](<#/doc/string/wide/iswdigit>) | [`isxdigit`](<#/doc/string/byte/isxdigit>)
[`iswxdigit`](<#/doc/string/wide/iswxdigit>)
decimal | hexadecimal | octal
---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---
0–8 | `\x0`–`\x8` | `\0`–`\10` | códigos de controle (`NUL`, etc.) | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
9 | `\x9` | `\11` | tab (`\t`) | `≠0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
10–13 | `\xA`–`\xD` | `\12`–`\15` | espaços em branco (`\n`, `\v`, `\f`, `\r`) | `≠0` | `0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
14–31 | `\xE`–`\x1F` | `\16`–`\37` | códigos de controle | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
32 | `\x20` | `\40` | espaço | `0` | `≠0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`
33–47 | `\x21`–`\x2F` | `\41`–`\57` | `!"#$%&'()*+,-./` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
48–57 | `\x30`–`\x39` | `\60`–`\71` | `0123456789` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `0` | `0` | `0` | `≠0` | `≠0`
58–64 | `\x3A`–`\x40` | `\72`–`\100` | `:;<=>?@` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
65–70 | `\x41`–`\x46` | `\101`–`\106` | `ABCDEF` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `≠0` | `0` | `0` | `≠0`
71–90 | `\x47`–`\x5A` | `\107`–`\132` | `GHIJKLMNOP`
`QRSTUVWXYZ` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `≠0` | `0` | `0` | `0`
91–96 | `\x5B`–`\x60` | `\133`–`\140` | `[\]^_` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
97–102 | `\x61`–`\x66` | `\141`–`\146` | `abcdef` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `0` | `≠0` | `0` | `≠0`
103–122 | `\x67`–`\x7A` | `\147`–`\172` | `ghijklmnop`
`qrstuvwxyz` | `0` | `≠0` | `0` | `0` | `≠0` | `0` | `≠0` | `≠0` | `0` | `≠0` | `0` | `0`
123–126 | `\x7B`–`\x7E` | `\172`–`\176` | `{|}~` | `0` | `≠0` | `0` | `0` | `≠0` | `≠0` | `0` | `0` | `0` | `0` | `0` | `0`
127 | `\x7F` | `\177` | caractere de backspace (`DEL`) | `≠0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0` | `0`

##### Conversões para formatos numéricos

---
Definido no header `[&lt;cstdlib&gt;](<#/doc/header/cstdlib>)`

```cpp
 atof
(função)
 atoiatolatoll(desde C++11)
(função)
 strtolstrtoll(desde C++11)
(função)
 strtoulstrtoull(desde C++11)
(função)
 strtofstrtodstrtold
(função)
Definido no header `<cinttypes>`
 strtoimaxstrtoumax(desde C++11)(desde C++11)
(função)
```

##### Manipulação de strings

Definido no header `[&lt;cstring&gt;](<#/doc/header/cstring>)`

```cpp
 strcpy
(função)
 strncpy
(função)
 strcat
(função)
 strncat
(função)
 strxfrm
(função)
```

##### Exame de strings

Definido no header `[&lt;cstring&gt;](<#/doc/header/cstring>)`

```cpp
 strlen
(função)
 strcmp
(função)
 strncmp
(função)
 strcoll
(função)
 strchr
(função)
 strrchr
(função)
 strspn
apenas nos caracteres encontrados em outra string de bytes
(função)
 strcspn
apenas nos caracteres não encontrados em outra string de bytes
(função)
 strpbrk
(função)
 strstr
(função)
 strtok
(função)
```

##### Funções de array de caracteres

Definido no header `[&lt;cstring&gt;](<#/doc/header/cstring>)`

```cpp
 memchr
(função)
 memcmp
(função)
 memset
(função)
 memcpy
(função)
 memmove
(função)
```

##### Diversos

Definido no header `[&lt;cstring&gt;](<#/doc/header/cstring>)`

```cpp
 strerror
(função)
```

### Ver também

[Documentação C](<#/>) para strings de bytes terminadas em nulo
---