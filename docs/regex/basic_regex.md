# std::basic_regex

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template<
class CharT,
class Traits = std::regex_traits<CharT>
> class basic_regex;
```

O template de classe `basic_regex` fornece uma estrutura geral para armazenar expressões regulares.

Vários typedefs para tipos de caracteres comuns são fornecidos:

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`
---
Tipo | Definição
---|---
`std::regex` | std::basic_regex&lt;char&gt;
`std::wregex` | std::basic_regex<wchar_t>

### Tipos de membros

Tipo de membro | Definição
---|---
`value_type` | `CharT`
`traits_type` | `Traits`
`string_type` | `Traits::string_type`
`locale_type` | `Traits::locale_type`
`flag_type` | [std::regex_constants::syntax_option_type](<#/doc/regex/syntax_option_type>)

### Funções membro

[ (construtor)](<#/doc/regex/basic_regex/basic_regex>) | constrói o objeto regex
(função membro pública)
[ (destrutor)](<#/doc/regex/basic_regex/~basic_regex>) | destrói o objeto regex
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)
[ assign](<#/doc/regex/basic_regex/assign>) | atribui o conteúdo
(função membro pública)

##### Observadores

[ mark_count](<#/doc/regex/basic_regex/mark_count>) | retorna o número de subexpressões marcadas dentro da expressão regular
(função membro pública)
[ flags](<#/doc/regex/basic_regex/flags>) | retorna os sinalizadores de sintaxe
(função membro pública)

##### Localidade

[ getloc](<#/doc/regex/basic_regex/getloc>) | obtém informações de localidade
(função membro pública)
[ imbue](<#/doc/regex/basic_regex/imbue>) | define informações de localidade
(função membro pública)

##### Modificadores

[ swap](<#/doc/regex/basic_regex/swap>) | troca o conteúdo
(função membro pública)

### Constantes

Opção de gramática | Efeito(s)
---|---
`ECMAScript` | Usa a [gramática de expressão regular ECMAScript modificada](<#/doc/regex/ecmascript>).
`basic` | Usa a gramática de expressão regular POSIX básica ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_03>)).
`extended` | Usa a gramática de expressão regular POSIX estendida ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_04>)).
`awk` | Usa a gramática de expressão regular utilizada pelo utilitário _awk_ no POSIX ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/utilities/awk.html#tag_20_06_13_04>)).
`grep` | Usa a gramática de expressão regular utilizada pelo utilitário _grep_ no POSIX. Isso é efetivamente o mesmo que a opção `basic` com a adição de quebra de linha '\n' como um separador de alternância.
`egrep` | Usa a gramática de expressão regular utilizada pelo utilitário _grep_, com a opção _-E_, no POSIX. Isso é efetivamente o mesmo que a opção `extended` com a adição de quebra de linha '\n' como um separador de alternância, além de '|'.
Variação de gramática | Efeito(s)
`icase` | A correspondência de caracteres deve ser realizada sem considerar maiúsculas/minúsculas.
`nosubs` | Ao realizar correspondências, todas as subexpressões marcadas `( expr)` são tratadas como subexpressões não marcadoras `(?: expr)`. Nenhuma correspondência é armazenada na estrutura [std::regex_match](<#/doc/regex/regex_match>) fornecida e [mark_count()](<#/doc/regex/basic_regex/mark_count>) é zero.
`optimize` | Instruí o motor de expressão regular a tornar a correspondência mais rápida, com o custo potencial de tornar a construção mais lenta. Por exemplo, isso pode significar converter um FSA não determinístico para um FSA determinístico.
`collate` | Intervalos de caracteres na forma _"[a-b]"_ serão sensíveis à localidade.
`multiline` (C++17) | Especifica que `^` deve corresponder ao início de uma linha e `$` deve corresponder ao fim de uma linha, se o motor ECMAScript for selecionado.

No máximo uma opção de gramática pode ser escolhida entre `ECMAScript`, `basic`, `extended`, `awk`, `grep`, `egrep`. Se nenhuma gramática for escolhida, `ECMAScript` é assumida como selecionada. As outras opções servem como variações, de modo que std::regex("meow", std::regex::icase) é equivalente a std::regex("meow", std::regex::ECMAScript|std::regex::icase).

As constantes membro em `basic_regex` são duplicatas das constantes [`syntax_option_type`](<#/doc/regex/syntax_option_type>) definidas no namespace `std::regex_constants`.

### Funções não-membro

[ std::swap(std::basic_regex)](<#/doc/regex/basic_regex/swap2>)(desde C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### [Guias de dedução](<#/doc/regex/basic_regex/deduction_guides>)(desde C++17)