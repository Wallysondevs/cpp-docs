# std::flat_multimap&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++23)
```

  
Retorna o número de elementos no adaptador de container. Equivalente a: return` `[` _c_`](<#/doc/container/flat_multimap>).keys.size(). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos no adaptador de container. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <flat_map>
     
    int main()
    {
        std::flat_multimap<int, char> nums{{1, 'a'}, {1, 'b'}, {2, 'c'}, {2, 'd'}};
        assert(nums.size() == 4); 
    }
```

### Veja também

[ empty](<#/doc/container/flat_multimap/empty>) |  verifica se o adaptador de container está vazio   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)  
[ max_size](<#/doc/container/flat_multimap/max_size>) |  retorna o número máximo possível de elementos   
(função membro pública)