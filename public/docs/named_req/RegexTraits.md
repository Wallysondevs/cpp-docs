# Requisitos nomeados C++: RegexTraits (desde C++11)

**RegexTraits** é uma classe de traits que abstrai as operações necessárias para um determinado tipo de caractere quando usado como parâmetros de tipo de template para [std::basic_regex](<#/doc/regex/basic_regex>).

### Requisitos

Dado

  * CharT, um tipo de caractere
  * X, um tipo RegexTraits para o tipo CharT
  * u, um objeto do tipo X
  * v, um objeto do tipo const X
  * p, um valor do tipo const CharT*
  * I1, I2, iteradores de entrada
  * F1, F2, iteradores de avanço
  * c, um valor do tipo const CharT
  * s, um objeto do tipo X::string_type
  * cs, um objeto do tipo const X::string_type
  * b, um valor do tipo bool
  * I, um valor do tipo int
  * cl, um objeto do tipo X::char_class_type
  * loc, um objeto do tipo X::locale_type

expressão | tipo de retorno | semântica
---|---|---
X::char_type | CharT | Usado para se referir ao tipo de caractere.
X::string_type | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; |
X::locale_type | | Um tipo [CopyConstructible](<#/doc/named_req/CopyConstructible>) que representa a localidade usada pela classe de traits.
X::char_class_type | | Um tipo [BitmaskType](<#/doc/named_req/BitmaskType>) que representa uma classificação de caractere particular.
X::length(p) | [std::size_t](<#/doc/types/size_t>) | Retorna: o menor i tal que p[i] == 0. A complexidade é linear em i.
v.translate(c) | X::char_type | Retorna: um caractere tal que para qualquer caractere d considerado equivalente a c, então v.translate(c) == v.translate(d).
v.translate_nocase(c) | X::char_type | Retorna: um caractere tal que para qualquer caractere C considerado equivalente a c sem distinção de maiúsculas e minúsculas, então v.translate_nocase(c) == v.translate_nocase(C).
v.transform(F1, F2) | X::string_type | Retorna: uma chave de ordenação para a sequência de caracteres designada pelo range de iteradores [F1, F2) tal que se a sequência de caracteres [G1, G2) ordenar antes da sequência de caracteres [H1, H2), então v.transform(G1, G2) < v.transform(H1, H2).
v.transform_primary(F1, F2) | X::string_type | Retorna: uma chave de ordenação para a sequência de caracteres designada pelo range de iteradores [F1, F2) tal que se a sequência de caracteres [G1, G2) ordenar antes da sequência de caracteres [H1, H2) sem distinção de maiúsculas e minúsculas, então v.transform_primary(G1, G2) < v.transform_primary(H1, H2).
v.lookup_collatename(F1, F2) | X::string_type | Retorna:

  * Uma string vazia se a sequência de caracteres não for um elemento de ordenação válido
  * Uma sequência de caracteres que representa o elemento de ordenação consistindo na sequência de caracteres designada pelo range de iteradores [F1, F2) caso contrário

v.lookup_classname(F1, F2, b) | X::char_class_type |

  * Converte a sequência de caracteres designada pelo range de iteradores [F1, F2) em um valor de um [BitmaskType](<#/doc/named_req/BitmaskType>) que pode ser subsequentemente passado para isctype
  * Valores retornados de lookup_classname podem ser combinados com OR bit a bit; o valor resultante representa a pertinência a qualquer uma das classes de caracteres correspondentes
  * Se b for true, o bitmask retornado é adequado para corresponder caracteres sem distinção de maiúsculas e minúsculas.
  * Retorna ​0​ se a sequência de caracteres não for o nome de uma classe de caracteres reconhecida por X.
  * O valor retornado deve ser independente do caso dos caracteres na sequência.

v.isctype(c, cl) | bool | Retorna: se c é um membro de uma das classes de caracteres designadas por cl ou não.
---|---|---
v.value(c, I) | int | Retorna:

  * O valor representado pelo dígito c na base I se o caractere c for um dígito válido na base I
  * -1 caso contrário

u.imbue(loc) | X::locale_type |

  * Imbui u com a localidade loc
  * Retorna: A localidade anterior usada por u, se houver

v.getloc() | X::locale_type | Retorna: A localidade anterior usada por v, se houver.

### Biblioteca padrão

RegexTraits é satisfeito pelas seguintes classes da biblioteca padrão:

```cpp
template<> class regex_traits<char>;
template<> class regex_traits<wchar_t>;  // (desde C++11)
(desde C++11)
```

  *[_(as is)_]: A::pointer