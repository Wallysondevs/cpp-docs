# std::iscntrl(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool iscntrl( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere de controle pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere for classificado como um caractere de controle, false caso contrário.

### Possível implementação
```cpp
    template<class CharT>
    bool iscntrl(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::cntrl, ch);
    }
```

---

### Exemplo

Demonstra o uso de `iscntrl()` com diferentes locales (específicos do SO).

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const wchar_t CCH = L'\u0094'; // Destructive Backspace in Unicode
     
        std::locale loc1("C");
        std::cout << "iscntrl(CCH, C locale) returned "
                  << std::boolalpha << std::iscntrl(CCH, loc1) << '\n';
     
        std::locale loc2("en_US.UTF8");
        std::cout << "iscntrl(CCH, Unicode locale) returned "
                  << std::boolalpha << std::iscntrl(CCH, loc2) << '\n';
    }
```

Saída possível:
```
    iscntrl(CCH, C locale) returned false
    iscntrl(CCH, Unicode locale) returned true
```

### Veja também

[ iscntrl](<#/doc/string/byte/iscntrl>) | verifica se um caractere é um caractere de controle
(função)
[ iswcntrl](<#/doc/string/wide/iswcntrl>) | verifica se um caractere largo é um caractere de controle
(função)