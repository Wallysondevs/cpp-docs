# std::swap(std::unordered_set)

Definido no cabeçalho `[<unordered_set>](<#/doc/header/unordered_set>)`

```c
template< class Key, class Hash, class KeyEqual, class Alloc >
void swap( std::unordered_set<Key, Hash, KeyEqual, Alloc>& lhs,
std::unordered_set<Key, Hash, KeyEqual, Alloc>& rhs );
(até C++17)
template< class Key, class Hash, class KeyEqual, class Alloc >
void swap( std::unordered_set<Key, Hash, KeyEqual, Alloc>& lhs,
std::unordered_set<Key, Hash, KeyEqual, Alloc>& rhs )
noexcept(/* see below */);
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::unordered_set](<#/doc/container/unordered_set>). Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Exceções

```cpp
Especificação `noexcept``: noexcept(noexcept(lhs.swap(rhs)))  // (desde C++17)
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <unordered_set>
    
    int main()
    {
        std::unordered_set<int> alice{1, 2, 3};
        std::unordered_set<int> bob{7, 8, 9, 10};
    
        auto print =  { std::cout << ' ' << n; };
    
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
    Alice: 1 2 3
    Bobby: 7 8 9 10
    -- SWAP
    Alice: 7 8 9 10
    Bobby: 1 2 3
```

### Veja também

[ swap](<#/doc/container/unordered_set/swap>) | troca o conteúdo
(função membro pública)