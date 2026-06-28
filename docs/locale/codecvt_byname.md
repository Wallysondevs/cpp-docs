# std::codecvt_byname

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class InternT, class ExternT, class State >
class codecvt_byname : public std::codecvt<InternT, ExternT, State>;
```

`std::codecvt_byname` é um facet `[std::codecvt](<#/doc/locale/codecvt>)` que encapsula as regras de conversão de caracteres multibyte/wide de uma locale especificada em sua construção.

### Especializações

A standard library tem garantia de fornecer as seguintes especializações:

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::codecvt_byname<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> | conversão de identidade
std::codecvt_byname<char16_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++11)(obsoleto em C++20) | conversão entre UTF-16 e UTF-8
std::codecvt_byname<char16_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++20) | conversão entre UTF-16 e UTF-8
std::codecvt_byname<char32_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++11)(obsoleto em C++20) | conversão entre UTF-32 e UTF-8
std::codecvt_byname<char32_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
(desde C++20) | conversão entre UTF-32 e UTF-8
---|---
std::codecvt_byname<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> | conversão específica da locale entre string wide e conjuntos de caracteres narrow

### Funções membro

**(construtor)** | constrói um novo facet `codecvt_byname`
(função membro pública)
**(destrutor)** | destrói um facet `codecvt_byname`
(função membro protegida)

## std::codecvt_byname::codecvt_byname

```cpp
explicit codecvt_byname( const char* name, std::size_t refs = 0 );
explicit codecvt_byname( const std::string& name, std::size_t refs = 0 );  // (desde C++11)
```

Constrói um novo facet `std::codecvt_byname` para uma locale com nome.

refs é usado para gerenciamento de recursos: se refs == 0, a implementação destrói o facet, quando o último objeto `[std::locale](<#/doc/locale/locale>)` que o contém é destruído. Caso contrário, o objeto não é destruído.

### Parâmetros

- **name** — o nome da locale
- **refs** — o número de referências que apontam para o facet

## std::codecvt_byname::~codecvt_byname

protected:
~codecvt_byname();

Destrói o facet.

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
[std::locale::id](<#/doc/locale/locale/id>) `id` `[static]` | o identificador do `[facet](<#/doc/locale/locale/facet>)`

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
enum result { ok, partial, error, noconv }; | Tipo de enumeração não escopada
Constante de enumeração | Definição
`ok` | a conversão foi concluída sem erro
`partial` | nem todos os caracteres de origem foram convertidos
`error` | foi encontrado um caractere inválido
`noconv` | nenhuma conversão necessária, os tipos de entrada e saída são os mesmos

### Exemplo

Este exemplo demonstra a leitura de um arquivo codificado em GB18030 usando o facet codecvt de uma locale ciente de GB18030.

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    #include <locale>
    #include <string>
    
    int main()
    {
        // GB18030 narrow multibyte encoding
        std::ofstream("text.txt") << "\x7a"              // letter 'z', U+007a
                                     "\x81\x30\x89\x38"  // letter 'ß', U+00df
                                     "\xcb\xae"          // CJK ideogram '水' (water), U+6c34
                                     "\x94\x32\xbc\x35"; // musical sign '𝄋' (segno), U+1d10b
    
        std::wifstream fin("text.txt");
        fin.imbue(std::locale(fin.getloc(),
                  new std::codecvt_byname<wchar_t, char, std::mbstate_t>("zh_CN.gb18030")));
    
        for (wchar_t c; fin.get(c);)
            std::cout << std::hex << std::showbase << static_cast<unsigned>(c) << '\n';
    }
```

Saída possível:
```
    0x7a
    0xdf
    0x6c34
    0x1d10b
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 21](<https://cplusplus.github.io/LWG/issue21>) | C++98 | a standard library não precisava fornecer nenhuma especialização de `std::codecvt_byname` | duas especializações são necessárias

### Veja também

[ codecvt](<#/doc/locale/codecvt>) | converte entre codificações de caracteres, incluindo UTF-8, UTF-16, UTF-32
(modelo de classe)