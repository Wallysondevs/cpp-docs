# std::erase_if (std::multiset)

Definido no cabeçalho `[<set>](<#/doc/header/set>)`

```c
template< class Key, class Compare, class Alloc,
class Pred >
std::multiset<Key, Compare, Alloc>::size_type
erase_if( std::multiset<Key, Compare, Alloc>& c,
Pred pred );
```

Apaga todos os elementos que satisfazem o predicado pred de c.

Equivalente a
```cpp
    auto old_size = c.size();
    for (auto first = c.begin(), last = c.end(); first != last;)
    {
        if (pred(*first))
            first = c.erase(first);
        else
            ++first;
    }
    return old_size - c.size();
```

### Parâmetros

- **c** — contêiner do qual apagar
- **pred** — predicado que retorna true se o elemento deve ser apagado

### Valor de retorno

O número de elementos apagados.

### Complexidade

Linear.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <set>
     
    void println(auto rem, auto const& container)
    {
        std::cout << rem << '{';
        for (char sep[]{0, ' ', 0}; const auto& item : container)
            std::cout << sep << item, *sep = ',';
        std::cout << "}\n";
    }
     
    int main()
    {
        std::multiset data{3, 3, 4, 5, 5, 6, 6, 7, 2, 1, 0};
        println("Original:\n", data);
     
        auto divisible_by_3 =  { return (x % 3) == 0; };
     
        const auto count = std::erase_if(data, divisible_by_3);
     
        println("Erase all items divisible by 3:\n", data);
        std::cout << count << " items erased.\n";
    }
```

Saída:
```
    Original:
    {0, 1, 2, 3, 3, 4, 5, 5, 6, 6, 7}
    Erase all items divisible by 3:
    {1, 2, 4, 5, 5, 7}
    5 items erased.
```

### Veja também

[ remove remove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::remove ranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)