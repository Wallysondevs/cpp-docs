# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::size

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
    #include <unordered_set>
    
    int main()
    {
        std::unordered_set<int> nums{4, 2, 4, 2};
        assert(nums.size() == 2);
    }
```

### Veja também

[ empty](<#/doc/container/unordered_set/empty>) | verifica se o container está vazio
(public member function)
[ max_size](<#/doc/container/unordered_set/max_size>) | retorna o número máximo possível de elementos
(public member function)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(function template)