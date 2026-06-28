# std::regex_constants::syntax_option_type

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
using syntax_option_type = /* implementation-defined */;
constexpr syntax_option_type icase = /* unspecified */;
constexpr syntax_option_type nosubs = /* unspecified */;
constexpr syntax_option_type optimize = /* unspecified */;
constexpr syntax_option_type collate = /* unspecified */;
constexpr syntax_option_type ECMAScript = /* unspecified */;
constexpr syntax_option_type basic = /* unspecified */;
constexpr syntax_option_type extended = /* unspecified */;
constexpr syntax_option_type awk = /* unspecified */;
constexpr syntax_option_type grep = /* unspecified */;
constexpr syntax_option_type egrep = /* unspecified */;
(inline desde C++17)
inline constexpr syntax_option_type multiline = /* unspecified */;
```

1) O `syntax_option_type` é um [BitmaskType](<#/doc/named_req/BitmaskType>) que contém opções que governam o comportamento das expressões regulares.

2,3) Os valores possíveis (`icase`, `optimize`, etc.) para o tipo (1) são duplicados dentro de [`std::basic_regex`](<#/doc/regex/basic_regex/constants>).

### Constantes

Opção de gramática | Efeito(s)
---|---
`ECMAScript` | Usa a [gramática de expressão regular ECMAScript modificada](<#/doc/regex/ecmascript>).
`basic` | Usa a gramática de expressão regular POSIX básica ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_03>)).
`extended` | Usa a gramática de expressão regular POSIX estendida ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_04>)).
`awk` | Usa a gramática de expressão regular utilizada pelo utilitário _awk_ no POSIX ([documentação da gramática](<https://pubs.opengroup.org/onlinepubs/9699919799/utilities/awk.html#tag_20_06_13_04>)).
`grep` | Usa a gramática de expressão regular utilizada pelo utilitário _grep_ no POSIX. Isso é efetivamente o mesmo que a opção `basic` com a adição de uma nova linha '\\n' como separador de alternância.
`egrep` | Usa a gramática de expressão regular utilizada pelo utilitário _grep_, com a opção _-E_, no POSIX. Isso é efetivamente o mesmo que a opção `extended` com a adição de uma nova linha '\\n' como separador de alternância, além de '|'.
Variação de gramática | Efeito(s)
`icase` | A correspondência de caracteres deve ser realizada sem considerar maiúsculas/minúsculas.
`nosubs` | Ao realizar correspondências, todas as subexpressões marcadas `( expr)` são tratadas como subexpressões não marcadoras `(?: expr)`. Nenhuma correspondência é armazenada na estrutura [std::regex_match](<#/doc/regex/regex_match>) fornecida e mark_count() é zero.
`optimize` | Instrui o motor de expressão regular a tornar a correspondência mais rápida, com o custo potencial de tornar a construção mais lenta. Por exemplo, isso pode significar converter um FSA não determinístico para um FSA determinístico.
`collate` | Intervalos de caracteres na forma _"[a-b]"_ serão sensíveis ao locale.
`multiline` (C++17) | Especifica que `^` deve corresponder ao início de uma linha e `$` deve corresponder ao fim de uma linha, se o motor ECMAScript for selecionado.

No máximo uma opção de gramática pode ser escolhida entre `ECMAScript`, `basic`, `extended`, `awk`, `grep`, `egrep`. Se nenhuma gramática for escolhida, `ECMAScript` é assumida como selecionada. As outras opções servem como variações, de modo que [std::regex](<#/doc/regex/basic_regex>)("meow", std::regex::icase) é equivalente a [std::regex](<#/doc/regex/basic_regex>)("meow", std::regex::ECMAScript|std::regex::icase).

### Notas

Como POSIX usa a regra de correspondência "mais à esquerda e mais longa" (a subsequência correspondente mais longa é correspondida, e se houver várias dessas subsequências, a primeira é correspondida), não é adequado, por exemplo, para analisar linguagens de marcação: uma regex POSIX como "<tag[^>]*>.*&lt;/tag&gt;" corresponderia a tudo desde a primeira "<tag" até a última "&lt;/tag&gt;", incluindo cada "&lt;/tag&gt;" e "&lt;tag&gt;" no meio. Por outro lado, ECMAScript suporta correspondências não-gananciosas, e a regex ECMAScript "<tag[^>]*>.*?&lt;/tag&gt;" corresponderia apenas até a primeira tag de fechamento.

### Exemplo

Ilustra a diferença no algoritmo de correspondência entre expressões regulares ECMAScript e POSIX:

Execute este código
```cpp
    #include <iostream>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::string str = "zzxayyzz";
        std::regex re1(".*(a|xayy)"); // ECMA
        std::regex re2(".*(a|xayy)", std::regex::extended); // POSIX
    
        std::cout << "Searching for .*(a|xayy) in zzxayyzz:\n";
        std::smatch m;
        std::regex_search(str, m, re1);
        std::cout << "  ECMA (depth first search) match: " << m[0] << '\n';
        std::regex_search(str, m, re2);
        std::cout << "  POSIX (leftmost longest)  match: " << m[0] << '\n';
    }
```

Saída:
```
    Searching for .*(a|xayy) in zzxayyzz:
      ECMA (depth first search) match: zzxa
      POSIX (leftmost longest)  match: zzxayy
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2053](<https://cplusplus.github.io/LWG/issue2053>) | C++11 | as constantes foram declaradas static | removeu o especificador static

### Veja também

[ basic_regex](<#/doc/regex/basic_regex>)(C++11) | objeto de expressão regular
(modelo de classe)