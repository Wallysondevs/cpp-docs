# std::wbuffer_convert

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class Codecvt,
class Elem = wchar_t,
class Tr = std::char_traits<Elem>
> class wbuffer_convert : public std::basic_streambuf<Elem, Tr>
(obsoleto desde C++17)
(removido em C++26)
```

`std::wbuffer_convert` é um wrapper sobre um stream buffer do tipo `std::basic_streambuf<char>` que lhe confere a aparência de `std::basic_streambuf<Elem>`. Todas as operações de E/S realizadas através de `std::wbuffer_convert` passam por conversão de caracteres conforme definido pelo facet `Codecvt`. `std::wbuffer_convert` assume a propriedade do facet de conversão e não pode usar um facet gerenciado por uma locale.

Os facets padrão adequados para uso com `std::wbuffer_convert` são `std::codecvt_utf8` para conversões UTF-8/UCS-2 e UTF-8/UCS-4 e `std::codecvt_utf8_utf16` para conversões UTF-8/UTF-16.

Este template de classe torna a funcionalidade de conversão implícita de caracteres de `std::basic_filebuf` disponível para qualquer `std::basic_streambuf`.

### Tipos de membros

Tipo | Definição
---|---
`state_type` | Codecvt::state_type

### Membros de dados

Membro | Descrição
---|---
[std::streambuf](<#/doc/io/basic_streambuf>)* `_bufptr_` | um ponteiro para o stream buffer de bytes subjacente
(objeto membro apenas para exposição*)
Codecvt* `_cvtptr_` | um ponteiro para o objeto de conversão alocado
(objeto membro apenas para exposição*)
`state_type` `_cvtstate_` | o objeto de estado de conversão
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/locale/wbuffer_convert/wbuffer_convert>) | constrói um novo `wbuffer_convert`
(função membro pública)
operator= | o operador de atribuição de cópia é deletado
(função membro pública)
[ (destrutor)](<#/doc/locale/wbuffer_convert/~wbuffer_convert>) | destrói o `wbuffer_convert` e seu facet de conversão
(função membro pública)
[ rdbuf](<#/doc/locale/wbuffer_convert/rdbuf>) | retorna ou substitui o stream buffer estreito subjacente
(função membro pública)
[ state](<#/doc/locale/wbuffer_convert/state>) | retorna o estado de conversão atual
(função membro pública)

### Veja também

Conversões de caracteres
| multibyte definido por locale
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
[ wstring_convert](<#/doc/locale/wstring_convert>)(C++11)(obsoleto desde C++17)(removido em C++26) | realiza conversões entre uma wide string e uma byte string
(template de classe)
[ codecvt_utf8](<#/doc/locale/codecvt_utf8>)(C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UCS-2/UCS-4
(template de classe)
[ codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)(C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UTF-16
(template de classe)