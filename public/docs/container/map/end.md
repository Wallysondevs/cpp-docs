# std::map&lt;Key,T,Compare,Allocator&gt;::end, std::map&lt;Key,T,Compare,Allocator&gt;::cend

```cpp
iterator end(); | (1) | (noexcept desde C++11)
const_iterator end() const; | (2) | (noexcept desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o elemento que segue o último elemento do `map`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

libc++ faz o backport de `cend()` para o modo C++98.

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <map>
    
    int main()
    {
        std::map<int, float> num_map;
        num_map[4] = 4.13;
        num_map[9] = 9.24;
        num_map[1] = 1.09;
        // Calls num_map.begin() and num_map.end()
        for (auto it = num_map.begin(); it != num_map.end(); ++it)
            std::cout << it->first << ", " << it->second << '\n';
    }
```

Saída:
```
    1, 1.09
    4, 4.13
    9, 9.24
```

#### Exemplo usando uma função de comparação personalizada

Run this code
```cpp
    #include <cmath>
    #include <iostream>
    #include <map>
    
    struct Point { double x, y; };
    
    // Compara as coordenadas x de dois ponteiros Point.
    struct PointCmp
    {
        bool operator()(const Point* lhs, const Point* rhs) const
        {
            return lhs->x < rhs->x; 
        }
    };
    
    int main()
    {
        // Note que, embora as coordenadas x estejam fora de ordem, o
        // map será iterado por coordenadas x crescentes.
        Point points[3] = {{2, 0}, {1, 0}, {3, 0}};
    
        // mag é um map que envia o endereço do nó para sua magnitude no plano x-y.
        // Embora as chaves sejam ponteiros para Point, queremos ordenar o map pelas
        // coordenadas x dos pontos e NÃO pelos endereços dos Points. Isso
        // é feito usando o método de comparação da classe PointCmp.
        std::map<Point*, double, PointCmp> mag(
            {{points, 2}, {points + 1, 1}, {points + 2, 3}}
        );
    
        // Altera cada coordenada y de 0 para a magnitude.
        for (auto iter = mag.begin(); iter != mag.end(); ++iter)
        {
            auto cur = iter->first; // Ponteiro para Node
            cur->y = mag[cur]; // Poderia também ter usado cur->y = iter->second;
        }
    
        // Atualiza e imprime a magnitude de cada nó.
        for (auto iter = mag.begin(); iter != mag.end(); ++iter)
        {
            auto cur = iter->first;
            mag[cur] = std::hypot(cur->x, cur->y);
            std::cout << "The magnitude of (" << cur->x << ", " << cur->y << ") is ";
            std::cout << iter->second << '\n';
        }
    
        // Repete o acima com o loop for baseado em range.
        for (auto i : mag)
        {
            auto cur = i.first;
            cur->y = i.second;
            mag[cur] = std::hypot(cur->x, cur->y);
            std::cout << "The magnitude of (" << cur->x << ", " << cur->y << ") is ";
            std::cout << mag[cur] << '\n';
            // Note que, em contraste com std::cout << iter->second << '\n'; acima, 
            // std::cout << i.second << '\n'; NÃO imprimirá a magnitude atualizada.
            // Se auto &i : mag fosse usado em vez disso, ele imprimiria a magnitude atualizada.
        }
    }
```

Saída:
```
    The magnitude of (1, 1) is 1.41421
    The magnitude of (2, 2) is 2.82843
    The magnitude of (3, 3) is 4.24264
    The magnitude of (1, 1.41421) is 1.73205
    The magnitude of (2, 2.82843) is 3.4641
    The magnitude of (3, 4.24264) is 5.19615
```

### Veja também

[ begincbegin](<#/doc/container/map/begin>)(desde C++11) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(desde C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)