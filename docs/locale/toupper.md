# std::toupper(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
CharT toupper( CharT ch, const locale& loc );
```

Converte o caractere ch para maiúscula, se possível, usando as regras de conversão especificadas pela facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna a forma maiúscula de ch se uma estiver listada no locale, caso contrário, retorna ch inalterado.

### Observações

Apenas mapeamento de caracteres 1:1 pode ser realizado por esta função, por exemplo, a forma maiúscula de 'ß' é (com algumas exceções) a string de dois caracteres "SS", que não pode ser obtida por std::toupper.

### Possível implementação
```cpp
    template<class CharT>
    CharT toupper(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).toupper(ch);
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <cwctype>
    #include <iostream>
    #include <locale>
    
    int main()
    {
        wchar_t c = L'\u017f'; // Letra minúscula latina S longo ('ſ')
    
        std::cout << std::hex << std::showbase;
    
        std::cout << "no locale padrão, toupper(" << (std::wint_t)c << ") = "
                  << (std::wint_t)std::toupper(c, std::locale()) << '\n';
    
        std::cout << "no locale Unicode, toupper(" << (std::wint_t)c << ") = "
                  << (std::wint_t)std::toupper(c, std::locale("en_US.utf8")) << '\n';
    }
```

Saída possível:
```
    in the default locale, toupper(0x17f) = 0x17f
    in Unicode locale, toupper(0x17f) = 0x53
```

### Veja também

[ tolower(std::locale)](<#/doc/locale/tolower>) | converte um caractere para minúscula usando a facet `ctype` de um locale
(modelo de função)
[ toupper](<#/doc/string/byte/toupper>) | converte um caractere para maiúscula
(função)
[ towupper](<#/doc/string/wide/towupper>) | converte um caractere largo para maiúscula
(função)