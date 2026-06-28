# std::tolower(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
CharT tolower( CharT ch, const locale& loc );
```

Converte o caractere ch para minúsculo, se possível, usando as regras de conversão especificadas pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna a forma minúscula de ch se uma estiver listada no locale, caso contrário, retorna ch inalterado.

### Observações

Apenas mapeamento de caracteres 1:1 pode ser realizado por esta função, por exemplo, a letra maiúscula grega 'Σ' tem duas formas minúsculas, dependendo da posição em uma palavra: 'σ' e 'ς'. Uma chamada para std::tolower não pode ser usada para obter a forma minúscula correta neste caso.

### Possível implementação
```cpp
    template<class CharT>
    CharT tolower(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).tolower(ch);
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
        wchar_t c = L'\u0190'; // Latin capital open E ('Ɛ')
    
        std::cout << std::hex << std::showbase;
    
        std::cout << "in the default locale, tolower(" << (std::wint_t)c << ") = "
                  << (std::wint_t)std::tolower(c, std::locale()) << '\n';
    
        std::cout << "in Unicode locale, tolower(" << (std::wint_t)c << ") = "
                  << (std::wint_t)std::tolower(c, std::locale("en_US.utf8")) << '\n';
    }
```

Saída possível:
```
    in the default locale, tolower(0x190) = 0x190
    in Unicode locale, tolower(0x190) = 0x25b
```

### Veja também

[ toupper(std::locale)](<#/doc/locale/toupper>) | converte um caractere para maiúsculo usando o facet ctype de um locale
(modelo de função)
[ tolower](<#/doc/string/byte/tolower>) | converte um caractere para minúsculo
(função)
[ towlower](<#/doc/string/wide/towlower>) | converte um caractere largo para minúsculo
(função)