# std::swap(std::inplace_vector)

Definido no cabeçalho `[<inplace_vector>](<#/doc/header/inplace_vector>)`

```c
constexpr friend void swap( std::inplace_vector& lhs,
std::inplace_vector& rhs ) noexcept(/* see below */);
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para std::inplace_vector. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Linear no tamanho dos contêineres.

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept(N == 0
([std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)&lt;T&gt; && [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)&lt;T&gt;))

### Exemplo

Run this code
```cpp
    #include <algorithm>
    #include <iostream>
    #include <inplace_vector>
    
    int main()
    {
        std::inplace_vector<int, 4> alice{1, 2, 3};
        std::inplace_vector<int, 4> bob{7, 8, 9, 10};
    
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

[ swap](<#/doc/container/inplace_vector/swap>) | troca o conteúdo
(função membro pública)