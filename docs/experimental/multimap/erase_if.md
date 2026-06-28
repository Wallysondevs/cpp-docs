# std::experimental::erase_if (std::multimap)

Definido no header `[<experimental/map>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/map&action=edit&redlink=1> "cpp/header/experimental/map \(page does not exist\)")`

```cpp
template< class Key, class T, class Compare, class Alloc, class Pred >
void erase_if( std::multimap<Key, T, Compare, Alloc>& c, Pred pred );
```

Apaga todos os elementos que satisfazem o predicado pred do container. Equivalente a
```
    for (auto i = c.begin(), last = c.end(); i != last;)
    {
        if (pred(*i))
            i = c.erase(i);
        else
            ++i;
    }
```

### Parâmetros

- **c** — container do qual apagar
- **pred** — predicado que determina quais elementos devem ser apagados

### Complexidade

Linear.

### Exemplo

Execute este código
```
    #include <experimental/map>
    #include <iostream>
     
    template<typename Os, typename Container>
    inline Os& operator<<(Os& os, Container const& cont)
    {
        os << '{';
        for (const auto& item : cont)
            os << '{' << item.first << ", " << item.second << '}';
        return os << '}';
    }
     
    int main()
    {
        std::multimap<int, char> data{{1, 'a'},{2, 'b'},{3, 'c'},{4, 'd'},
                                      {5, 'e'},{4, 'f'},{5, 'g'},{5, 'g'}};
        std::cout << "Original:\n" << data << '\n';
        std::experimental::erase_if(data, 
        {
            return (item.first & 1) == 1;
        });
        std::cout << "Erase items with odd keys:\n" << data << '\n';
    }
```

Saída:
```
    Original:
    {{1, a}{2, b}{3, c}{4, d}{4, f}{5, e}{5, g}{5, g}}
    Erase items with odd keys:
    {{2, b}{4, d}{4, f}}
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)