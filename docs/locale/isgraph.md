# std::isgraph(std::locale)

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template< class CharT >
bool isgraph( CharT ch, const locale& loc );
```

Verifica se o caractere fornecido é classificado como um caractere gráfico (ou seja, imprimível, excluindo o espaço) pelo facet [std::ctype](<#/doc/locale/ctype>) do locale fornecido.

### Parâmetros

- **ch** — caractere
- **loc** — locale

### Valor de retorno

Retorna true se o caractere for classificado como gráfico, false caso contrário.

### Possível implementação
```
    template<class CharT>
    bool isgraph(CharT ch, const std::locale& loc)
    {
        return std::use_facet<std::ctype<CharT>>(loc).is(std::ctype_base::graph, ch);
    }
```

---

### Exemplo

Demonstra o uso de `isgraph()` com diferentes locales (específicos do SO).

Execute este código
```
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const wchar_t c = L'\u2a0c'; // quadruple integral
     
        std::locale loc1("C");
        std::cout << "isgraph('⨌', C locale) returned "
                  << std::boolalpha << std::isgraph(c, loc1) << '\n';
     
        std::locale loc2("en_US.UTF-8");
        std::cout << "isgraph('⨌', Unicode locale) returned "
                  << std::boolalpha << std::isgraph(c, loc2) << '\n';
    }
```

Saída possível:
```
    isgraph('⨌', C locale) returned false
    isgraph('⨌', Unicode locale) returned true
```

### Veja também

[ isgraph](<#/doc/string/byte/isgraph>) | verifica se um caractere é um caractere gráfico
(função)
[ iswgraph](<#/doc/string/wide/iswgraph>) | verifica se um caractere largo é um caractere gráfico
(função)