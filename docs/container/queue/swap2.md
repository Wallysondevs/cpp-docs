# std::swap(std::queue)

Definido no cabeçalho `[<queue>](<#/doc/header/queue>)`

```c
template< class T, class Container >
void swap( std::queue<T, Container>& lhs,
std::queue<T, Container>& rhs );
(até C++17)
template< class T, class Container >
void swap( std::queue<T, Container>& lhs,
std::queue<T, Container>& rhs )
noexcept(/* see below */);
Especializa o algoritmo std::swap para std::queue. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs). Esta sobrecarga participa da resolução de sobrecarga apenas se std::is_swappable_v<Container> for true.
```

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo será trocado

### Valor de retorno

(nenhum)

### Complexidade

Mesma complexidade que a troca dos contêineres subjacentes.

### Exceções

```cpp
Especificação `noexcept`: `noexcept(noexcept(lhs.swap(rhs)))`  // (desde C++17)
```

### Notas

Embora as sobrecargas de [std::swap](<#/doc/utility/swap>) para adaptadores de contêiner tenham sido introduzidas no C++11, adaptadores de contêiner já podiam ser trocados por [std::swap](<#/doc/utility/swap>) no C++98. Tais chamadas a [std::swap](<#/doc/utility/swap>) geralmente têm complexidade de tempo linear, mas uma complexidade melhor pode ser fornecida.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <queue>
    
    int main()
    {
        std::queue<int> alice;
        std::queue<int> bob;
    
        auto print = 
        {
            std::cout << title << " size=" << cont.size();
            std::cout << " front=" << cont.front();
            std::cout << " back=" << cont.back() << '\n';
        };
    
        for (int i = 1; i < 4; ++i)
            alice.push(i);
        for (int i = 7; i < 11; ++i)
            bob.push(i);
    
        // Print state before swap
        print("Alice:", alice);
        print("Bobby:", bob);
    
        std::cout << "-- SWAP\n";
        std::swap(alice, bob);
    
        // Print state after swap
        print("Alice:", alice);
        print("Bobby:", bob);
    }
```

Saída:
```
    Alice: size=3 front=1 back=3
    Bobby: size=4 front=7 back=10
    -- SWAP
    Alice: size=4 front=7 back=10
    Bobby: size=3 front=1 back=3
```

### Veja também

[ swap](<#/doc/container/queue/swap>)(C++11) | troca o conteúdo
(função membro pública)