# std::vector&lt;T,Allocator&gt;::size

size_type size() const; |  |  (noexcept desde C++11)  
(constexpr desde C++20)  

  
Retorna o número de elementos no container, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no container. 

### Complexidade

Constante. 

### Exemplo

O código a seguir usa `size` para exibir o número de elementos em um [std::vector](<#/doc/container/vector>)&lt;int&gt;:

Execute este código
```
    #include <cassert>
    #include <vector>
     
    int main()
    {
        std::vector<int> nums;
        assert(nums.size() == 0);
        nums = {1, 2, 3, 4};
        assert(nums.size() == 4);
    }
```

### Veja também

[ capacity](<#/doc/container/vector/capacity>) |  retorna o número de elementos que podem ser armazenados no espaço alocado atualmente   
(função membro pública)  
[ empty](<#/doc/container/vector/empty>) |  verifica se o container está vazio   
(função membro pública)  
[ max_size](<#/doc/container/vector/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)  
[ resize](<#/doc/container/vector/resize>) |  altera o número de elementos armazenados   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(template de função)