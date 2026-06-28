# std::experimental::erase (std::basic_string)

Definido no cabeçalho `[<experimental/string>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/string&action=edit&redlink=1> "cpp/header/experimental/string \(page does not exist\)")`

```c
template< class CharT, class Traits, class A, class U >
void erase( std::basic_string<CharT, Traits, A>& c, const U& value );
```

Apaga todos os elementos que se comparam como iguais a value do container. Equivalente a c.erase(std::remove(c.begin(), c.end(), value), c.end());.

### Parâmetros

- **c** — container do qual apagar
- **value** — valor a ser removido

### Complexidade

Linear.

### Exemplo

Execute este código
```
    #include <experimental/string>
    #include <iostream>
     
    int main()
    {
        std::string data{"$$P$A$S$S$$W$O$R$$D$"};
        std::cout << data << '\n';
        auto crack{'$'};
        std::experimental::erase(data, crack);
        std::cout << data << '\n';
    }
```

Saída:
```
    $$P$A$S$S$$W$O$R$$D$
    PASSWORD
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ erase_if (std::basic_string)](<#/doc/experimental/basic_string/erase_if>)(library fundamentals 2 TS) | apaga todos os elementos que satisfazem um predicado de um [std::basic_string](<#/doc/string/basic_string>)
(modelo de função)