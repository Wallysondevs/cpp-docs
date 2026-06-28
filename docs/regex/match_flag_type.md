# std::regex_constants::match_flag_type

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
using match_flag_type = /* implementation-defined */;
constexpr match_flag_type match_default = {};
constexpr match_flag_type match_not_bol = /* unspecified */;
constexpr match_flag_type match_not_eol = /* unspecified */;
constexpr match_flag_type match_not_bow = /* unspecified */;
constexpr match_flag_type match_not_eow = /* unspecified */;
constexpr match_flag_type match_any = /* unspecified */;
constexpr match_flag_type match_not_null = /* unspecified */;
constexpr match_flag_type match_continuous = /* unspecified */;
constexpr match_flag_type match_prev_avail = /* unspecified */;
constexpr match_flag_type format_default = {};
constexpr match_flag_type format_sed = /* unspecified */;
constexpr match_flag_type format_no_copy = /* unspecified */;
constexpr match_flag_type format_first_only = /* unspecified */;
(inline desde C++17)
```

1) `match_flag_type` é um [BitmaskType](<#/doc/named_req/BitmaskType>) que especifica opções adicionais de correspondência de expressão regular.

### Constantes

Nota: `[`first`, `last`)` refere-se à sequência de caracteres sendo correspondida.

Nome | Explicação
---|---
`match_not_bol` | O primeiro caractere em `[`first`, `last`)` será tratado como se **não** estivesse no início de uma linha (ou seja, `^` não corresponderá a `[`first`, `first`)`).
`match_not_eol` | O último caractere em `[`first`, `last`)` será tratado como se **não** estivesse no final de uma linha (ou seja, `$` não corresponderá a `[`last`, `last`)`).
`match_not_bow` | `\b` não corresponderá a `[`first`, `first`)`.
`match_not_eow` | `\b` não corresponderá a `[`last`, `last`)`.
`match_any` | Se mais de uma correspondência for possível, qualquer correspondência é um resultado aceitável.
`match_not_null` | Não corresponder a sequências vazias.
`match_continuous` | Corresponder apenas a uma subsequência que começa em `first`.
`match_prev_avail` | `--first` é uma posição de iterator válida. Quando definido, faz com que `match_not_bol` e `match_not_bow` sejam ignorados.
`format_default` | Usa as regras ECMAScript para construir strings em [std::regex_replace](<#/doc/regex/regex_replace>) ([documentação de sintaxe](<https://ecma-international.org/ecma-262/5.1/#sec-15.5.4.11>)).
`format_sed` | Usa as regras da utilidade POSIX _sed_ em [std::regex_replace](<#/doc/regex/regex_replace>) ([documentação de sintaxe](<https://pubs.opengroup.org/onlinepubs/9699919799/utilities/sed.html#tag_20_116_13_03>)).
`format_no_copy` | Não copia strings não correspondidas para a saída em [std::regex_replace](<#/doc/regex/regex_replace>).
`format_first_only` | Substitui apenas a primeira correspondência em [std::regex_replace](<#/doc/regex/regex_replace>).

Todas as constantes, exceto `match_default` e `format_default`, são elementos de bitmask. As constantes `match_default` e `format_default` são bitmasks vazias.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 2053](<https://cplusplus.github.io/LWG/issue2053>) | C++11 | 1. as constantes foram declaradas static
2. `match_default` e `format_default` foram inicializadas a partir de ​0​ | 1. removeu o especificador static
2. inicializadas a partir de {}

### Veja também

[ regex_match](<#/doc/regex/regex_match>)(C++11) | tenta corresponder uma expressão regular a uma sequência de caracteres inteira
(modelo de função)
[ syntax_option_type](<#/doc/regex/syntax_option_type>)(C++11) | opções gerais que controlam o comportamento de regex
(typedef)
[ error_type](<#/doc/regex/error_type>)(C++11) | descreve diferentes tipos de erros de correspondência
(typedef)