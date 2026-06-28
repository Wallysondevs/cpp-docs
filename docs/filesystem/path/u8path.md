# std::filesystem::u8path

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
template< class Source >
std::filesystem::path u8path( const Source& source );
(obsoleto em C++20)
template< class InputIt >
std::filesystem::path u8path( InputIt first, InputIt last );
(obsoleto em C++20)
```

Constrói um path `p` a partir de uma sequência de caracteres ou `char8_ts` (desde C++20) codificada em UTF-8, fornecida como um [std::string](<#/doc/string/basic_string>), ou como [std::string_view](<#/doc/string/basic_string_view>), ou como uma string multibyte terminada em nulo, ou como um par de iteradores `[first, last)`.

*   Se `path::value_type` for `char` e a codificação nativa for UTF-8, constrói um path diretamente como se fosse por `path(source)` ou `path(first, last)`. Nota: esta é a situação típica de um sistema POSIX que usa Unicode, como o Linux.
*   Caso contrário, se `path::value_type` for `wchar_t` e a codificação nativa for UTF-16 (esta é a situação no Windows), ou se `path::value_type` for `char16_t` (codificação nativa garantida UTF-16) ou `char32_t` (codificação nativa garantida UTF-32), então primeiro converte a sequência de caracteres UTF-8 para uma string temporária `tmp` do tipo `path::string_type` e então o novo path é construído como se fosse por `path(tmp)`.
*   Caso contrário (para codificações de caracteres estreitos não-UTF-8 e para `wchar_t` não-UTF-16), primeiro converte a sequência de caracteres UTF-8 para uma string temporária codificada em UTF-32 `tmp` do tipo [std::u32string](<#/doc/string/basic_string>), e então o novo path é construído como se fosse por `path(tmp)` (este caminho é seguido em um sistema POSIX com um sistema de arquivos codificado em multibyte ou single-byte não-Unicode).

### Parâmetros

- **source** — um [std::string](<#/doc/string/basic_string>) codificado em UTF-8, [std::string_view](<#/doc/string/basic_string_view>), um ponteiro para uma string multibyte terminada em nulo, ou um input iterator com tipo de valor `char` que aponta para uma string multibyte terminada em nulo
- **first, last** — par de [LegacyInputIterators](<#/doc/named_req/InputIterator>) que especificam uma sequência de caracteres codificada em UTF-8
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-O tipo de valor de `Source` ou `InputIt` deve ser `char` ou `char8_t`.(desde C++20)

### Valor de retorno

O path construído a partir da string de entrada após a conversão de UTF-8 para a codificação de caracteres nativa do sistema de arquivos.

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

### Notas

Em sistemas onde o formato de path nativo difere do formato de path genérico (nem Windows nem sistemas POSIX são exemplos de tais SOs), se o argumento para esta função estiver usando o formato genérico, ele será convertido para o nativo.

### Exemplo

Run this code
```cpp
    #include <cstdio>
    #ifdef _MSC_VER
    #include <fcntl.h>
    #include <io.h>
    #else
    #include <clocale>
    #include <locale>
    #endif
    #include <filesystem>
    #include <fstream>
    
    int main()
    {
    #ifdef _MSC_VER
        _setmode(_fileno(stderr), _O_WTEXT);
    #else
        std::setlocale(LC_ALL, "");
        std::locale::global(std::locale(""));
    #endif
    
        std::filesystem::path p(u8"要らない.txt");
        std::ofstream(p) << "File contents"; // Prior to LWG2676 uses operator string_type()
                                             // on MSVC, where string_type is wstring, only
                                             // works due to non-standard extension.
                                             // Post-LWG2676 uses new fstream constructors
    
        // Native string representation can be used with OS-specific APIs
    #ifdef _MSC_VER
        if (std::FILE* f = _wfopen(p.c_str(), L"r"))
    #else
        if (std::FILE* f = std::fopen(p.c_str(), "r"))
    #endif
        {
            for (int ch; (ch = fgetc(f)) != EOF; std::putchar(ch))
            {}
            std::fclose(f);
        }
    
        std::filesystem::remove(p);
    }
```

Saída possível:
```
    File contents
```

### Veja também

[ path](<#/doc/filesystem/path>)(C++17) | representa um path
(classe)