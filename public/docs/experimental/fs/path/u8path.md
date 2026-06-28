# std::experimental::filesystem::u8path

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
template< class Source >
path u8path( const Source& source );
template< class InputIt >
path u8path( InputIt first, InputIt last );
```

Constrói um `path` `p` a partir de uma sequência de `char`s codificada em UTF-8, fornecida como um [std::string](<#/doc/string/basic_string>), ou como uma string multibyte terminada em nulo, ou como um par de iteradores `[first, last)`.

*   Se `path::value_type` for `char` e a codificação nativa for UTF-8, constrói um `path` diretamente como se fosse por `path(source)` ou `path(first, last)`. Nota: esta é a situação típica de um sistema POSIX que usa Unicode, como o Linux.
*   Caso contrário, se `path::value_type` for `wchar_t` e a codificação nativa for UTF-16 (esta é a situação no Windows), ou se `path::value_type` for `char16_t` (codificação nativa garantida UTF-16) ou `char32_t` (codificação nativa garantida UTF-32), então primeiro converte a sequência de caracteres UTF-8 para uma string temporária `tmp` do tipo `path::string_type` e então o novo `path` é construído como se fosse por `path(tmp)`.
*   Caso contrário (para codificações de caracteres estreitos não-UTF-8 e para `wchar_t` não-UTF-16), primeiro converte a sequência de caracteres UTF-8 para uma string temporária codificada em UTF-32 `tmp` do tipo [std::u32string](<#/doc/string/basic_string>), e então o novo `path` é construído como se fosse por `path(tmp)` (este caminho é tomado em um sistema POSIX com um sistema de arquivos codificado em multibyte ou single-byte não-Unicode).

### Parâmetros

- **source** — um [std::string](<#/doc/string/basic_string>) codificado em UTF-8, um ponteiro para uma string multibyte terminada em nulo, ou um input iterator com tipo de valor `char` que aponta para uma string multibyte terminada em nulo
- **first, last** — par de [LegacyInputIterators](<#/doc/named_req/InputIterator>) que especificam uma sequência de caracteres codificada em UTF-8
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-O tipo de valor de `InputIt` deve ser `char`.

### Valor de retorno

O `path` construído a partir da string de entrada após a conversão de UTF-8 para a codificação de caracteres nativa do sistema de arquivos.

### Exceções

Pode lançar [`filesystem_error`](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente ou [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

### Notas

Em sistemas onde o formato de `path` nativo difere do formato de `path` genérico (nem Windows nem sistemas POSIX são exemplos de tais sistemas operacionais), se o argumento para esta função estiver usando o formato genérico, ele será convertido para o nativo.

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cstdio>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::locale::global(std::locale("en_US.utf8"));
    
        fs::path p = fs::u8path(u8"要らない.txt");
    
        // native string representation can be used with OS APIs
        std::ofstream(p) << "File contents"; // this uses operator string()
        if (std::FILE* f = std::fopen(p.c_str(), "r"))
        {
            int ch;
            while ((ch=fgetc(f))!= EOF) putchar(ch);
            std::fclose(f);
        }
    
        // multibyte and wide representation can be used for output
        std::cout.imbue(std::locale());
        std::cout << "\nFile name in narrow multibyte encoding: "
                  << p.string() << '\n';
    
        std::wcerr.imbue(std::locale());
        std::wcerr << "File name in wide encoding: "
                   << p.wstring() << '\n';
    
        fs::remove(p);
    }
```

Saída possível:
```
    File contents
    File name in narrow multibyte encoding: 要らない.txt
    File name in wide encoding: 要らない.txt
```

### Veja também

[ path](<#/doc/experimental/fs/path>) | representa um `path`
(classe)