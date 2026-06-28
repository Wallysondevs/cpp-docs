# std::deque&lt;T,Allocator&gt;::size

size_type size() const; |  |  (noexcept desde C++11)  

  
Retorna o número de elementos no container, isto é, [std::distance](<#/doc/iterator/distance>)(begin(), end()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no container. 

### Complexidade

Constante. 

### Exemplo

O código a seguir usa `size` para exibir o número de elementos em um [std::deque](<#/doc/container/deque>):

Execute este código
```
    #include <deque>
    #include <iostream>
     
    int main()
    { 
        std::deque<int> nums{1, 3, 5, 7};
     
        std::cout << "nums contains " << nums.size() << " elements.\n";
    }
```

Saída: 
```
    nums contains 4 elements.
```

### Veja também

[ empty](<#/doc/container/deque/empty>) |  verifica se o container está vazio   
(função membro pública)  
[ max_size](<#/doc/container/deque/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)  
[ resize](<#/doc/container/deque/resize>) |  altera o número de elementos armazenados   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)