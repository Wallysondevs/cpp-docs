# std::list&lt;T,Allocator&gt;::size

```cpp
size_type size() const; |  |  (ate C++11)
size_type size() const noexcept;  // (desde C++11)
```

  
Retorna o número de elementos no container, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no container. 

### Complexidade

Constante ou linear. | (ate C++11)  
---|---
Constante. | (desde C++11)  
  
### Exemplo

O código a seguir usa `size` para exibir o número de elementos em uma [std::list](<#/doc/container/list>):

Execute este código
```
    #include <iostream>
    #include <list>
     
    int main()
    { 
        std::list<int> nums{1, 3, 5, 7};
     
        std::cout << "nums contains " << nums.size() << " elements.\n";
    }
```

Saída: 
```
    nums contains 4 elements.
```

### Veja também

[ empty](<#/doc/container/list/empty>) |  verifica se o container está vazio   
(função membro pública)  
[ max_size](<#/doc/container/list/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)  
[ resize](<#/doc/container/list/resize>) |  altera o número de elementos armazenados   
(função membro pública)