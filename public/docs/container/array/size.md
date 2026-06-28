# std::array&lt;T,N&gt;::size

```cpp
constexpr size_type size() const noexcept;  // (desde C++11)
```

Retorna o número de elementos no container, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()).

### Parâmetros

(nenhum)

### Valor de retorno

O número de elementos no container.

### Complexidade

Constante.

### Exemplo

O código a seguir usa `size` para exibir o número de elementos em um [std::array](<#/doc/container/array>):

Execute este código
```
    #include <array>
    #include <iostream>
    
    int main()
    {
        std::array<int, 4> nums{1, 3, 5, 7};
    
        std::cout << "nums contains " << nums.size() << " elements.\n";
    }
```

Saída:
```
    nums contains 4 elements.
```

### Veja também

[ empty](<#/doc/container/array/empty>) | verifica se o container está vazio
(função membro pública)
[ max_size](<#/doc/container/array/max_size>) | retorna o número máximo possível de elementos
(função membro pública)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(modelo de função)