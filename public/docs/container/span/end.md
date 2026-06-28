# std::span&lt;T,Extent&gt;::end, std::span&lt;T,Extent&gt;::cend

```cpp
constexpr iterator end() const noexcept;  // (1) (desde C++20)
constexpr const_iterator cend() const noexcept;  // (2) (desde C++23)
```

Retorna um iterator para o elemento que segue o último elemento do `span`.

Este elemento atua como um marcador de posição; tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Exemplo

Run this code
```
    #include <iostream>
    #include <span>
     
    void print(std::span<const int> array)
    {
        std::cout << "array = ";
        for (auto it = array.begin(); it != array.end(); ++it)
            std::cout << *it << ' ';
        std::cout << '\n';
    }
     
    void set_first_element(std::span<int> sp, int new_value)
    {
        if (!sp.empty())
        {
            std::cout << "old *begin = " << *sp.begin() << '\n';
            *sp.begin() = new_value;
            std::cout << "new *begin = " << *sp.begin() << '\n';
        }
    }
     
    int main()
    {
        int array[]{1, 3, 4, 5};
        print(array);
        set_first_element(array, 2);
        print(array);
    }
```

Output:
```
    array = 1 3 4 5
    old *begin = 1
    new *begin = 2
    array = 2 3 4 5
```

### Veja também

[ begincbegin](<#/doc/container/span/begin>)(C++23) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/iterator/end>)(C++11)(C++14) | retorna um iterator para o fim de um container ou array
(modelo de função)