# std::swap(std::array)

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
template< class T, std::size_t N >
void swap( std::array<T, N>& lhs,
std::array<T, N>& rhs );
(até C++17)
template< class T, std::size_t N >
void swap( std::array<T, N>& lhs,
std::array<T, N>& rhs )
noexcept(/* see below */);
(constexpr desde C++20)
Especializa o algoritmo std::swap para std::array. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs). Esta sobrecarga participa da resolução de sobrecarga somente se N == 0 ou std::is_swappable_v<T> for true.
```

### Parâmetros

- **lhs, rhs** — containers cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Linear no tamanho dos containers.

### Exceções

```cpp
Especificação `noexcept`: `noexcept(noexcept(lhs.swap(rhs)))`  // (desde C++17)
```

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <array>
    
    int main()
    {
        std::array<int, 3> alice{1, 2, 3};
        std::array<int, 3> bob{7, 8, 9};
    
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
    Bobby: 7 8 9
    -- SWAP
    Alice: 7 8 9
    Bobby: 1 2 3
```

### Veja também

[ swap](<#/doc/container/array/swap>) | troca o conteúdo
(função membro pública)