# std::experimental::filesystem::path::c_str, std::experimental::filesystem::path::native, std::experimental::filesystem::path::operator string_type()

const value_type* c_str() const; | (1) | (filesystem TS)
---|---|---
const string_type& native() const; | (2) | (filesystem TS)
operator string_type() const; | (3) | (filesystem TS)

Acessa o nome de caminho nativo como uma string de caracteres.

1) Equivalente a native().c_str().

2) Retorna a representação de string nativa do nome do caminho por referência.

3) Retorna a representação de string nativa do nome do caminho por valor.

### Parâmetros

(nenhum)

### Valor de retorno

A representação de string nativa do nome do caminho, usando sintaxe nativa, tipo de caractere nativo e codificação de caractere nativa. Esta string é adequada para uso com APIs do sistema operacional.

### Exceções

1,2)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Notas

A função de conversão (3) é fornecida para que APIs padrão de abertura de arquivo que aceitam nomes de arquivo [std::basic_string](<#/doc/string/basic_string>), como o construtor [std::ifstream](<#/doc/io/basic_ifstream>), possam usar nomes de caminho sem alterações no código:
```
    fs::path p = "/tmp/text.txt";
    std::ifstream f(p);
```

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

[ stringwstringu8stringu16stringu32string](<#/doc/experimental/fs/path/string>) | retorna o caminho no formato de nome de caminho nativo convertido para uma string
(função membro pública)
[ generic_stringgeneric_wstringgeneric_u8stringgeneric_u16stringgeneric_u32string](<#/doc/experimental/fs/path/generic_string>) | retorna o caminho no formato de nome de caminho genérico convertido para uma string
(função membro pública)