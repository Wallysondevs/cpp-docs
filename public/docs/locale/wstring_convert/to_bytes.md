# std::wstring_convert&lt;Codecvt,Elem,Wide_alloc,Byte_alloc&gt;::to_bytes

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
byte_string to_bytes( Elem wchar );
byte_string to_bytes( const Elem* wptr );
byte_string to_bytes( const wide_string& wstr );
byte_string to_bytes( const Elem* first, const Elem* last );
```

Converte uma sequência larga (wide sequence) para uma string de bytes usando a facet apontada por `_[cvtptr](<#/doc/locale/wstring_convert>)_`.

1) A sequência larga consiste em apenas um elemento byte.

2) A sequência larga é a sequência terminada em nulo começando em ptr.

3) A sequência larga é a sequência contida em str.

4) A sequência larga é o range `[`first`, `last`)`.

Antes do início da conversão, se *this **não** foi construído com a sobrecarga de construtor [(3)](<#/doc/locale/wstring_convert/wstring_convert>), `_[cvtstate](<#/doc/locale/wstring_convert>)_` será definido para seu valor padrão (o estado de conversão inicial).

O número de elementos de entrada convertidos com sucesso será armazenado em `_[cvtcount](<#/doc/locale/wstring_convert>)_`.

### Valor de retorno

Se a conversão for bem-sucedida, retorna o resultado da conversão. Caso contrário, se *this for construído com a sobrecarga de construtor [(4)](<#/doc/locale/wstring_convert/wstring_convert>), retorna `_[byte_err_string](<#/doc/locale/wstring_convert>)_`.

### Exceções

Se a conversão falhar e *this **não** foi construído com a sobrecarga de construtor [(4)](<#/doc/locale/wstring_convert/wstring_convert>), lança [std::range_error](<#/doc/error/range_error>).

### Exemplo

Execute este código
```cpp
    #include <codecvt>
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <string>
    
    // utility function for output
    void hex_print(const std::string& s)
    {
        std::cout << std::hex << std::setfill('0');
        for (unsigned char c : s)
            std::cout << std::setw(2) << static_cast<int>(c) << ' ';
        std::cout << std::dec << '\n';
    }
    
    int main()
    {
        // wide character data
        std::wstring wstr = L"z\u00df\u6c34\U0001f34c"; // or L"zß水🍌"
    
        // wide to UTF-8
        std::wstring_convert<std::codecvt_utf8<wchar_t>> conv1;
        std::string u8str = conv1.to_bytes(wstr);
        std::cout << "UTF-8 conversion produced " << u8str.size() << " bytes:\n";
        hex_print(u8str);
    
        // wide to UTF-16le
        std::wstring_convert<std::codecvt_utf16<wchar_t, 0x10ffff, std::little_endian>> conv2;
        std::string u16str = conv2.to_bytes(wstr);
        std::cout << "UTF-16le conversion produced " << u16str.size() << " bytes:\n";
        hex_print(u16str);
    }
```

Saída:
```
    UTF-8 conversion produced 10 bytes:
    7a c3 9f e6 b0 b4 f0 9f 8d 8c 
    UTF-16le conversion produced 10 bytes:
    7a 00 df 00 34 6c 3c d8 4c df
```

### Ver também

[ from_bytes](<#/doc/locale/wstring_convert/from_bytes>) | converte uma string de bytes em uma string larga (wide string)
(função membro pública)
[ wcsrtombs](<#/doc/string/multibyte/wcsrtombs>) | converte uma string larga (wide string) para uma string de caracteres multibyte estreita (narrow multibyte character string), dado um estado
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever para um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)