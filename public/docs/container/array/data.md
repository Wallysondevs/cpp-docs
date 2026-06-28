# std::array&lt;T,N&gt;::data

```cpp
T* data() noexcept;  // (1) (desde C++11)
(constexpr desde C++17)
const T* data() const noexcept;  // (2) (desde C++11)
(constexpr desde C++17)
```

Retorna um ponteiro para o array subjacente que serve como armazenamento de elementos. O ponteiro é tal que o range `[`data()`, `data() +` `[size()](<#/doc/container/array/size>)`)` é sempre um [range válido](<#/doc/iterator>), mesmo que o container esteja vazio (`data()` não é desreferenciável nesse caso).

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para o armazenamento de elementos subjacente. Para containers não vazios, o ponteiro retornado compara-se igual ao endereço do primeiro elemento.

### Complexidade

Constante.

### Notas

Se [size()](<#/doc/container/array/size>) for ​0​, `data()` pode ou não retornar um ponteiro nulo.

### Exemplo

Execute este código
```cpp
    #include <cstddef>
    #include <iostream>
    #include <span>
    #include <array>
    
    void pointer_func(const int* p, std::size_t size)
    {
        std::cout << "data = ";
        for (std::size_t i = 0; i < size; ++i)
            std::cout << p[i] << ' ';
        std::cout << '\n';
    }
    
    void span_func(std::span<const int> data) // since C++20
    {
        std::cout << "data = ";
        for (const int e : data)
            std::cout << e << ' ';
        std::cout << '\n';
    }
    
    int main()
    {
        std::array<int, 4> container{1, 2, 3, 4};
    
        // Prefer container.data() over &container[0]
        pointer_func(container.data(), container.size());
    
        // std::span is a safer alternative to separated pointer/size.
        span_func({container.data(), container.size()});
    }
```

Output:
```
    data = 1 2 3 4
    data = 1 2 3 4
```

### Ver também

[ front](<#/doc/container/array/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/array/back>) | acessa o último elemento
(função membro pública)
[ size](<#/doc/container/array/size>) | retorna o número de elementos
(função membro pública)
[ operator[]](<#/doc/container/array/operator_at>) | acessa o elemento especificado
(função membro pública)
[ span](<#/doc/container/span>)(C++20) | uma view não proprietária sobre uma sequência contígua de objetos
(template de classe)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(template de função)