# std::swap(std::flat_map)

Definido no header `[<flat_map>](<#/doc/header/flat_map>)`

```cpp
friend void swap( std::flat_map& lhs, std::flat_map& rhs ) noexcept;  // (desde C++23)
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para std::flat_map. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — containers cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Mesma complexidade que a troca dos containers subjacentes.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <flat_map>
    
    int main()
    {
        std::flat_map<int, char> alice{{1, 'a'}, {2, 'b'}, {3, 'c'}};
        std::flat_map<int, char> bob{{7, 'Z'}, {8, 'Y'}, {9, 'X'}, {10, 'W'}};
    
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

[ swap](<#/doc/container/flat_map/swap>) | troca o conteúdo
(função membro pública)