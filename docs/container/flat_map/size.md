# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++23)
```

Retorna o número de elementos no adaptador de container. Equivalente a: `return` `[` _c_`](<#/doc/container/flat_map>).keys.size().

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos no adaptador de container.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <flat_map>
    
    int main()
    {
        std::flat_map<int, char> nums{{1, 'a'}, {1, 'b'}, {2, 'c'}, {2, 'd'}};
        assert(nums.size() == 2); 
    }
```

### Veja também

[ empty](<#/doc/container/flat_map/empty>) | verifica se o adaptador de container está vazio
(função membro pública)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)
[ max_size](<#/doc/container/flat_map/max_size>) | retorna o número máximo possível de elementos
(função membro pública)