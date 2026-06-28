# std::filesystem::path::generic_string, std::filesystem::path::generic_wstring, std::filesystem::path::generic_u8string, std::filesystem::path::generic_u16string, std::filesystem::path::generic_u32string

```cpp
template< class CharT, class Traits = std::char_traits<CharT>,
class Alloc = std::allocator<CharT> >
std::basic_string<CharT,Traits,Alloc>
generic_string( const Alloc& a = Alloc() ) const;  // (1) (desde C++17)
  // (2) (desde C++17)
std::string generic_string() const;
std::wstring generic_wstring() const;
std::u16string generic_u16string() const;
std::u32string generic_u32string() const;
  // (3)
std::string generic_u8string() const;  // (desde C++17)
(ate C++20)
std::u8string generic_u8string() const;  // (desde C++20)
```

  
Retorna o nome do caminho interno no formato de nome de caminho genérico, convertido para o tipo de string específico. A conversão, se houver, é especificada da seguinte forma: 

  * Se `path::value_type` for char, a conversão, se houver, é dependente do sistema. Este é o caso em sistemas POSIX típicos (como Linux), onde a codificação nativa é UTF-8 e `string()` não realiza conversão. 
  * Caso contrário, se `path::value_type` for wchar_t, a conversão, se houver, é não especificada. Este é o caso no Windows, onde wchar_t tem 16 bits e a codificação nativa é UTF-16. 
  * Caso contrário, se `path::value_type` for char16_t, a codificação nativa é UTF-16 e o método de conversão é não especificado. 
  * Caso contrário, se `path::value_type` for char32_t, a codificação nativa é UTF-32 e o método de conversão é não especificado. 
  * Caso contrário, se `path::value_type` for char8_t, a codificação nativa é UTF-8 e o método de conversão é não especificado. 

O caractere `/` é usado como separador de diretório. 

1) Todas as alocações de memória são realizadas por a.

3) A codificação do resultado no caso de `u8string()` é sempre UTF-8.

### Parâmetros

a  |  \-  |  alocador para construir a string   
Requisitos de tipo   
-`CharT` deve ser um dos tipos de caractere codificados (char, wchar_t, char8_t (desde C++20), char16_t e char32_t).   
  
### Valor de retorno

O nome do caminho interno no formato de nome de caminho genérico, convertido para o tipo de string especificado. 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <filesystem>
    #include <iomanip>
    #include <iostream>
    #include <span>
    #include <string_view>
    
    void print(std::string_view rem, auto const& str)
    {
        std::cout << rem << std::hex << std::uppercase << std::setfill('0');
        for (const auto b : std::as_bytes(std::span{str}))
            std::cout << std::setw(2) << std::to_integer<unsigned>(b) << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::filesystem::path p{"/家/屋"};
        std::cout << p << '\n';
    
        print("string    : ", p.generic_string());
        print("u8string  : ", p.generic_u8string());
        print("u16string : ", p.generic_u16string());
        print("u32string : ", p.generic_u32string());
        print("wstring   : ", p.generic_wstring());
    }
```

Saída possível: 
```
    "/家/屋"
    string    : 2F E5 AE B6 2F E5 B1 8B
    u8string  : 2F E5 AE B6 2F E5 B1 8B
    u16string : 2F 00 B6 5B 2F 00 4B 5C
    u32string : 2F 00 00 00 B6 5B 00 00 2F 00 00 00 4B 5C 00 00
    wstring   : 2F 00 00 00 B6 5B 00 00 2F 00 00 00 4B 5C 00 00
```

### Veja também

[ stringwstringu8stringu16stringu32string](<#/doc/filesystem/path/string>) |  retorna o caminho no formato de nome de caminho nativo convertido para uma string   
(função membro pública)  