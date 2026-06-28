# std::isalpha(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isalpha( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere alfabético pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere for classificado como alfabético, false caso contrário.

### Possível implementação
```cpp
    template<class CharT>
    bool isalpha(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::alpha, ch);
    }
```

---

### Exemplo

Demonstra o uso de `isalpha()` com diferentes locales (específicos do sistema operacional).

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        const wchar_t c = L'\u042f'; // cyrillic capital letter ya
    
        std::locale loc1("C");
        std::cout << "isalpha('Я', C locale) returned "
                  << std::boolalpha << std::isalpha(c, loc1) << '\n';
    
        std::locale loc2("en_US.UTF8");
        std::cout << "isalpha('Я', Unicode locale) returned "
                  << std::boolalpha << std::isalpha(c, loc2) << '\n';
    }
```

Saída possível:
```
    isalpha('Я', C locale) returned false
    isalpha('Я', Unicode locale) returned true
```

### Veja também

[ isalpha](<#/doc/string/byte/isalpha>) | verifica se um caractere é alfabético
(função)
[ iswalpha](<#/doc/string/wide/iswalpha>) | verifica se um caractere largo é alfabético
(função)