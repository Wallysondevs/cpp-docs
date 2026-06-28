# std::swap(std::flat_multimap)

Definido no cabeçalho `[<flat_map>](<#/doc/header/flat_map>)`

```c
friend void swap( std::flat_multimap& lhs, std::flat_multimap& rhs ) noexcept;
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para std::flat_multimap. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Mesma complexidade que a troca dos contêineres subjacentes.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <flat_map>
    
    int main()
    {
        std::flat_multimap<int, char> alice{{1, 'a'}, {2, 'b'}, {3, 'c'}};
        std::flat_multimap<int, char> bob{{7, 'Z'}, {8, 'Y'}, {9, 'X'}, {10, 'W'}};
    
        auto print = <const int, char>& n)
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

[ swap](<#/doc/container/flat_multimap/swap>) | troca o conteúdo
(função membro pública)