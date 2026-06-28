# std::array&lt;T,N&gt;::rend, std::array&lt;T,N&gt;::crend

```cpp
reverse_iterator rend() noexcept;  // (1) (desde C++11)
(constexpr desde C++17)
const_reverse_iterator rend() const noexcept;  // (2) (desde C++11)
(constexpr desde C++17)
const_reverse_iterator crend() const noexcept;  // (3) (desde C++11)
(constexpr desde C++17)
```

  
Retorna um reverse iterator para o elemento que segue o último elemento do `array` invertido. Ele corresponde ao elemento que precede o primeiro elemento do `array` não invertido. Este elemento atua como um marcador de posição (placeholder), e tentar acessá-lo resulta em comportamento indefinido. 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o elemento que segue o último elemento. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <iostream>
    #include <array>
     
    int main()
    {
        std::array<int, 11> a{1, 11, 11, 35, 0, 12, 79, 76, 76, 69, 40};
     
        // Print elements of container in reverse order using const_reverse_iterator's.
        std::for_each(a.crbegin(), a.crend(), { std::cout << e << ' '; });
        std::cout << '\n';
     
        // Modify each element of container using non-const reverse_iterator's.
        std::for_each(a.rbegin(), a.rend(), { e += 32; });
     
        // Print elements as chars in reverse order using const_reverse_iterator's.
        std::for_each(a.crbegin(), a.crend(), { std::cout << e; });
        std::cout << '\n';
    }
```

Saída: 
```
    40 69 76 76 79 12 0 35 11 11 1
    Hello, C++!
```

### Veja também

[ rbegincrbegin](<#/doc/container/array/rbegin>) | retorna um reverse iterator para o início   
(função membro pública)  
[ rendcrend](<#/doc/iterator/rend>)(C++14) | retorna um reverse end iterator para um container ou array   
(template de função)