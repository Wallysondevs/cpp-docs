# std::wstring_convert&lt;Codecvt,Elem,Wide_alloc,Byte_alloc&gt;::from_bytes

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
wide_string from_bytes( char byte );
wide_string from_bytes( const char* ptr );
wide_string from_bytes( const byte_string& str );
wide_string from_bytes( const char* first, const char* last );
```

Converte uma sequência de bytes em uma wide string usando a facet apontada por `_[cvtptr](<#/doc/locale/wstring_convert>)_`.

1) A sequência de bytes consiste em apenas um elemento byte.

2) A sequência de bytes é a sequência terminada em nulo começando em ptr.

3) A sequência de bytes é a sequência contida em str.

4) A sequência de bytes é o range `[`first`, `last`)`.

Antes do início da conversão, se *this **não** foi construído com a sobrecarga de construtor [(3)](<#/doc/locale/wstring_convert/wstring_convert>), `_[cvtstate](<#/doc/locale/wstring_convert>)_` será definido para seu valor padrão (o estado de conversão inicial).

O número de elementos de entrada convertidos com sucesso será armazenado em `_[cvtcount](<#/doc/locale/wstring_convert>)_`.

### Valor de retorno

Se a conversão for bem-sucedida, retorna o resultado da conversão. Caso contrário, se *this for construído com a sobrecarga de construtor [(4)](<#/doc/locale/wstring_convert/wstring_convert>), retorna `_[wide_err_string](<#/doc/locale/wstring_convert>)_`.

### Exceções

Se a conversão falhar e *this **não** foi construído com a sobrecarga de construtor [(4)](<#/doc/locale/wstring_convert/wstring_convert>), lança [std::range_error](<#/doc/error/range_error>).

### Exemplo

Execute este código
```cpp
    #include <codecvt>
    #include <cstdint>
    #include <iostream>
    #include <locale>
    #include <string>
    
    int main()
    {
        std::string utf8 = "z\u00df\u6c34\U0001d10b"; // or u8"zß水𝄋"
                     // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b";
    
        // the UTF-8 / UTF-16 standard conversion facet
        std::u16string utf16 = 
            std::wstring_convert<std::codecvt_utf8_utf16<char16_t>,
                                 char16_t>{}.from_bytes(utf8.data());
        std::cout << "UTF-16 conversion produced " << utf16.size()
                  << " code units: " << std::showbase;
        for (char16_t c : utf16)
            std::cout << std::hex << static_cast<std::uint16_t>(c) << ' ';
    
        // the UTF-8 / UTF-32 standard conversion facet
        std::u32string utf32 =
            std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t>{}.from_bytes(utf8);
        std::cout << "\nUTF-32 conversion produced " << std::dec
                  << utf32.size() << " code units: ";
        for (char32_t c : utf32)
            std::cout << std::hex << static_cast<std::uint32_t>(c) << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    UTF-16 conversion produced 5 code units: 0x7a 0xdf 0x6c34 0xd834 0xdd0b
    UTF-32 conversion produced 4 code units: 0x7a 0xdf 0x6c34 0x1d10b
```

### Veja também

[ to_bytes](<#/doc/locale/wstring_convert/to_bytes>) | converte uma wide string em uma byte string
(função membro pública)
[ mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>) | converte uma string de caracteres multibyte estreita para wide string, dado o estado
(função)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)