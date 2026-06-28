# std::codecvt_mode

Definido no cabeçalho `[<codecvt>](<#/doc/header/codecvt>)`

```c
enum codecvt_mode {
consume_header = 4,
generate_header = 2,
little_endian = 1
};
(obsoleto desde C++17)
(removido em C++26)
```

As facets [std::codecvt_utf8](<#/doc/locale/codecvt_utf8>), [std::codecvt_utf16](<#/doc/locale/codecvt_utf16>), e [std::codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>) aceitam um valor opcional do tipo `std::codecvt_mode` como um argumento de template, que especifica funcionalidades opcionais da conversão de string unicode.

### Constantes

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
Valor | Significado
---|---
`little_endian` | assume que a entrada está na ordem de bytes little-endian (aplica-se apenas à entrada UTF-16, o padrão é big-endian)
`consume_header` | consome a marca de ordem de bytes, se presente no início da sequência de entrada, e (no caso de UTF-16), baseia-se na ordem de bytes que ela especifica para decodificar o restante da entrada
`generate_header` | gera a marca de ordem de bytes no início da sequência de saída

As marcas de ordem de bytes reconhecidas são:

`0xfe 0xff` | UTF-16 big-endian
---|---
`0xff 0xfe` | UTF-16 little-endian
`0xef 0xbb 0xbf` | UTF-8 (sem efeito na endianness)

Se `std::consume_header` não for selecionado ao ler um arquivo que começa com uma marca de ordem de bytes, o caractere Unicode U+FEFF (espaço sem quebra de largura zero) será lido como o primeiro caractere do conteúdo da string.

### Exemplo

O exemplo a seguir demonstra o consumo do BOM UTF-8:

Execute este código
```cpp
    #include <codecvt>
    #include <cwchar>
    #include <fstream>
    #include <iostream>
    #include <locale>
    #include <string>
     
    int main()
    {
        // UTF-8 data with BOM
        std::ofstream{"text.txt"} << "\ufeffz\u6c34\U0001d10b";
     
        // read the UTF-8 file, skipping the BOM
        std::wifstream fin{"text.txt"};
        fin.imbue(std::locale(fin.getloc(),
                              new std::codecvt_utf8<wchar_t, 0x10ffff, std::consume_header>));
     
        for (wchar_t c; fin.get(c);)
            std::cout << std::hex << std::showbase << (std::wint_t)c << '\n';
    }
```

Saída:
```
    0x7a
    0x6c34
    0x1d10b
```

### Veja também

[ codecvt](<#/doc/locale/codecvt>) | converte entre codificações de caracteres, incluindo UTF-8, UTF-16, UTF-32
(modelo de classe)
[ codecvt_utf8](<#/doc/locale/codecvt_utf8>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UCS-2/UCS-4
(modelo de classe)
[ codecvt_utf16](<#/doc/locale/codecvt_utf16>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-16 e UCS-2/UCS-4
(modelo de classe)
[ codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)(desde C++11)(obsoleto desde C++17)(removido em C++26) | converte entre UTF-8 e UTF-16
(modelo de classe)