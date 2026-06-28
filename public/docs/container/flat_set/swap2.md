# std::swap(std::flat_set)

Definido no cabeçalho `[<flat_set>](<#/doc/header/flat_set>)`

```c
friend void swap( std::flat_set& lhs, std::flat_set& rhs ) noexcept;
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para std::flat_set. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Mesma complexidade da troca dos contêineres subjacentes.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <flat_set>
    
    int main()
    {
        std::flat_set<int> alice{1, 2, 3};
        std::flat_set<int> bob{7, 8, 9, 10};
    
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

Saída:
```
    Alice: 1 2 3
    Bobby: 7 8 9 10
    -- SWAP
    Alice: 7 8 9 10
    Bobby: 1 2 3
```

### Veja também

[ swap](<#/doc/container/flat_set/swap>) | troca o conteúdo
(função membro pública)