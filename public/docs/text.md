# Biblioteca de processamento de texto

A biblioteca de processamento de texto inclui componentes para lidar com texto.

### [Biblioteca de localização](<#/doc/locale>)

Os headers [`<locale>`](<#/doc/header/locale>) e [`<clocale>`](<#/doc/header/clocale>) fornecem suporte à internacionalização para classificação de caracteres e ordenação de strings, formatação e análise numérica, monetária e de data/hora, e recuperação de mensagens.

### [Biblioteca de expressões regulares](<#/doc/regex>) (desde C++11)

O header [`<regex>`](<#/doc/header/regex>) fornece uma classe que representa [expressões regulares](<https://en.wikipedia.org/wiki/Regular_expression> "enwiki:Regular expression"), que são um tipo de mini-linguagem usada para realizar correspondência de padrões dentro de strings.

### [Biblioteca de formatação](<#/doc/utility/format>) (desde C++20)

O header [`<format>`](<#/doc/header/format>) fornece facilidades para formatação de strings segura e extensível, que é uma alternativa à família de funções `printf`, e tem a intenção de complementar a biblioteca de streams de E/S C++ existente.

### Utilitários de sequência terminada em nulo

_Sequências de caracteres terminadas em nulo_ (NTCTS) são sequências de caracteres que são terminadas por um caractere nulo (o valor após [value-initialization](<#/doc/language/value_initialization>)).

A biblioteca de strings fornece funções para criar, inspecionar e modificar tais sequências:

  * funções auxiliares para [strings de byte terminadas em nulo](<#/doc/string/byte>) (NTBS) (incluindo suporte a [tipos de caracteres largos](<#/doc/string/wide>)),
  * funções auxiliares para [strings multibyte terminadas em nulo](<#/doc/string/multibyte>) (NTMBS).

### Conversões numéricas primitivas (desde C++17)

Além dos analisadores e formatadores sofisticados dependentes de locale fornecidos pela biblioteca de [E/S C++](<#/doc/io>), a biblioteca de [E/S C](<#/doc/io/c>), [conversores de string C++](<#/doc/string/basic_string>), e [conversores de string C](<#/doc/string/byte>), o header [`<charconv>`](<#/doc/header/charconv>) fornece analisadores e formatadores leves, independentes de locale, que não alocam memória e não lançam exceções para tipos aritméticos.

Definido no header `[<charconv>](<#/doc/header/charconv>)`
---
[ to_chars](<#/doc/utility/to_chars>)(C++17) | converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres
(function)
[ to_chars_result](<#/doc/utility/to_chars_result>)(C++17) | o tipo de retorno de [`std::to_chars`](<#/doc/utility/to_chars>)
(class)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(function)
[ from_chars_result](<#/doc/utility/from_chars_result>)(C++17) | o tipo de retorno de [`std::from_chars`](<#/doc/utility/from_chars>)
(class)
[ chars_format](<#/doc/utility/chars_format>)(C++17) | especifica a formatação para std::to_chars e std::from_chars
(enum)

### Identificações de codificação de texto (desde C++26)

Definido no header `[<text_encoding>](<#/doc/header/text_encoding>)`
---
[ text_encoding](<#/doc/locale/text_encoding>)(C++26) | descreve uma interface para acessar o [registro de Conjuntos de Caracteres IANA](<https://www.iana.org/assignments/character-sets/character-sets.xhtml>)
(class)

### Veja também

[documentação C++](<#/doc/string>) para a biblioteca de Strings
---