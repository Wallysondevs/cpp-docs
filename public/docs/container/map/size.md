# std::map&lt;Key,T,Compare,Allocator&gt;::size

size_type size() const; |  |  (noexcept desde C++11)  

  
Retorna o número de elementos no container, isto é, [std::distance](<#/doc/iterator/distance>)(begin(), end()). 

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
    #include <map>
     
    int main()
    {
        std::map<int, char> nums{{1, 'a'}, {1, 'b'}, {2, 'c'}, {2, 'd'}};
        assert(nums.size() == 2); 
    }
```

### Veja também

[ empty](<#/doc/container/map/empty>) |  verifica se o container está vazio   
(função membro pública)  
[ max_size](<#/doc/container/map/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)