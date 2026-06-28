# std::filesystem::path::c_str, std::filesystem::path::native, std::filesystem::path::operator string_type()

```cpp
const value_type* c_str() const noexcept;  // (1) (desde C++17)
const string_type& native() const noexcept;  // (2) (desde C++17)
operator string_type() const;  // (3) (desde C++17)
```

Acessa o nome do caminho nativo como uma string de caracteres.

1) Equivalente a native().c_str().

2) Retorna a representação em formato nativo do nome do caminho por referência.

3) Retorna a representação em formato nativo do nome do caminho por valor.

### Parâmetros

(nenhum)

### Valor de retorno

A representação de string nativa do nome do caminho, usando sintaxe nativa, tipo de caractere nativo e codificação de caractere nativa. Esta string é adequada para uso com APIs do sistema operacional.

### Observações

A função de conversão (3) é fornecida para que APIs que aceitam nomes de arquivo [std::basic_string](<#/doc/string/basic_string>) possam usar nomes de caminho sem alterações no código.

### Exemplo

Execute este código
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

[ stringwstringu8stringu16stringu32string](<#/doc/filesystem/path/string>) | retorna o caminho no formato de nome de caminho nativo convertido para uma string
(função membro pública)
[ generic_stringgeneric_wstringgeneric_u8stringgeneric_u16stringgeneric_u32string](<#/doc/filesystem/path/generic_string>) | retorna o caminho no formato de nome de caminho genérico convertido para uma string
(função membro pública)