# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::begin, std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::cbegin

```cpp
iterator begin() noexcept;  // (1) (desde C++11)
const_iterator begin() const noexcept;  // (2) (desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o primeiro elemento do `unordered_set`. 

Se o `unordered_set` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/unordered_set/end>). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível mutar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro. 

### Exemplo

Executar este código
```
    #include <iostream>
    #include <unordered_set>
     
    struct Point { double x, y; };
     
    int main()
    {
        Point pts[3] = {{1, 0}, {2, 0}, {3, 0}};
     
        // points is a set containing the addresses of points
        std::unordered_set<Point*> points = { pts, pts + 1, pts + 2 };
     
        // Change each y-coordinate of (i, 0) from 0 into i^2 and print the point
        for (auto iter = points.begin(); iter != points.end(); ++iter)
        {
            (*iter)->y = ((*iter)->x) * ((*iter)->x); // iter is a pointer-to-Point*
            std::cout << "(" << (*iter)->x << ", " << (*iter)->y << ") ";
        }
        std::cout << '\n';
     
        // Now using the range-based for loop, we increase each y-coordinate by 10
        for (Point* i : points)
        {
            i->y += 10;
            std::cout << "(" << i->x << ", " << i->y << ") ";
        }
    }
```

Saída possível: 
```
    (3, 9) (1, 1) (2, 4) 
    (3, 19) (1, 11) (2, 14)
```

### Veja também

[ endcend](<#/doc/container/unordered_set/end>) | retorna um iterator para o fim   
(função membro pública)  
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array   
(modelo de função)