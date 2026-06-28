# std::experimental::erase_if (std::unordered_multiset)

Definido no cabeçalho `[<experimental/unordered_set>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/unordered_set&action=edit&redlink=1> "cpp/header/experimental/unordered set \(page does not exist\)")`

```c
template< class Key, class Hash, class KeyEqual, class Alloc, class Pred >
void erase_if( std::unordered_multiset<Key, Hash, KeyEqual, Alloc>& c, Pred pred );
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

c  |  \-  |  container do qual apagar   
---|---|---
pred  |  \-  |  predicado que determina quais elementos devem ser apagados   
  
### Complexidade

Linear. 

### Exemplo

Execute este código
```
    #include <experimental/unordered_set>
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
        std::unordered_multiset<int> data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
        std::cout << "Original:\n" << data << '\n';
        auto divisible_by_3 =  { return (x % 3) == 0; };
        std::experimental::erase_if(data, divisible_by_3);
        std::cout << "Erase all items divisible by 3:\n" << data << '\n';
    }
```

Saída possível: 
```
    Original:
    { 0 1 2 7 6 6 5 5 4 3 3 }
    Erase all items divisible by 3:
    { 1 2 7 5 5 4 }
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) |  remove elementos que satisfazem critérios específicos   
(modelo de função)  