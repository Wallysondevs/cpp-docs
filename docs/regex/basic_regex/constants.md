# Constantes std::basic_regex

Definido no header `[<regex>](<#/doc/header/regex>)`

```cpp
static constexpr std::regex_constants::syntax_option_type icase =
std::regex_constants::icase;
static constexpr std::regex_constants::syntax_option_type nosubs =
std::regex_constants::nosubs;
static constexpr std::regex_constants::syntax_option_type optimize =
std::regex_constants::optimize;
static constexpr std::regex_constants::syntax_option_type collate =
std::regex_constants::collate;
static constexpr std::regex_constants::syntax_option_type ECMAScript =
std::regex_constants::ECMAScript;
static constexpr std::regex_constants::syntax_option_type basic =
std::regex_constants::basic;
static constexpr std::regex_constants::syntax_option_type extended =
std::regex_constants::extended;
static constexpr std::regex_constants::syntax_option_type awk =
std::regex_constants::awk;
static constexpr std::regex_constants::syntax_option_type grep =
std::regex_constants::grep;
static constexpr std::regex_constants::syntax_option_type egrep =
std::regex_constants::egrep;
static constexpr std::regex_constants::syntax_option_type multiline =
std::regex_constants::multiline;  // (desde C++17)
```

[std::basic_regex](<#/doc/regex/basic_regex>) define várias constantes que governam a sintaxe geral de correspondência de regex.

Estas constantes são duplicadas de std::regex_constants:

Opção de Gramática | Efeito(s)
---|---
`ECMAScript` | Usa a [gramática de expressão regular ECMAScript modificada](<#/doc/regex/ecmascript>).
`basic` | Usa a gramática básica de expressão regular POSIX ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_03>)).
`extended` | Usa a gramática estendida de expressão regular POSIX ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_04>)).
`awk` | Usa a gramática de expressão regular utilizada pelo utilitário _awk_ em POSIX ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/utilities/awk.html#tag_20_06_13_04>)).
`grep` | Usa a gramática de expressão regular utilizada pelo utilitário _grep_ em POSIX. Isso é efetivamente o mesmo que a opção `basic` com a adição de uma nova linha '\n' como separador de alternância.
`egrep` | Usa a gramática de expressão regular utilizada pelo utilitário _grep_, com a opção _-E_, em POSIX. Isso é efetivamente o mesmo que a opção `extended` com a adição de uma nova linha '\n' como separador de alternância, além de '|'.
Variação de Gramática | Efeito(s)
`icase` | A correspondência de caracteres deve ser realizada sem considerar maiúsculas/minúsculas.
`nosubs` | Ao realizar correspondências, todas as subexpressões marcadas `( expr)` são tratadas como subexpressões não marcadoras `(?: expr)`. Nenhuma correspondência é armazenada na estrutura [std::regex_match](<#/doc/regex/regex_match>) fornecida e mark_count() é zero.
`optimize` | Instrui o motor de expressão regular a tornar a correspondência mais rápida, com o custo potencial de tornar a construção mais lenta. Por exemplo, isso pode significar converter um FSA não determinístico em um FSA determinístico.
`collate` | Intervalos de caracteres na forma _"[a-b]"_ serão sensíveis ao locale.
`multiline` (desde C++17) | Especifica que `^` deve corresponder ao início de uma linha e `$` deve corresponder ao fim de uma linha, se o motor ECMAScript for selecionado.

No máximo uma opção de gramática pode ser escolhida entre `ECMAScript`, `basic`, `extended`, `awk`, `grep`, `egrep`. Se nenhuma gramática for escolhida, `ECMAScript` é assumida como selecionada. As outras opções servem como variações, de modo que [std::regex](<#/doc/regex/basic_regex>)("meow", std::regex::icase) é equivalente a [std::regex](<#/doc/regex/basic_regex>)("meow", std::regex::ECMAScript|std::regex::icase).

### Veja também

[ syntax_option_type](<#/doc/regex/syntax_option_type>)(desde C++11) | opções gerais que controlam o comportamento de regex
(typedef)