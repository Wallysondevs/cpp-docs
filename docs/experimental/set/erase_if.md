# std::experimental::erase_if (std::set)

Definido no cabeçalho `[<experimental/set>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/set&action=edit&redlink=1> "cpp/header/experimental/set \(page does not exist\)")`

```c
template< class Key, class Compare, class Alloc, class Pred >
void erase_if( std::set<Key, Compare, Alloc>& c, Pred pred );
```

Apaga todos os elementos do container que satisfazem o predicado `pred`. Equivalente a
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

c  |  \-  |  container do qual apagar
---|---|---
pred  |  \-  |  predicado que determina quais elementos devem ser apagados

### Complexidade

Linear.

### Exemplo

Execute este código
```
    #include <experimental/set>
    #include <iostream>
     
    template<typename Os, typename Container>
    inline Os& operator<<(Os& os, Container const& container)
    {
        os << "{ ";
        for (const auto& item : container)
            os << item << ' ';
        return os << '}';
    }
     
    int main()
    {
        std::set<int> data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
        std::cout << "Original:\n" << data << '\n';
        auto divisible_by_3 =  { return (x % 3) == 0; };
        std::experimental::erase_if(data, divisible_by_3);
        std::cout << "Erase all items divisible by 3:\n" << data << '\n';
    }
```

Saída:
```
    Original:
    { 0 1 2 3 4 5 6 7 }
    Erase all items divisible by 3:
    { 1 2 4 5 7 }
```

### Ver também

[ removeremove_if](<#/doc/algorithm/remove>) |  remove elementos que satisfazem critérios específicos
(function template)