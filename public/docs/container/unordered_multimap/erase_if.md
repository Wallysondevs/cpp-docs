# std::erase_if (std::unordered_multimap)

Definido no cabeçalho `[<unordered_map>](<#/doc/header/unordered_map>)`

```c
template< class Key, class T, class Hash, class KeyEqual, class Alloc, class Pred >
std::unordered_multimap<Key, T, Hash, KeyEqual, Alloc>::size_type
erase_if( std::unordered_multimap<Key, T, Hash, KeyEqual, Alloc>& c, Pred pred );
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

- **c** — container do qual apagar
- **pred** — predicado que retorna true se o elemento deve ser apagado

### Valor de retorno

O número de elementos apagados.

### Complexidade

Linear.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <unordered_map>
     
    void println(auto rem, auto const& container)
    {
        std::cout << rem << '{';
        for (char sep[]{0, ' ', 0}; const auto& [key, value] : container)
            std::cout << sep << '{' << key << ", " << value << '}', *sep = ',';
        std::cout << "}\n";
    }
     
    int main()
    {
        std::unordered_multimap<int, char> data
        {
            {1, 'a'}, {2, 'b'}, {3, 'c'}, {4, 'd'},
            {5, 'e'}, {4, 'f'}, {5, 'g'}, {5, 'g'},
        };
        println("Original:\n", data);
     
        const auto count = std::erase_if(data, 
        {
            auto const& [key, value] = item;
            return (key & 1) == 1;
        });
     
        println("Erase items with odd keys:\n", data);
        std::cout << count << " items removed.\n";
    }
```

Saída possível:
```
    Original:
    {{5, g}, {5, g}, {5, e}, {4, f}, {4, d}, {3, c}, {2, b}, {1, a}}
    Erase items with odd keys:
    {{4, f}, {4, d}, {2, b}}
    5 items removed.
```

### Veja também

[ removeremove_if](<#/doc/algorithm/remove>) | remove elementos que satisfazem critérios específicos
(modelo de função)
[ ranges::removeranges::remove_if](<#/doc/algorithm/ranges/remove>)(C++20)(C++20) | remove elementos que satisfazem critérios específicos
(objeto de função de algoritmo)