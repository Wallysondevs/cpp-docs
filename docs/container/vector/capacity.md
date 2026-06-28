# std::vector&lt;T,Allocator&gt;::capacity

size_type capacity() const; |  |  (noexcept desde C++11)  
(constexpr desde C++20)  

  
Retorna o número de elementos para os quais o container alocou espaço atualmente. 

### Parâmetros

(nenhum) 

### Valor de retorno

Capacidade do armazenamento atualmente alocado. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <vector>
     
    int main()
    {
        int sz = 100;
        std::vector<int> v;
     
        auto cap = v.capacity();
        std::cout << "Initial size: " << v.size() << ", capacity: " << cap << '\n';
     
        std::cout << "\nDemonstrate the capacity's growth policy."
                     "\nSize:  Capacity:  Ratio:\n" << std::left;
        while (sz-- > 0)
        {
            v.push_back(sz);
            if (cap != v.capacity())
            {
                std::cout << std::setw( 7) << v.size()
                          << std::setw(11) << v.capacity()
                          << std::setw(10) << v.capacity() / static_cast<float>(cap) << '\n';
                cap = v.capacity();
            }
        }
     
        std::cout << "\nFinal size: " << v.size() << ", capacity: " << v.capacity() << '\n';
    }
```

Saída possível: 
```
    Initial size: 0, capacity: 0
     
    Demonstrate the capacity's growth policy.
    Size:  Capacity:  Ratio:
    1      1          inf
    2      2          2
    3      4          2
    5      8          2
    9      16         2
    17     32         2
    33     64         2
    65     128        2
     
    Final size: 100, capacity: 128
```

### Veja também

[ size](<#/doc/container/vector/size>) |  retorna o número de elementos   
(função membro pública)  
[ reserve](<#/doc/container/vector/reserve>) |  reserva armazenamento   
(função membro pública)