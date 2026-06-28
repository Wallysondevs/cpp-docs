# std::flat_set&lt;Key,Compare,KeyContainer&gt;::size

```cpp
size_type size() const noexcept;  // (desde C++23)
```

Retorna o número de elementos no adaptador de container. Equivalente a: return `[`c`](<#/doc/container/flat_set>).size().

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
    #include <flat_set>
    
    int main()
    {
        std::flat_set<int> nums{4, 2, 4, 2};
        assert(nums.size() == 2);
    }
```

### Veja também

[ empty](<#/doc/container/flat_set/empty>) | verifica se o adaptador de container está vazio
(função membro pública)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)
[ max_size](<#/doc/container/flat_set/max_size>) | retorna o número máximo possível de elementos
(função membro pública)