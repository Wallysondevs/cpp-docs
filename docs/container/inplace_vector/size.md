# std::inplace_vector&lt;T,N&gt;::size

```cpp
constexpr size_type size() const;  // (desde C++26)
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
```cpp
    #include <cassert>
    #include <inplace_vector>
    
    int main()
    {
        std::inplace_vector<int, 4> nums;
        assert(nums.size() == 0);
        nums = {1, 2, 3, 4};
        assert(nums.size() == 4);
    }
```

### Veja também

[ capacity](<#/doc/container/inplace_vector/capacity>)[static] | retorna o número de elementos que podem ser armazenados no espaço alocado atualmente
(função membro estática pública)
[ empty](<#/doc/container/inplace_vector/empty>) | verifica se o container está vazio
(função membro pública)
[ max_size](<#/doc/container/inplace_vector/max_size>)[static] | retorna o número máximo possível de elementos
(função membro estática pública)
[ resize](<#/doc/container/inplace_vector/resize>) | altera o número de elementos armazenados
(função membro pública)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)