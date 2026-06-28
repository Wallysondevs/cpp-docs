# operator==,!=,&lt;,&lt;=,&gt;,&gt;=,&lt;=&gt;(std::sub_match)

Definido no header `[<regex>](<#/doc/header/regex>)`

```cpp
Comparação direta
template< class BidirIt >
bool operator== ( const std::sub_match<BidirIt>& lhs,
const std::sub_match<BidirIt>& rhs );  // (1) (desde C++11)
template< class BidirIt >
bool operator!= ( const std::sub_match<BidirIt>& lhs,
const std::sub_match<BidirIt>& rhs );  // (2) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator< ( const std::sub_match<BidirIt>& lhs,
const std::sub_match<BidirIt>& rhs );  // (3) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator<= ( const std::sub_match<BidirIt>& lhs,
const std::sub_match<BidirIt>& rhs );  // (4) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator> ( const std::sub_match<BidirIt>& lhs,
const std::sub_match<BidirIt>& rhs );  // (5) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator>= ( const std::sub_match<BidirIt>& lhs,
const std::sub_match<BidirIt>& rhs );  // (6) (desde C++11)
(até C++20)
template< class BidirIt >
auto operator<=>( const std::sub_match<BidirIt>& lhs,
const std::sub_match<BidirIt>& rhs );  // (7) (desde C++20)
Comparando com uma std::basic_string
template< class BidirIt, class Traits, class Alloc >
bool operator== ( const std::sub_match<BidirIt>& lhs,
const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str );  // (8) (desde C++11)
template< class BidirIt, class Traits, class Alloc >
bool operator!= ( const std::sub_match<BidirIt>& lhs,
const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str );  // (9) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator< ( const std::sub_match<BidirIt>& lhs,
const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str );  // (10) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator<= ( const std::sub_match<BidirIt>& lhs,
const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str );  // (11) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator> ( const std::sub_match<BidirIt>& lhs,
const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str );  // (12) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator>= ( const std::sub_match<BidirIt>& lhs,
const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str );  // (13) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
auto operator<=>( const std::sub_match<BidirIt>& lhs,
const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str );  // (14) (desde C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator== ( const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str,
const std::sub_match<BidirIt>& rhs );  // (15) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator!= ( const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str,
const std::sub_match<BidirIt>& rhs );  // (16) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator< ( const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str,
const std::sub_match<BidirIt>& rhs );  // (17) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator<= ( const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str,
const std::sub_match<BidirIt>& rhs );  // (18) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator> ( const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str,
const std::sub_match<BidirIt>& rhs );  // (19) (desde C++11)
(até C++20)
template< class BidirIt, class Traits, class Alloc >
bool operator>= ( const std::basic_string</*value-type-of*/<BidirIt>,
Traits, Alloc>& str,
const std::sub_match<BidirIt>& rhs );  // (20) (desde C++11)
(até C++20)
Comparando com uma string estilo C
template< class BidirIt >
bool operator== ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>* s );  // (21) (desde C++11)
template< class BidirIt >
bool operator!= ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>* s );  // (22) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator< ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>* s );  // (23) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator<= ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>* s );  // (24) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator> ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>* s );  // (25) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator>= ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>* s );  // (26) (desde C++11)
(até C++20)
template< class BidirIt >
auto operator<=>( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>* s );  // (27) (desde C++20)
template< class BidirIt >
bool operator== ( const /*value-type-of*/<BidirIt>* s,
const std::sub_match<BidirIt>& rhs );  // (28) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator!= ( const /*value-type-of*/<BidirIt>* s,
const std::sub_match<BidirIt>& rhs );  // (29) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator< ( const /*value-type-of*/<BidirIt>* s,
const std::sub_match<BidirIt>& rhs );  // (30) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator<= ( const /*value-type-of*/<BidirIt>* s,
const std::sub_match<BidirIt>& rhs );  // (31) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator> ( const /*value-type-of*/<BidirIt>* s,
const std::sub_match<BidirIt>& rhs );  // (32) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator>= ( const /*value-type-of*/<BidirIt>* s,
const std::sub_match<BidirIt>& rhs );  // (33) (desde C++11)
(até C++20)
Comparando com um único caractere
template< class BidirIt >
bool operator== ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>& ch );  // (34) (desde C++11)
template< class BidirIt >
bool operator!= ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>& ch );  // (35) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator< ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>& ch );  // (36) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator<= ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>& ch );  // (37) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator> ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>& ch );  // (38) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator>= ( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>& ch );  // (39) (desde C++11)
(até C++20)
template< class BidirIt >
auto operator<=>( const std::sub_match<BidirIt>& lhs,
const /*value-type-of*/<BidirIt>& ch );  // (40) (desde C++20)
template< class BidirIt >
bool operator== ( const /*value-type-of*/<BidirIt>& ch,
const std::sub_match<BidirIt>& rhs );  // (41) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator!= ( const /*value-type-of*/<BidirIt>& ch,
const std::sub_match<BidirIt>& rhs );  // (42) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator< ( const /*value-type-of*/<BidirIt>& ch,
const std::sub_match<BidirIt>& rhs );  // (43) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator<= ( const /*value-type-of*/<BidirIt>& ch,
const std::sub_match<BidirIt>& rhs );  // (44) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator> ( const /*value-type-of*/<BidirIt>& ch,
const std::sub_match<BidirIt>& rhs );  // (45) (desde C++11)
(até C++20)
template< class BidirIt >
bool operator>= ( const /*value-type-of*/<BidirIt>& ch,
const std::sub_match<BidirIt>& rhs );  // (46) (desde C++11)
(até C++20)
Aliases de tipo auxiliares
template< class BidirIt >
using /*value-type-of*/ =
typename std::iterator_traits<BidirIt>::value_type;  // (47)
template< class BidirIt >
using /*cat-type-of*/ =
std::compare_three_way_result_t
<std::basic_string</*value-type-of*/<BidirIt>>>;  // (48) (desde C++20)
(apenas para exposição*)
```

