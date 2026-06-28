# std::regex_traits

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class CharT >
class regex_traits;
```

O template de trait de tipo `regex_traits` fornece a [std::basic_regex](<#/doc/regex/basic_regex>) o conjunto de tipos e funções necessárias para operar no tipo `CharT`.

Como muitas operações de regex são sensíveis à localidade (quando a flag [std::regex_constants::collate](<#/doc/regex/syntax_option_type>) é definida), a classe `regex_traits` tipicamente mantém uma instância de um [std::locale](<#/doc/locale/locale>) como um membro privado.

### Especializações Padrão

Duas especializações de `std::regex_traits` são definidas pela standard library:

`std::regex_traits<char>`
---
`std::regex_traits<wchar_t>`

Essas especializações tornam possível usar [std::basic_regex](<#/doc/regex/basic_regex>)&lt;char&gt; (também conhecido como [std::regex](<#/doc/regex/basic_regex>)) e [std::basic_regex](<#/doc/regex/basic_regex>)<wchar_t> (também conhecido como [std::wregex](<#/doc/regex/basic_regex>)). Para usar [std::basic_regex](<#/doc/regex/basic_regex>) com outros tipos de caractere (por exemplo, char32_t), uma classe de trait fornecida pelo usuário deve ser usada.

### Tipos Membro

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;
`locale_type` | A localidade usada para comportamento localizado na expressão regular. Deve ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
`char_class_type` | Representa uma classificação de caractere e é capaz de armazenar um conjunto específico da implementação retornado por `lookup_classname`. Deve ser um [BitmaskType](<#/doc/named_req/BitmaskType>).

### Funções Membro

[ (construtor)](<#/doc/regex/regex_traits/regex_traits>) | constrói o objeto regex_traits
(função membro pública)
[ length](<#/doc/regex/regex_traits/length>)[static] | calcula o comprimento de uma string de caracteres terminada em nulo
(função membro estática pública)
[ translate](<#/doc/regex/regex_traits/translate>) | determina a chave de equivalência para um caractere
(função membro pública)
[ translate_nocase](<#/doc/regex/regex_traits/translate_nocase>) | determina a chave de equivalência sem distinção de maiúsculas e minúsculas para um caractere
(função membro pública)
[ transform](<#/doc/regex/regex_traits/transform>) | determina a chave de ordenação para a string fornecida, usada para fornecer a ordem de agrupamento
(função membro pública)
[ transform_primary](<#/doc/regex/regex_traits/transform_primary>) | determina a chave de ordenação primária para a sequência de caracteres, usada para determinar a classe de equivalência
(função membro pública)
[ lookup_collatename](<#/doc/regex/regex_traits/lookup_collatename>) | obtém um elemento de agrupamento pelo nome
(função membro pública)
[ lookup_classname](<#/doc/regex/regex_traits/lookup_classname>) | obtém uma classe de caractere pelo nome
(função membro pública)
[ isctype](<#/doc/regex/regex_traits/isctype>) | indica a pertinência a uma classe de caractere localizada
(função membro pública)
[ value](<#/doc/regex/regex_traits/value>) | traduz o caractere que representa um dígito numérico para um valor integral
(função membro pública)
[ imbue](<#/doc/regex/regex_traits/imbue>) | define a localidade
(função membro pública)
[ getloc](<#/doc/regex/regex_traits/getloc>) | obtém a localidade
(função membro pública)