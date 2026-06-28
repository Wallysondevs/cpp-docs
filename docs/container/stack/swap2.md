# std::swap(std::stack)

Definido no cabeçalho `[<stack>](<#/doc/header/stack>)`

```c
template< class T, class Container >
void swap( std::stack<T, Container>& lhs,
std::stack<T, Container>& rhs );
(até C++17)
template< class T, class Container >
void swap( std::stack<T, Container>& lhs,
std::stack<T, Container>& rhs )
noexcept(/* veja abaixo */);
Especializa o algoritmo std::swap para std::stack. Troca o conteúdo de lhs e rhs. Chama lhs.swap(rhs). Esta sobrecarga participa da resolução de sobrecarga somente se std::is_swappable_v<Container> for true.
```

### Parâmetros

- **lhs, rhs** — contêineres cujo conteúdo deve ser trocado

### Valor de retorno

(nenhum)

### Complexidade

Mesma complexidade da troca dos contêineres subjacentes.

### Exceções

```cpp
`noexcept` especificação: noexcept(noexcept(lhs.swap(rhs)))  // (desde C++17)
```

### Observações

Embora as sobrecargas de [std::swap](<#/doc/utility/swap>) para adaptadores de contêiner tenham sido introduzidas no C++11, adaptadores de contêiner já podiam ser trocados por [std::swap](<#/doc/utility/swap>) no C++98. Tais chamadas para [std::swap](<#/doc/utility/swap>) geralmente têm complexidade de tempo linear, mas uma complexidade melhor pode ser fornecida.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <stack>
     
    int main()
    {
        std::stack<int> alice;
        std::stack<int> bob;
     
        auto print = 
        {
            std::cout << title << " size=" << cont.size();
            std::cout << " top=" << cont.top() << '\n';
        };
     
        for (int i = 1; i < 4; ++i)
            alice.push(i);
        for (int i = 7; i < 11; ++i)
            bob.push(i);
     
        // Imprime o estado antes da troca
        print("Alice:", alice);
        print("Bobby:", bob);
     
        std::cout << "-- SWAP\n";
        std::swap(alice, bob);
     
        // Imprime o estado depois da troca
        print("Alice:", alice);
        print("Bobby:", bob);
    }
```

Saída:
```
    Alice: size=3 top=3
    Bobby: size=4 top=10
    -- SWAP
    Alice: size=4 top=10
    Bobby: size=3 top=3
```

### Veja também

[ swap](<#/doc/container/stack/swap>)(C++11) | troca o conteúdo
(função membro pública)