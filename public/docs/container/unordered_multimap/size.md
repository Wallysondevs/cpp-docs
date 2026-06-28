# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++11)
```

  
Retorna o número de elementos no container, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no container. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp 
    #include <cassert>
    #include <unordered_map>
     
    int main()
    {
        std::unordered_multimap<int, char> nums{{1, 'a'}, {1, 'b'}, {2, 'c'}, {2, 'd'}};
        assert(nums.size() == 4); 
    }
```

### Veja também

[ empty](<#/doc/container/unordered_multimap/empty>) | verifica se o container está vazio   
(função membro pública)  
[ max_size](<#/doc/container/unordered_multimap/max_size>) | retorna o número máximo possível de elementos   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array   
(modelo de função)