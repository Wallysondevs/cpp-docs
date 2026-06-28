# std::multiset&lt;Key,Compare,Allocator&gt;::size

size_type size() const; |  |  (noexcept desde C++11)  

  
Retorna o número de elementos no container, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no container. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <set>
     
    int main()
    {
        std::multiset<int> nums{4, 2, 4, 2};
        assert(nums.size() == 4);
    }
```

### Veja também

[ empty](<#/doc/container/multiset/empty>) |  verifica se o container está vazio   
(função membro pública)  
[ max_size](<#/doc/container/multiset/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)