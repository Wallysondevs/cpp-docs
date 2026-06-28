# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::end, std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++11)
const_iterator end() const noexcept;  // (2) (desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o elemento que segue o último elemento do `unordered_map`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <iostream>
    #include <unordered_map>
    
    struct Node { double x, y; };
    
    int main()
    {
        Node nodes[3] = {{1, 0}, {2, 0}, {3, 0}};
    
        // mag é um map que mapeia o endereço de um Node para sua magnitude no plano
        std::unordered_map<Node*, double> mag =
        {
            { nodes + 0, 1 },
            { nodes + 1, 2 },
            { nodes + 2, 3 }
        };
    
        // Altera cada coordenada y de 0 para a magnitude
        for (auto iter = mag.begin(); iter != mag.end(); ++iter)
        {
            auto cur = iter->first; // ponteiro para Node
            cur->y = mag[cur]; // também poderia ter usado cur->y = iter->second;
        }
    
        // Atualiza e imprime a magnitude de cada nó
        for (auto iter = mag.begin(); iter != mag.end(); ++iter)
        {
            auto cur = iter->first;
            mag[cur] = std::hypot(cur->x, cur->y);
            std::cout << "The magnitude of (" << cur->x << ", " << cur->y << ") is ";
            std::cout << iter->second << '\n';
        }
    
        // Repete o acima com o loop for baseado em range
        for (auto i : mag)
        {
            auto cur = i.first;
            cur->y = i.second;
            mag[cur] = std::hypot(cur->x, cur->y);
            std::cout << "The magnitude of (" << cur->x << ", " << cur->y << ") is ";
            std::cout << mag[cur] << '\n';
            // Note que, em contraste com std::cout << iter->second << '\n'; acima,
            // std::cout << i.second << '\n'; NÃO imprimirá a magnitude atualizada
        }
    }
```

Saída possível:
```
    The magnitude of (3, 3) is 4.24264
    The magnitude of (1, 1) is 1.41421
    The magnitude of (2, 2) is 2.82843
    The magnitude of (3, 4.24264) is 5.19615
    The magnitude of (1, 1.41421) is 1.73205
    The magnitude of (2, 2.82843) is 3.4641
```

### Veja também

[ begincbegin](<#/doc/container/unordered_map/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(template de função)