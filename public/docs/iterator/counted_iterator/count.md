# std::counted_iterator&lt;I&gt;::count

```cpp
constexpr std::iter_difference_t<I> count() const noexcept;  // (desde C++20)
```

  
Retorna o _comprimento_ subjacente, que é a distância até o final. 

### Parâmetros

(nenhum) 

### Valor de retorno

O _comprimento_ subjacente. 

### Exemplo

Execute este código
```
    #include <cassert>
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        constexpr static auto il = {1, 2, 3, 4, 5};
        constexpr std::counted_iterator i1{il.begin() + 1, 3};
        static_assert(i1.count() == 3);
        auto i2{i1};
        for (; std::default_sentinel != i2; ++i2)
            std::cout << "*i2: " << *i2 << ", count(): " << i2.count() << '\n';
        assert(i2.count() == 0);
    }
```

Saída: 
```
    *i2: 2, count(): 3
    *i2: 3, count(): 2
    *i2: 4, count(): 1
```

### Veja também

[ base](<#/doc/iterator/counted_iterator/base>)(C++20) | acessa o iterator subjacente   
(função membro pública)  