Compara um `sub_match` com outro `sub_match`, uma [std::string](<#/doc/string/basic_string>), uma string estilo C ou um único caractere.

1-7) Compara dois `sub_match` diretamente.

8-20) Compara um `sub_match` com uma [std::basic_string](<#/doc/string/basic_string>).

21-33) Compara um `sub_match` com uma string estilo C.

34-46) Compara um `sub_match` com um único caractere.

```cpp
Os operadores `<`, `<=`, `>`, `>=`, e `!=` são sintetizados a partir de operator<=> e operator==, respectivamente.  // (desde C++20)
```

47) `_value-type-of_` ﻿&lt;BidirIt&gt; é o [tipo de valor](<#/doc/iterator>) de `BidirIt`.

48) `_cat-type-of_` ﻿&lt;BidirIt&gt; é o tipo de resultado da comparação de três vias de [std::sub_match](<#/doc/regex/sub_match>)&lt;BidirIt&gt;.

### Parâmetros

- **lhs, rhs** — um `sub_match` para comparar
- **str** — uma [std::basic_string](<#/doc/string/basic_string>) para comparar
- **s** — um ponteiro para uma string estilo C para comparar
- **ch** — um caractere para comparar

### Valor de retorno

Seja target os seguintes valores:

1-7) rhs

8-20) typename [std::sub_match](<#/doc/regex/sub_match>)&lt;BidirIt&gt;::string_type(str.data(), str.size())

21-33) s

34-46) typename [std::sub_match](<#/doc/regex/sub_match>)&lt;BidirIt&gt;::string_type(1, ch)

Os valores de retorno são definidos como segue:

Operador | Valor de retorno
Sobrecargas (1-14,21-27,34-40)
(sobrecargas com parâmetro lhs) | Sobrecargas (15-20,28-33,41-46)
(sobrecargas sem parâmetro lhs)
`==` | lhs.compare(target) == 0 | rhs.compare(target) == 0
---|---|---
`!=` | lhs.compare(target) != 0 | rhs.compare(target) != 0
`<` | lhs.compare(target) < 0 | rhs.compare(target) > 0
`<=` | lhs.compare(target) <= 0 | rhs.compare(target) >= 0
`>` | lhs.compare(target) > 0 | rhs.compare(target) < 0
`>=` | lhs.compare(target) >= 0 | rhs.compare(target) <= 0
`<=>` | static_cast<`_cat-type-of_` ﻿&lt;BidirIt&gt;>
` `(lhs.compare(target) <=> 0) | N/A

### Notas

O tipo de retorno de operator<=> é garantido ser um tipo de categoria de comparação. Se `_value-type-of_` ﻿&lt;BidirIt&gt; for char, wchar_t, char8_t, char16_t, ou char32_t, o tipo de retorno de `operator<=>` é [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>).

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2217](<https://cplusplus.github.io/LWG/issue2217>) | C++11 | para comparações com [std::string](<#/doc/string/basic_string>), o
argumento de [`compare()`](<#/doc/regex/sub_match/compare>) era str.c_str() | o argumento é
string_type(str.data(), str.size()))

### Ver também

[ compare](<#/doc/regex/sub_match/compare>) | compara subsequência correspondente (se houver)
(função membro pública)