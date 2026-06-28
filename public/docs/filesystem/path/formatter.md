# std::formatter&lt;std::filesystem::path&gt;

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
template< class CharT >
struct formatter<std::filesystem::path, CharT>;
```

A especialização de template de [std::formatter](<#/doc/utility/format/formatter>) para a classe [std::filesystem::path](<#/doc/filesystem/path>) permite aos usuários converter um nome de caminho (pathname) para sua representação textual usando [funções de formatação](<#/doc/utility/format>). Esta especialização é [_habilitada para depuração_](<#/doc/utility/format/formatter>).

### Especificação de Formato

A sintaxe das especificações de formato path-format-spec é:

---
fill-and-align ﻿(opcional) width ﻿(opcional) `?`(opcional) `g`(opcional)

fill-and-align e width têm o mesmo significado que na [especificação de formato padrão](<#/doc/utility/format/formatter>).

A opção `?` é usada para formatar o nome de caminho (pathname) como uma [string escapada](<#/doc/utility/format/spec>).

A opção `g` é usada para especificar que o nome de caminho (pathname) está na [representação de formato genérico](<#/doc/filesystem/path/format>).

### Funções Membro

set_debug_format | permite formatar o nome de caminho (pathname) como uma [string escapada](<#/doc/utility/format/spec>)
(função membro pública)
parse | analisa o especificador de formato conforme especificado por path-format-spec
(função membro pública)
format | escreve a saída formatada conforme especificado por path-format-spec
(função membro pública)

## std::formatter<std::filesystem::path>::set_debug_format

constexpr void set_debug_format();

Permite que o objeto atual formate o nome de caminho (pathname) como uma [string escapada](<#/doc/utility/format/spec>).

## std::formatter<std::filesystem::path>::parse

constexpr auto parse( [std::basic_format_parse_context](<#/doc/utility/format/basic_format_parse_context>)&lt;CharT&gt;& ctx )
-> [std::basic_format_parse_context](<#/doc/utility/format/basic_format_parse_context>)&lt;CharT&gt;::iterator;

Analisa os especificadores de formato como um path-format-spec e armazena os especificadores analisados no objeto atual.

Retorna um iterator após o final do path-format-spec.

## std::formatter<std::filesystem::path>::format

template< class FormatContext >
auto format( const [std::filesystem::path](<#/doc/filesystem/path>)& p, FormatContext& ctx ) const
-> FormatContext::iterator;

Seja s igual a p.generic<std::filesystem::path::value_type>() se a opção `g` for usada, caso contrário p.native(). Escreve s em ctx.out() conforme especificado por path-format-spec.

Para transcodificação de caracteres do nome de caminho (pathname):

*   O nome de caminho (pathname) é transcodificado da codificação nativa para strings de caracteres largos para UTF-8, com subpartes máximas de subsequências malformadas substituídas pelo CARACTERE DE SUBSTITUIÇÃO `U+FFFD` se
    *   [std::is_same_v](<#/doc/types/is_same>)<CharT, char> for true,
    *   [std::is_same_v](<#/doc/types/is_same>)<typename path::value_type, wchar_t> for true, e
    *   a [codificação literal ordinária](<#/doc/language/charset>) for UTF-8.
*   Caso contrário, nenhuma transcodificação é realizada se [std::is_same_v](<#/doc/types/is_same>)&lt;typename path::value_type, CharT&gt; for true.
*   Caso contrário, a transcodificação é definida pela implementação.

Retorna um iterator após o final do range de saída.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_format_path`](<#/doc/feature_test>) | [`202403L`](<#/>) | (C++26) | suporte de formatação para `std::filesystem::path`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ formatter](<#/doc/utility/format/formatter>)(C++20) | define regras de formatação para um dado tipo
(template de classe)