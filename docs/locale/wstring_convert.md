# std::wstring_convert

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class Codecvt,
class Elem = wchar_t,
class Wide_alloc = std::allocator<Elem>,
class Byte_alloc = std::allocator<char>
> class wstring_convert;
(obsoleto desde C++17)
(removido em C++26)
```

O template de classe `std::wstring_convert` realiza conversões entre string de bytes [std::string](<#/doc/string/basic_string>) e string larga [std::basic_string](<#/doc/string/basic_string>)&lt;Elem&gt;, usando uma facet de conversão de código individual `Codecvt`. `std::wstring_convert` assume a propriedade da facet de conversão e não pode usar uma facet gerenciada por uma locale.

As facets padrão adequadas para uso com `std::wstring_convert` são [std::codecvt_utf8](<#/doc/locale/codecvt_utf8>) para conversões UTF-8/UCS-2 e UTF-8/UCS-4 e [std::codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>) para conversões UTF-8/UTF-16.

### Tipos aninhados

Tipo | Definição
---|---
`byte_string` | [std::basic_string](<#/doc/string/basic_string>)<char, [std::char_traits](<#/doc/string/char_traits>)&lt;char&gt;, Byte_alloc>
`wide_string` | [std::basic_string](<#/doc/string/basic_string>)<Elem, [std::char_traits](<#/doc/string/char_traits>)&lt;Elem&gt;, Wide_alloc>
`state_type` | typename Codecvt::state_type
`int_type` | typename wide_string::traits_type::int_type

### Membros de dados

Membro | Descrição
---|---
`byte_string` `_byte_err_string_` | a string de bytes a ser exibida em erros
(objeto membro apenas para exposição*)
`wide_string` `_wide_err_string_` | a string larga a ser exibida em erros
(objeto membro apenas para exposição*)
Codecvt* `_cvtptr_` | um ponteiro para o objeto de conversão alocado
(objeto membro apenas para exposição*)
`state_type` `_cvtstate_` | o objeto de estado de conversão
(objeto membro apenas para exposição*)
[std::size_t](<#/doc/types/size_t>) `_cvtcount_` | a contagem de conversões
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/locale/wstring_convert/wstring_convert>) | constrói um novo `wstring_convert`
(função membro pública)
operator= | o operador de atribuição de cópia é deletado
(função membro pública)
[ (destrutor)](<#/doc/locale/wstring_convert/~wstring_convert>) | destrói o `wstring_convert` e sua facet de conversão
(função membro pública)
[ from_bytes](<#/doc/locale/wstring_convert/from_bytes>) | converte uma string de bytes em uma string larga
(função membro pública)
[ to_bytes](<#/doc/locale/wstring_convert/to_bytes>) | converte uma string larga em uma string de bytes
(função membro pública)
[ converted](<#/doc/locale/wstring_convert/converted>) | retorna o número de caracteres convertidos com sucesso
(função membro pública)
[ state](<#/doc/locale/wstring_convert/state>) | retorna o estado de conversão atual
(função membro pública)

### Ver também

Conversões de caracteres
conversions | multibyte definido por locale
---|---
(UTF-8, GB18030) | UTF-8
| UTF-16
UTF-16 | [`mbrtoc16`](<#/doc/string/multibyte/mbrtoc16>) / [`c16rtomb`](<#/doc/string/multibyte/c16rtomb>) (com DR488 do C11) | [`codecvt`](<#/doc/locale/codecvt>)<char16_t,char,mbstate_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<char16_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<char32_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<wchar_t> | N/A
---|---
UCS-2 | [`c16rtomb`](<#/doc/string/multibyte/c16rtomb>) (sem DR488 do C11) | [`codecvt_utf8`](<#/doc/locale/codecvt_utf8>)<char16_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<char16_t>
UTF-32 | [`mbrtoc32`](<#/doc/string/multibyte/mbrtoc32>) / [`c32rtomb`](<#/doc/string/multibyte/c32rtomb>) | [`codecvt`](<#/doc/locale/codecvt>)<char32_t,char,mbstate_t>
[`codecvt_utf8`](<#/doc/locale/codecvt_utf8>)<char32_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<char32_t>
wchar_t do sistema: UTF-32 (não-Windows)
UCS-2 (Windows) | [`mbsrtowcs`](<#/doc/string/multibyte/mbsrtowcs>) / [`wcsrtombs`](<#/doc/string/multibyte/wcsrtombs>)
[`use_facet`](<#/doc/locale/use_facet>)<[`codecvt`](<#/doc/locale/codecvt>)
<wchar_t,char,mbstate_t>>([`locale`](<#/doc/locale/locale>)) | [`codecvt_utf8`](<#/doc/locale/codecvt_utf8>)<wchar_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<wchar_t>
[ wbuffer_convert](<#/doc/locale/wbuffer_convert>)(C++11)(obsoleto desde C++17)(removido em C++26) | realiza a conversão entre um buffer de stream de bytes e um buffer de stream largo
(template de classe)
[ codecvt_utf8](<#/doc/locale/codecvt_utf8>)(C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UCS-2/UCS-4
(template de classe)
[ codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)(C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UTF-16
(template de classe)