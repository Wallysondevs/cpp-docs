# std::codecvt

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class InternT,
class ExternT,
class StateT
> class codecvt;
```

O template de classe `std::codecvt` encapsula a conversão de strings de caracteres, incluindo wide e multibyte, de uma codificação para outra. Todas as operações de E/S de arquivo realizadas através de [std::basic_fstream](<#/doc/io/basic_fstream>)&lt;CharT&gt; usam o facet std::codecvt<CharT, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> do locale imbuído no stream.

Diagrama de herança

### Especializações

A standard library garante o fornecimento das seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::codecvt<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> | conversão de identidade
std::codecvt<char16_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++11)(obsoleto em C++20) | conversão entre UTF-16 e UTF-8
std::codecvt<char16_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++20)(obsoleto) | conversão entre UTF-16 e UTF-8
std::codecvt<char32_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++11)(obsoleto em C++20) | conversão entre UTF-32 e UTF-8
std::codecvt<char32_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++20)(obsoleto) | conversão entre UTF-32 e UTF-8
---|---
std::codecvt<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> | conversão entre os conjuntos de caracteres wide nativos do sistema e narrow de byte único

### Tipos aninhados

Tipo | Definição
---|---
`intern_type` | `InternT`
`extern_type` | `ExternT`
`state_type` | `StateT`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/codecvt/codecvt>) | constrói um novo facet `codecvt`
(função membro pública)
[ out](<#/doc/locale/codecvt/out>) | invoca `do_out`
(função membro pública)
[ in](<#/doc/locale/codecvt/in>) | invoca `do_in`
(função membro pública)
[ unshift](<#/doc/locale/codecvt/unshift>) | invoca `do_unshift`
(função membro pública)
[ encoding](<#/doc/locale/codecvt/encoding>) | invoca `do_encoding`
(função membro pública)
[ always_noconv](<#/doc/locale/codecvt/always_noconv>) | invoca `do_always_noconv`
(função membro pública)
[ length](<#/doc/locale/codecvt/length>) | invoca `do_length`
(função membro pública)
[ max_length](<#/doc/locale/codecvt/max_length>) | invoca `do_max_length`
(função membro pública)

### Funções membro protegidas

[ (destrutor)](<#/doc/locale/codecvt/~codecvt>) | destrói um facet `codecvt`
(função membro protegida)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em um arquivo
(função membro virtual protegida)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida)
[ do_unshift](<#/doc/locale/codecvt/unshift>)[virtual] | gera a sequência de caracteres de terminação de caracteres `ExternT` para conversão incompleta
(função membro virtual protegida)
[ do_encoding](<#/doc/locale/codecvt/encoding>)[virtual] | retorna o número de caracteres `ExternT` necessários para produzir um caractere `InternT`, se constante
(função membro virtual protegida)
[ do_always_noconv](<#/doc/locale/codecvt/always_noconv>)[virtual] | testa se o facet codifica uma conversão de identidade para todos os valores de argumento válidos
(função membro virtual protegida)
[ do_length](<#/doc/locale/codecvt/length>)[virtual] | calcula o comprimento da string `ExternT` que seria consumida pela conversão para o buffer `InternT` fornecido
(função membro virtual protegida)
[ do_max_length](<#/doc/locale/codecvt/max_length>)[virtual] | retorna o número máximo de caracteres `ExternT` que poderiam ser convertidos em um único caractere `InternT`
(função membro virtual protegida)

## Herdado de [std::codecvt_base](<#/doc/locale/codecvt_base>)

Tipo aninhado | Definição
---|---
enum result { ok, partial, error, noconv }; | Tipo de enumeração não escopado
Constante de enumeração | Definição
`ok` | a conversão foi concluída sem erro
`partial` | nem todos os caracteres de origem foram convertidos
`error` | encontrou um caractere inválido
`noconv` | nenhuma conversão necessária, os tipos de entrada e saída são os mesmos

### Exemplo

Os exemplos a seguir leem um arquivo UTF-8 usando um locale que implementa a conversão UTF-8 em codecvt<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> e convertem uma string UTF-8 para UTF-16 usando uma das especializações padrão de `std::codecvt`.

Execute este código
```cpp
    #include <codecvt>
    #include <cstdint>
    #include <fstream>
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <string>
    
    // wrapper de utilidade para adaptar facets vinculados ao locale para conversão wstring/wbuffer
    template<class Facet>
    struct deletable_facet : Facet
    {
        template<class... Args>
        deletable_facet(Args&&... args) : Facet(std::forward<Args>(args)...) {}
        ~deletable_facet() {}
    };
    
    int main()
    {
        // UTF-8 narrow multibyte encoding
        std::string data = reinterpret_cast<const char*>(+u8"z\u00df\u6c34\U0001f34c");
                           // or reinterpret_cast<const char*>(+u8"zß水🍌")
                           // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9f\x8d\x8c"
    
        std::ofstream("text.txt") << data;
    
        // using system-supplied locale's codecvt facet
        std::wifstream fin("text.txt");
        // a leitura de wifstream usará codecvt<wchar_t, char, std::mbstate_t>
        // o codecvt deste locale converte UTF-8 para UCS4 (em sistemas como Linux)
        fin.imbue(std::locale("en_US.UTF-8"));
        std::cout << "O arquivo UTF-8 contém as seguintes unidades de código UCS4:\n" << std::hex;
        for (wchar_t c; fin >> c;)
            std::cout << "U+" << std::setw(4) << std::setfill('0')
                      << static_cast<uint32_t>(c) << ' ';
    
        // using standard (locale-independent) codecvt facet
        std::wstring_convert<
            deletable_facet<std::codecvt<char16_t, char, std::mbstate_t>>, char16_t> conv16;
        std::u16string str16 = conv16.from_bytes(data);
    
        std::cout << "\n\nO arquivo UTF-8 contém as seguintes unidades de código UTF-16:\n"
                  << std::hex;
        for (char16_t c : str16)
            std::cout << "U+" << std::setw(4) << std::setfill('0')
                      << static_cast<uint16_t>(c) << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    O arquivo UTF-8 contém as seguintes unidades de código UCS4:
    U+007a U+00df U+6c34 U+1f34c 
    
    O arquivo UTF-8 contém as seguintes unidades de código UTF-16:
    U+007a U+00df U+6c34 U+d83c U+df4c
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3767](<https://cplusplus.github.io/LWG/issue3767>) | C++20 | std::codecvt<char16_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> e
std::codecvt<char32_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> são independentes de locale | os tornou obsoletos

### Veja também

Conversões de caracteres | multibyte definido por locale (UTF-8, GB18030) | UTF-8 | UTF-16
UTF-16 | [`mbrtoc16`](<#/doc/string/multibyte/mbrtoc16>) / [`c16rtomb`](<#/doc/string/multibyte/c16rtomb>) (com DR488 do C11) | `codecvt` <char16_t,char,mbstate_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<char16_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<char32_t>
[`codecvt_utf8_utf16`](<#/doc/locale/codecvt_utf8_utf16>)<wchar_t> | N/A
---|---
UCS-2 | [`c16rtomb`](<#/doc/string/multibyte/c16rtomb>) (sem DR488 do C11) | [`codecvt_utf8`](<#/doc/locale/codecvt_utf8>)<char16_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<char16_t>
UTF-32 | [`mbrtoc32`](<#/doc/string/multibyte/mbrtoc32>) / [`c32rtomb`](<#/doc/string/multibyte/c32rtomb>) | `codecvt` <char32_t,char,mbstate_t>
[`codecvt_utf8`](<#/doc/locale/codecvt_utf8>)<char32_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<char32_t>
wchar_t do sistema: UTF-32 (não-Windows)
UCS-2 (Windows) | [`mbsrtowcs`](<#/doc/string/multibyte/mbsrtowcs>) / [`wcsrtombs`](<#/doc/string/multibyte/wcsrtombs>)
[`use_facet`](<#/doc/locale/use_facet>)<`codecvt`
<wchar_t,char,mbstate_t>>([`locale`](<#/doc/locale/locale>)) | [`codecvt_utf8`](<#/doc/locale/codecvt_utf8>)<wchar_t> | [`codecvt_utf16`](<#/doc/locale/codecvt_utf16>)<wchar_t>
[ codecvt_base](<#/doc/locale/codecvt_base>) | define erros de conversão de caracteres
(classe)
[ codecvt_byname](<#/doc/locale/codecvt_byname>) | representa o **std::codecvt** fornecido pelo sistema para o locale nomeado
(template de classe)
[ codecvt_utf8](<#/doc/locale/codecvt_utf8>)(C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-8 e UCS-2/UCS-4
(template de classe)
[ codecvt_utf16](<#/doc/locale/codecvt_utf16>)(C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-16 e UCS-2/UCS-4
(template de classe)
[ codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)(C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-8 e UTF-16
(template de classe)