# std::ispunct(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool ispunct( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere de pontuação pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere é classificado como pontuação, false caso contrário.

### Possível implementação
```cpp
    template<class CharT>
    bool ispunct(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::punct, ch);
    }
```

---

### Exemplo

Demonstra o uso de `std::ispunct()` com diferentes locales (específicos do sistema operacional).

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        const wchar_t c = L'\u214b'; // ampersand de cabeça para baixo
    
        std::locale loc1("C");
        std::cout << "ispunct('⅋', C locale) returned "
                  << std::boolalpha << std::ispunct(c, loc1) << '\n';
    
        std::locale loc2("en_US.UTF-8");
        std::cout << "ispunct('⅋', Unicode locale) returned "
                  << std::boolalpha << std::ispunct(c, loc2) << '\n';
    }
```

Saída possível:
```
    isalpha('⅋', C locale) returned false
    isalpha('⅋', Unicode locale) returned true
```

### Veja também

[ ispunct](<#/doc/string/byte/ispunct>) | verifica se um caractere é um caractere de pontuação
(função)
[ iswpunct](<#/doc/string/wide/iswpunct>) | verifica se um caractere largo é um caractere de pontuação
(função)