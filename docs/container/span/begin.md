# std::span&lt;T,Extent&gt;::begin, std::span&lt;T,Extent&gt;::cbegin

```cpp
constexpr iterator begin() const noexcept;  // (1) (desde C++20)
constexpr const_iterator cbegin() const noexcept;  // (2) (desde C++23)
```

Retorna um iterator para o primeiro elemento do `span`.

Se o `span` estiver vazio, o iterator retornado será igual a end().

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
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

Saída:
```
    array = 1 3 4 5
    old *begin = 1
    new *begin = 2
    array = 2 3 4 5
```

### Veja também

[ endcend](<#/doc/container/span/end>)(C++23) | retorna um iterator para o final
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(C++11)(C++14) | retorna um iterator para o início de um container ou array
(modelo de função)