# std::wstring_convert&lt;Codecvt,Elem,Wide_alloc,Byte_alloc&gt;::converted

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
std::size_t converted() const noexcept;
```

Retorna o número de caracteres de origem que foram processados com sucesso pela chamada mais recente de [from_bytes()](<#/doc/locale/wstring_convert/from_bytes>) ou [to_bytes()](<#/doc/locale/wstring_convert/to_bytes>).

### Valor de retorno

`_[cvtcount](<#/doc/locale/wstring_convert>)_`

### Exemplo

Executar este código
```cpp
    #include <codecvt>
    #include <iostream>
    #include <locale>
    #include <string>
    
    int main()
    {
        std::string utf8 = "z\u00df\u6c34\U0001d10b"; // or u8"zß水𝄋"
                       // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b";
        std::cout << "original UTF-8 string size: " << utf8.size() << '\n';
    
        // the UTF-8 - UTF-32 standard conversion facet
        std::wstring_convert<std::codecvt_utf8<char32_t>, char32_t> cvt;
    
        // UTF-8 to UTF-32
        std::u32string utf32 = cvt.from_bytes(utf8);
        std::cout << "UTF-32 string size: " << utf32.size() << '\n';
        std::cout << "converted() == " << cvt.converted() << '\n';
    
        // UTF-32 to UTF-8
        utf8 = cvt.to_bytes(utf32);
        std::cout << "new UTF-8 string size: " << utf8.size() << '\n';
        std::cout << "converted() == " << cvt.converted() << '\n';
    }
```

Saída:
```
    original UTF-8 string size: 10
    UTF-32 string size: 4
    converted() == 10
    new UTF-8 string size: 10
    converted() == 4
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2174](<https://cplusplus.github.io/LWG/issue2174>) | C++11 | `wstring_convert::converted` não era exigido ser noexcept | exigido

### Ver também

[ to_bytes](<#/doc/locale/wstring_convert/to_bytes>) | converte uma wide string em uma byte string
(função membro pública)
[ from_bytes](<#/doc/locale/wstring_convert/from_bytes>) | converte uma byte string em uma wide string
(função membro pública)