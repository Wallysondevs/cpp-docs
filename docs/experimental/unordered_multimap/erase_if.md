# std::experimental::erase_if (std::unordered_multimap)

Definido no cabeçalho `[<experimental/unordered_map>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/unordered_map&action=edit&redlink=1> "cpp/header/experimental/unordered map \(page does not exist\)")`

```c
template< class Key, class T, class Hash, class KeyEqual, class Alloc, class Pred >
void erase_if( std::unordered_multimap<Key, T, Hash, KeyEqual, Alloc>& c, Pred pred );
```

  
Apaga todos os elementos que satisfazem o predicado pred do container. Equivalente a 
```cpp
    for (auto i = c.begin(), last = c.end(); i != last;)
    {
        if (pred(*i))
            i = c.erase(i);
        else
            ++i;
    }
```

### Parâmetros

c  |  \-  |  container do qual apagar   
---|---|---
pred  |  \-  |  predicado que determina quais elementos devem ser apagados   
  
### Complexidade

Linear. 

### Exemplo

Execute este código
```cpp
    #include <experimental/unordered_map>
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
        std::unordered_multimap<int, char> data{{1, 'a'},{2, 'b'},{3, 'c'},{4, 'd'},
                                                {5, 'e'},{4, 'f'},{5, 'g'},{5, 'g'}};
        std::cout << "Original:\n" << data << '\n';
        std::experimental::erase_if(data, 
        {
            return (item.first & 1) == 1;
        });
        std::cout << "Erase items with odd keys:\n" << data << '\n';
    }
```

Saída possível: 
```
    Original:
    {{5, g}{5, g}{5, e}{4, f}{4, d}{3, c}{2, b}{1, a}}
    Erase items with odd keys:
    {{4, f}{4, d}{2, b}}
```

### Veja também

[ remove_if](<#/doc/algorithm/remove>) |  remove elementos que satisfazem critérios específicos   
(modelo de função)  