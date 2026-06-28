# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::end, std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::cend

```cpp
iterator end() noexcept;  // (1) (desde C++11)
const_iterator end() const noexcept;  // (2) (desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o elemento que segue o último elemento do `unordered_set`.

Este elemento atua como um placeholder; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

Como tanto `iterator` quanto `const_iterator` são iterators constantes (e podem, de fato, ser do mesmo tipo), não é possível modificar os elementos do container através de um iterator retornado por qualquer uma dessas funções membro.

### Exemplo

Execute este código
```cpp
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

[ begincbegin](<#/doc/container/unordered_set/begin>) | retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array   
(modelo de função)