# std::erase, std::erase_if(std::basic_string)

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template< class CharT, class Traits, class Alloc, class U >
constexpr std::basic_string<CharT, Traits, Alloc>::size_type
erase( std::basic_string<CharT, Traits, Alloc>& c, const U& value );
(até C++26)
template< class CharT, class Traits, class Alloc, class U = CharT >
constexpr std::basic_string<CharT, Traits, Alloc>::size_type
erase( std::basic_string<CharT, Traits, Alloc>& c, const U& value );
template< class CharT, class Traits, class Alloc, class Pred >
constexpr std::basic_string<CharT, Traits, Alloc>::size_type
erase_if( std::basic_string<CharT, Traits, Alloc>& c, Pred pred );
```

1) Apaga todos os elementos que se comparam como iguais a value do container. Equivalente a
```
    auto it = std::remove(c.begin(), c.end(), value);
    auto r = c.end() - it;
    c.erase(it, c.end());
    return r;
```

2) Apaga todos os elementos que satisfazem o predicado pred do container. Equivalente a
```
    auto it = std::remove_if(c.begin(), c.end(), pred);
    auto r = c.end() - it;
    c.erase(it, c.end());
    return r;
```

### Parâmetros

- **c** — container do qual apagar
- **value** — valor a ser removido
- **pred** — predicado unário que retorna ​true se o elemento deve ser apagado.
A expressão pred(v) deve ser conversível para bool para cada argumento `v` do tipo (possivelmente const) `CharT`, independentemente da [categoria de valor](<#/doc/language/value_category>), e não deve modificar `v`. Assim, um tipo de parâmetro CharT& não é permitido, nem CharT a menos que para `CharT` uma move seja equivalente a uma copy (desde C++11). ​

### Valor de retorno

O número de elementos apagados.

### Complexidade

Linear.

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_algorithm_default_value_type`](<#/doc/feature_test>) | [`202403`](<#/>) | (C++26) | [Inicialização por lista](<#/doc/language/list_initialization>) para algoritmo ([1](<#/doc/string/basic_string/erase2>))

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string word{"startling"};
        std::cout << "Initially, word = " << std::quoted(word) << '\n';
     
        std::erase(word, 'l');
        std::cout << "After erase 'l': " << std::quoted(word) << '\n';
     
        auto erased = std::erase_if(word, 
        {
            return x == 'a' or x == 'r' or x == 't';
        });
     
        std::cout << "After erase all 'a', 'r', and 't': " << std::quoted(word) << '\n';
        std::cout << "Erased symbols count: " << erased << '\n';
     
    #if __cpp_lib_algorithm_default_value_type
        std::erase(word, {'g'});
        std::cout << "After erase {'g'}: " << std::quoted(word) << '\n';
    #endif
    }
```

Saída possível:
```
    Initially, word = "startling"
    After erase 'l', word = "starting"
    After erase all 'a', 'r', and 't': "sing"
    Erased symbols count: 4
    After erase {'g'}: "sin"
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)