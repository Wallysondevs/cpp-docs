# std::codecvt_utf8

Definido no cabeçalho `[<codecvt>](<#/doc/header/codecvt>)`

```c
template<
class Elem,
unsigned long Maxcode = 0x10ffff,
std::codecvt_mode Mode = (std::codecvt_mode)0 >
class codecvt_utf8
: public std::codecvt<Elem, char, std::mbstate_t>;
(obsoleto em C++17)
(removido em C++26)
```

`std::codecvt_utf8` é um facet [std::codecvt](<#/doc/locale/codecvt>) que encapsula a conversão entre uma string de bytes codificada em UTF-8 e uma string de caracteres UCS-2 ou UTF-32 (dependendo do tipo de `Elem`). Este facet [std::codecvt](<#/doc/locale/codecvt>) pode ser usado para ler e escrever arquivos UTF-8, tanto de texto quanto binários.

UCS-2 é uma codificação arcaica que é um subconjunto de UTF-16, que codifica valores escalares apenas no intervalo U+0000-U+FFFF (Plano Multilíngue Básico).

### Parâmetros de Template

- **Elem** — char16_t, char32_t ou wchar_t
- **Maxcode** — o maior valor de `Elem` que este facet lerá ou escreverá sem erro
- **Mode** — uma constante do tipo [std::codecvt_mode](<#/doc/locale/codecvt_mode>)

### Funções membro

**(construtor)** | constrói um novo facet `codecvt_utf8`
(função membro pública)
**(destrutor)** | destrói um facet `codecvt_utf8`
(função membro pública)

## std::codecvt_utf8::codecvt_utf8

explicit codecvt_utf8( [std::size_t](<#/doc/types/size_t>) refs = 0 );

Constrói um novo facet `std::codecvt_utf8`, passando o contador de referência inicial refs para a classe base.

### Parâmetros

- **refs** — o número de referências que se ligam ao facet

## std::codecvt_utf8::~codecvt_utf8

~codecvt_utf8();

Destrói o facet. Ao contrário dos facets gerenciados por locale, o destrutor deste facet é público.

## Herdado de [std::codecvt](<#/doc/locale/codecvt>)

### Tipos aninhados

Tipo | Definição
---|---
`intern_type` | `internT`
`extern_type` | `externT`
`state_type` | `stateT`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ out](<#/doc/locale/codecvt/out>) | invoca `do_out`
(função membro pública de `std::codecvt<InternT,ExternT,StateT>`)
[ in](<#/doc/locale/codecvt/in>) | invoca `do_in`
(função membro pública de `std::codecvt<InternT,ExternT,StateT>`)
[ unshift](<#/doc/locale/codecvt/unshift>) | invoca `do_unshift`
(função membro pública de `std::codecvt<InternT,ExternT,StateT>`)
[ encoding](<#/doc/locale/codecvt/encoding>) | invoca `do_encoding`
(função membro pública de `std::codecvt<InternT,ExternT,StateT>`)
[ always_noconv](<#/doc/locale/codecvt/always_noconv>) | invoca `do_always_noconv`
(função membro pública de `std::codecvt<InternT,ExternT,StateT>`)
[ length](<#/doc/locale/codecvt/length>) | invoca `do_length`
(função membro pública de `std::codecvt<InternT,ExternT,StateT>`)
[ max_length](<#/doc/locale/codecvt/max_length>) | invoca `do_max_length`
(função membro pública de `std::codecvt<InternT,ExternT,StateT>`)

### Funções membro protegidas

[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[ do_unshift](<#/doc/locale/codecvt/unshift>)[virtual] | gera a sequência de caracteres de terminação de caracteres `ExternT` para conversão incompleta
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[ do_encoding](<#/doc/locale/codecvt/encoding>)[virtual] | retorna o número de caracteres `ExternT` necessários para produzir um caractere `InternT`, se constante
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[ do_always_noconv](<#/doc/locale/codecvt/always_noconv>)[virtual] | testa se o facet codifica uma conversão de identidade para todos os valores de argumento válidos
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[ do_length](<#/doc/locale/codecvt/length>)[virtual] | calcula o comprimento da string `ExternT` que seria consumida pela conversão para o buffer `InternT` fornecido
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[ do_max_length](<#/doc/locale/codecvt/max_length>)[virtual] | retorna o número máximo de caracteres `ExternT` que poderiam ser convertidos em um único caractere `InternT`
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)

## Herdado de [std::codecvt_base](<#/doc/locale/codecvt_base>)

Tipo aninhado | Definição
---|---
enum result { ok, partial, error, noconv }; | Tipo de enumeração não escopado
Constante de enumeração | Definição
`ok` | a conversão foi concluída sem erro
`partial` | nem todos os caracteres de origem foram convertidos
`error` | foi encontrado um caractere inválido
`noconv` | nenhuma conversão necessária, os tipos de entrada e saída são os mesmos

### Notas

Embora o padrão exija que este facet funcione com UCS-2 quando o tamanho de `Elem` é de 16 bits, algumas implementações usam UTF-16 em vez disso. O termo "UCS-2" foi obsoleto e removido da ISO 10646.

### Exemplo

O exemplo a seguir demonstra a diferença entre as conversões UCS-2/UTF-8 e UTF-16/UTF-8: o terceiro caractere na string não é um caractere UCS-2 válido.

Execute este código
```cpp
    #include <codecvt>
    #include <cstdint>
    #include <iostream>
    #include <locale>
    #include <string>
    
    int main()
    {
        // UTF-8 data. The character U+1d10b, musical sign segno, does not fit in UCS-2
        std::string utf8 = "z\u6c34\U0001d10b";
    
        // the UTF-8 / UTF-16 standard conversion facet
        std::wstring_convert<std::codecvt_utf8_utf16<char16_t>, char16_t> utf16conv;
        std::u16string utf16 = utf16conv.from_bytes(utf8);
        std::cout << "UTF-16 conversion produced " << utf16.size() << " code units:\n"
                  << std::showbase << std::hex;
        for (char16_t c : utf16)
            std::cout << static_cast<std::uint16_t>(c) << ' ';
    
        // the UTF-8 / UCS-2 standard conversion facet
        std::wstring_convert<std::codecvt_utf8<char16_t>, char16_t> ucs2conv;
        try
        {
            std::u16string ucs2 = ucs2conv.from_bytes(utf8);
        }
        catch(const std::range_error& e)
        {
            std::u16string ucs2 = ucs2conv.from_bytes(utf8.substr(0, ucs2conv.converted()));
            std::cout << "\nUCS-2 failed after producing " << std::dec << ucs2.size()
                      << " characters:\n" << std::showbase << std::hex;
            for (char16_t c : ucs2)
                std::cout << static_cast<std::uint16_t>(c) << ' ';
            std::cout << '\n';
        }
    }
```

Saída:
```
    UTF-16 conversion produced 4 code units:
    0x7a 0x6c34 0xd834 0xdd0b
    UCS-2 failed after producing 2 characters:
    0x7a 0x6c34
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2229](<https://cplusplus.github.io/LWG/issue2229>) | C++98 | o construtor e o destrutor não foram especificados | os especifica

### Veja também

Conversões de caracteres | multibyte definido por locale
---|---|---
(UTF-8, GB18030) | UTF-8 | UTF-16
UTF-16 | [`mbrtoc16`](<#/doc/string/multibyte/mbrtoc16>) / [`c16rtomb`](<#/doc/string/multibyte/c16rtomb>) (com DR488 do C11) | [`codecvt`](<#/doc/locale/codecvt>)<char16_t,char,mbstate_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<char16_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<char32_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<wchar_t> | N/A
---|---
UCS-2 | [`c16rtomb`](<#/doc/string/multibyte/c16rtomb>) (sem DR488 do C11) | `codecvt_utf8` <char16_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<char16_t>
UTF-32 | [`mbrtoc32`](<#/doc/string/multibyte/mbrtoc32>) / [`c32rtomb`](<#/doc/string/multibyte/c32rtomb>) | [`codecvt`](<#/doc/locale/codecvt>)<char32_t,char,mbstate_t>
`codecvt_utf8` <char32_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<char32_t>
system wchar_t: UTF-32 (não-Windows)
UCS-2 (Windows) | [`mbsrtowcs`](<#/doc/string/multibyte/mbsrtowcs>) / [`wcsrtombs`](<#/doc/string/multibyte/wcsrtombs>)
[`use_facet`](<#/doc/locale/use_facet>)<[`codecvt`](<#/doc/locale/codecvt>)
<wchar_t,char,mbstate_t>>([`locale`](<#/doc/locale/locale>)) | `codecvt_utf8` <wchar_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<wchar_t>
[ codecvt](<#/doc/locale/codecvt>) | converte entre codificações de caracteres, incluindo UTF-8, UTF-16, UTF-32
(class template)
[ codecvt_mode](<#/doc/locale/codecvt_mode>)(C++11)(obsoleto em C++17)(removido em C++26) | tags para alterar o comportamento dos facets codecvt padrão
(enum)
[ codecvt_utf16](<#/doc/locale/codecvt_utf16>)(C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-16 e UCS-2/UCS-4
(class template)
[ codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)(C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-8 e UTF-16
(class template)