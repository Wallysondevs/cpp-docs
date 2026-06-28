# std::swap(std::unordered_map)

Definido no cabeçalho `[<unordered_map>](<#/doc/header/unordered_map>)`

```c
template< class Key, class T, class Hash, class KeyEqual, class Alloc >
void swap( std::unordered_map<Key, T, Hash, KeyEqual, Alloc>& lhs,
std::unordered_map<Key, T, Hash, KeyEqual, Alloc>& rhs );
(até C++17)
template< class Key, class T, class Hash, class KeyEqual, class Alloc >
void swap( std::unordered_map<Key, T, Hash, KeyEqual, Alloc>& lhs,
std::unordered_map<Key, T, Hash, KeyEqual, Alloc>& rhs )
noexcept(/* see below */);
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::unordered_map](<#/doc/container/unordered_map>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

```cpp
`noexcept` especificação: noexcept(noexcept(lhs.swap(rhs)))  // (desde C++17)
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <unordered_map>
    
    int main()
    {
        std::unordered_map<int, char> alice{{1, 'a'}, {2, 'b'}, {3, 'c'}};
        std::unordered_map<int, char> bob{{7, 'Z'}, {8, 'Y'}, {9, 'X'}, {10, 'W'}};
    
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

Saída possível:
```
    Alice: 1:a 2:b 3:c
    Bobby: 7:Z 8:Y 9:X 10:W
    -- SWAP
    Alice: 7:Z 8:Y 9:X 10:W
    Bobby: 1:a 2:b 3:c
```

### Veja também

[ swap](<#/doc/container/unordered_map/swap>) | troca o conteúdo
(função membro pública)