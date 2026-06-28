# std::isupper(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isupper( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere alfabético maiúsculo pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere for classificado como maiúsculo, false caso contrário.

### Possível implementação
```cpp
    template<class CharT>
    bool isupper(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::upper, ch);
    }
```

---

### Exemplo

Demonstra o uso de `std::isupper()` com diferentes locales (específicos do sistema operacional).

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        const wchar_t c = L'\u00de'; // LATIN CAPITAL LETTER THORN
    
        std::locale loc1("C");
        std::cout << std::boolalpha
                  << "isupper('Þ', C locale) returned " << std::isupper(c, loc1) << '\n'
                  << "islower('Þ', C locale) returned " << std::islower(c, loc1) << '\n';
    
        std::locale loc2("en_US.UTF8");
        std::cout << "isupper('Þ', Unicode locale) returned "
                  << std::isupper(c, loc2) << '\n'
                  << "islower('Þ', Unicode locale) returned "
                  << std::islower(c, loc2) << '\n';
    }
```

Saída possível:
```
    isupper('Þ', C locale) returned false
    islower('Þ', C locale) returned false
    isupper('Þ', Unicode locale) returned true
    islower('Þ', Unicode locale) returned false
```

### Veja também

[ isupper](<#/doc/string/byte/isupper>) | verifica se um caractere é um caractere maiúsculo
(função)
[ iswupper](<#/doc/string/wide/iswupper>) | verifica se um caractere largo é um caractere maiúsculo
(função)