# std::islower(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool islower( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere alfabético minúsculo pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere for classificado como minúsculo, false caso contrário.

### Implementação possível
```
    template<class CharT>
    bool islower(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::lower, ch);
    }
```

---

### Exemplo

Demonstra o uso de `islower()` com diferentes locales (específicos do sistema operacional).

Execute este código
```
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const wchar_t c = L'\u03c0'; // GREEK SMALL LETTER PI
     
        std::locale loc1("C");
        std::cout << std::boolalpha
                  << "islower('π', C locale) returned "
                  << std::islower(c, loc1) << '\n'
                  << "isupper('π', C locale) returned "
                  << std::isupper(c, loc1) << '\n';
     
        std::locale loc2("en_US.UTF8");
        std::cout << "islower('π', Unicode locale) returned "
                  << std::islower(c, loc2) << '\n'
                  << "isupper('π', Unicode locale) returned "
                  << std::isupper(c, loc2) << '\n';
    }
```

Saída possível:
```
    islower('π', C locale) returned false
    isupper('π', C locale) returned false
    islower('π', Unicode locale) returned true
    isupper('π', Unicode locale) returned false
```

### Veja também

[ islower](<#/doc/string/byte/islower>) | verifica se um caractere é minúsculo
(função)
[ iswlower](<#/doc/string/wide/iswlower>) | verifica se um caractere largo é minúsculo
(função)