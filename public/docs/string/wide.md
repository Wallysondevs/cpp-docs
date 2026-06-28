# Strings largas terminadas em nulo

Uma string larga terminada em nulo é uma sequência de caracteres largos válidos, terminada com um caractere nulo.

### Funções

##### Classificação de caracteres

---
Definido no header `[<cwctype>](<#/doc/header/cwctype>)`

```cpp
 iswalnum
(function)
 iswalpha
(function)
 iswlower
(function)
 iswupper
(function)
 iswdigit
(function)
 iswxdigit
(function)
 iswcntrl
(function)
 iswgraph
(function)
 iswspace
(function)
 iswblank(desde C++11)
(function)
 iswprint
(function)
 iswpunct
(function)
 iswctype
(function)
 wctype
(function)
```

##### Manipulação de caracteres

---
Definido no header `[<cwctype>](<#/doc/header/cwctype>)`

```cpp
 towlower
(function)
 towupper
(function)
 towctrans
(function)
 wctrans
(function)
Valores ASCII
`iswcntrl`
`iswprint`
`iswspace`
`iswblank`
`iswgraph`
`iswpunct`
`iswalnum`
`iswalpha`
`iswupper`
`iswlower`
`iswdigit`
`iswxdigit`
decimal
0–8
9
10–13
14–31
32
33–47
48–57
58–64
65–70
71–90
`QRSTUVWXYZ`
91–96
97–102
103–122
`qrstuvwxyz`
123–126
127
```

##### Conversões para formatos numéricos

---
Definido no header `[&lt;cwchar&gt;](<#/doc/header/cwchar>)`

```cpp
 wcstolwcstoll
(function)
 wcstoulwcstoull
(function)
 wcstofwcstodwcstold
(function)
Definido no header `<cinttypes>`
 wcstoimaxwcstoumax(desde C++11)(desde C++11)
(function)
```

##### Manipulação de strings

---
Definido no header `[&lt;cwchar&gt;](<#/doc/header/cwchar>)`

```cpp
 wcscpy
(function)
 wcsncpy
(function)
 wcscat
(function)
 wcsncat
(function)
 wcsxfrm
(function)
```

##### Análise de strings

Definido no header `[&lt;cwchar&gt;](<#/doc/header/cwchar>)`

```cpp
 wcslen
(function)
 wcscmp
(function)
 wcsncmp
(function)
 wcscoll
(function)
 wcschr
(function)
 wcsrchr
(function)
 wcsspn
apenas nos caracteres largos encontrados em outra string larga
(function)
 wcscspn
apenas nos caracteres largos _não_ encontrados em outra string larga
(function)
 wcspbrk
(function)
 wcsstr
(function)
 wcstok
(function)
```

##### Manipulação de array de caracteres largos

---
Definido no header `[&lt;cwchar&gt;](<#/doc/header/cwchar>)`

```cpp
 wmemcpy
(function)
 wmemmove
(function)
 wmemcmp
(function)
 wmemchr
(function)
 wmemset
(function)
```

### Tipos

Definido no header `[&lt;cwctype&gt;](<#/doc/header/cwctype>)`
---
wctrans_t | tipo escalar que armazena mapeamento de caracteres específico do locale
(typedef)
wctype_t | tipo escalar que armazena classificação de caracteres específica do locale
(typedef)
Definido no header `[&lt;cwctype&gt;](<#/doc/header/cwctype>)`

```cpp
Definido no header `<cwchar>`
wint_t
(typedef)
```

### Macros

Definido no header `[&lt;cwchar&gt;](<#/doc/header/cwchar>)`
---
WEOF | um valor não-caractere do tipo std::wint_t usado para indicar erros
(macro constant)
WCHAR_MIN | o menor valor válido de wchar_t
(macro constant)
WCHAR_MAX | o maior valor válido de wchar_t
(macro constant)

### Veja também

[documentação C](<#/>) para strings largas terminadas em nulo
---