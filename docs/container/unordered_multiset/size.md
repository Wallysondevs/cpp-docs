# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++11)
```

  
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
    #include <unordered_set>
     
    int main()
    {
        std::unordered_multiset<int> nums{4, 2, 4, 2};
        assert(nums.size() == 4);
    }
```

### Veja também

[ empty](<#/doc/container/unordered_multiset/empty>) |  verifica se o container está vazio   
(função membro pública)  
[ max_size](<#/doc/container/unordered_multiset/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)