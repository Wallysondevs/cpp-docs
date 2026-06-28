# std::towupper

Definido no cabeçalho `[<cwctype>](<#/doc/header/cwctype>)`

```c
std::wint_t towupper( std::wint_t ch );
```

Converte o wide character fornecido para maiúscula, se possível.

Se o valor de ch não for representável como um wchar_t nem igual ao valor da macro WEOF, o comportamento é indefinido.

### Parâmetros

- **ch** — wide character a ser convertido

### Valor de retorno

Versão em maiúscula de ch ou ch não modificado se nenhuma versão em maiúscula estiver listada na locale C atual.

### Observações

Apenas mapeamento de caracteres 1:1 pode ser realizado por esta função, por exemplo, a forma maiúscula de 'ß' é (com algumas exceções) a string de dois caracteres "SS", que não pode ser obtida por `std::towupper`.

[ISO 30112](<https://www.open-std.org/JTC1/SC35/WG5/docs/30112d10.pdf>) especifica quais pares de caracteres Unicode estão incluídos neste mapeamento.

### Exemplo

A [letra latina 'ſ' (U+017F)](<https://en.wikipedia.org/wiki/Long_s> "enwiki:Long s") é a forma minúscula alternativa de 'S' (U+0053).

Run this code
```cpp
    #include <clocale>
    #include <cwctype>
    #include <iostream>
     
    int main()
    {
        wchar_t c = L'\u017f'; // Latin small letter Long S ('ſ')
     
        std::cout << std::hex << std::showbase;
        std::cout << "in the default locale, towupper("
                  << static_cast<std::wint_t>(c) << ") = "
                  << std::towupper(c) << '\n';
     
        std::setlocale(LC_ALL, "en_US.utf8");
        std::cout << "in Unicode locale, towupper("
                  << static_cast<std::wint_t>(c) << ") = "
                  << std::towupper(c) << '\n';
    }
```

Output:
```
    in the default locale, towupper(0x17f) = 0x17f
    in Unicode locale, towupper(0x17f) = 0x53
```

### Ver também

[ towlower](<#/doc/string/wide/towlower>) | converte um wide character para minúscula
(function)
[ toupper(std::locale)](<#/doc/locale/toupper>) | converte um caractere para maiúscula usando a facet ctype de uma locale
(function template)
[ toupper](<#/doc/string/byte/toupper>) | converte um caractere para maiúscula
(function)
[C documentation](<#/>) para towupper