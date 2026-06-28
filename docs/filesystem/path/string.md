# std::filesystem::path::string, std::filesystem::path::wstring, std::filesystem::path::u8string, std::filesystem::path::u16string, std::filesystem::path::u32string

```cpp
template< class CharT, class Traits = std::char_traits<CharT>,
class Alloc = std::allocator<CharT> >
std::basic_string<CharT,Traits,Alloc>
string( const Alloc& a = Alloc() ) const;  // (1) (desde C++17)
  // (2) (desde C++17)
std::string string() const;
std::wstring wstring() const;
std::u16string u16string() const;
std::u32string u32string() const;
  // (3)
std::string u8string() const;  // (desde C++17)
(ate C++20)
std::u8string u8string() const;  // (desde C++20)
```

  
Retorna o pathname interno no formato de pathname nativo, convertido para o tipo de string específico. A conversão, se houver, é realizada da seguinte forma: 

  * Se `path::value_type` for char, a conversão, se houver, é dependente do sistema. Este é o caso em sistemas POSIX típicos (como Linux), onde a codificação nativa é UTF-8 e `string()` não realiza nenhuma conversão. 
  * Caso contrário, se `path::value_type` for wchar_t, a conversão, se houver, é não especificada. Este é o caso no Windows, onde wchar_t tem 16 bits e a codificação nativa é UTF-16. 
  * Caso contrário, se `path::value_type` for char16_t, a codificação nativa é UTF-16 e o método de conversão é não especificado. 
  * Caso contrário, se `path::value_type` for char32_t, a codificação nativa é UTF-32 e o método de conversão é não especificado. 
  * Caso contrário, se `path::value_type` for char8_t, a codificação nativa é UTF-8 e o método de conversão é não especificado. 

1) Todas as alocações de memória são realizadas por a.

3) A codificação do resultado no caso de u8string() é sempre UTF-8.

### Parâmetros

(nenhum) 

### Valor de retorno

O pathname interno no formato de pathname nativo, convertido para o tipo de string especificado. 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cstdio>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const char* const localeName = "ja_JP.utf-8";
        std::setlocale(LC_ALL, localeName);
        std::locale::global(std::locale(localeName));
     
        const std::filesystem::path p(u8"要らない.txt");
        std::ofstream(p) << "File contents";
     
        // a representação de string nativa pode ser usada com APIs do SO
        if (std::FILE* const f = std::fopen(p.string().c_str(), "r"))
        {
            for (int ch; (ch = std::fgetc(f)) != EOF;)
                std::putchar(ch);
     
            std::fclose(f);
        }
     
        // a representação multibyte e wide pode ser usada para saída
        std::cout << "\nFile name in narrow multibyte encoding: " << p.string() << '\n';
     
        // wstring() lançará uma exceção em stdlibc++ (conforme gcc-12.1.0), veja:
        // https://gcc.gnu.org/bugzilla/show_bug.cgi?id=95048
        // https://gcc.gnu.org/bugzilla/show_bug.cgi?id=102839
        // funciona com gcc-12.2.1 (2023/02/01) e clang-10+ mais recentes
        std::wcout << "File name in wide encoding: " << p.wstring() << '\n';
     
        std::filesystem::remove(p);
    }
```

Saída possível: 
```
    File contents
    File name in narrow multibyte encoding: 要らない.txt
    File name in wide encoding: 要らない.txt
```

### Veja também

[ generic_stringgeneric_wstringgeneric_u8stringgeneric_u16stringgeneric_u32string](<#/doc/filesystem/path/generic_string>) | retorna o path no formato de pathname genérico convertido para uma string   
(função membro pública)  