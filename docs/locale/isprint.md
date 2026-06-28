# std::isprint(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isprint( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere imprimível (incluindo espaço) pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere for classificado como imprimível, false caso contrário.

### Possível implementação
```
    template<class CharT>
    bool isprint(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::print, ch);
    }
```

---

### Exemplo

Demonstra o uso de `isprint()` com diferentes locales (específicos do SO).

Execute este código
```
    #include <iostream>
    #include <locale>
    
    int main()
    {
        const wchar_t c = L'\u2122'; // trademark sign
    
        std::locale loc1("C");
        std::cout << "isprint('™', C locale) returned "
                  << std::boolalpha << std::isprint(c, loc1) << '\n';
    
        std::locale loc2("en_US.UTF-8");
        std::cout << "isprint('™', Unicode locale) returned "
                  << std::boolalpha << std::isprint(c, loc2) << '\n';
    }
```

Saída possível:
```
    isprint('™', C locale) returned false
    isprint('™', Unicode locale) returned true
```

### Veja também

[ isprint](<#/doc/string/byte/isprint>) | verifica se um caractere é um caractere de impressão
(função)
[ iswprint](<#/doc/string/wide/iswprint>) | verifica se um caractere largo é um caractere de impressão
(função)