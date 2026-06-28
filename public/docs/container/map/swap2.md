# std::swap(std::map)

Definido no cabeçalho `[<map>](<#/doc/header/map>)`

```c
template< class Key, class T, class Compare, class Alloc >
void swap( std::map<Key, T, Compare, Alloc>& lhs,
std::map<Key, T, Compare, Alloc>& rhs );
template< class Key, class T, class Compare, class Alloc >
void swap( std::map<Key, T, Compare, Alloc>& lhs,
std::map<Key, T, Compare, Alloc>& rhs )
noexcept(/* veja abaixo */);
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::map](<#/doc/container/map>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — containers cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

```cpp
Especificação `noexcept`: noexcept(noexcept(lhs.swap(rhs)))  // (desde C++17)
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <map>
    
    int main()
    {
        std::map<int, char> alice{{1, 'a'}, {2, 'b'}, {3, 'c'}};
        std::map<int, char> bob{{7, 'Z'}, {8, 'Y'}, {9, 'X'}, {10, 'W'}};
    
        auto print = 
        {
            std::cout << ' ' << n.first << ':' << n.second;
        };
    
        // Print state before swap
        std::cout << "Alice:";
        std::for_each(alice.begin(), alice.end(), print);
        std::cout << "\nBobby:";
        std::for_each(bob.begin(), bob.end(), print);
        std::cout << '\n';
    
        std::cout << "-- SWAP\n";
        std::swap(alice, bob);
    
        // Print state after swap
        std::cout << "Alice:";
        std::for_each(alice.begin(), alice.end(), print);
        std::cout << "\nBobby:";
        std::for_each(bob.begin(), bob.end(), print);
        std::cout << '\n';
    }
```

Saída:
```
    Alice: 1:a 2:b 3:c
    Bobby: 7:Z 8:Y 9:X 10:W
    -- SWAP
    Alice: 7:Z 8:Y 9:X 10:W
    Bobby: 1:a 2:b 3:c
```

### Veja também

[ swap](<#/doc/container/map/swap>) | troca o conteúdo
(função membro pública)