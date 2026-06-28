# std::reverse_iterator&lt;Iter&gt;::operator[]

/* não especificado */ operator[]( difference_type n ) const; | | (constexpr desde C++17)

Retorna uma referência para o elemento na localização relativa especificada.

### Parâmetros

- **n** — posição relativa à localização atual

### Valor de retorno

`[current](<#/doc/iterator/reverse_iterator>)`[-n - 1]

### Notas

O tipo de retorno foi alterado pelo [LWG issue 386](<https://cplusplus.github.io/LWG/issue386>) para ser não especificado porque o tipo de retorno do operator[] do iterator subjacente também era não especificado na época.

No entanto, a partir de [N3066](<https://wg21.link/N3066>), o tipo de retorno do operator[] de um [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) é exigido ser conversível para referência. Em todas as implementações comuns, o tipo de retorno é declarado como referência. Veja também [LWG issue 2595](<https://cplusplus.github.io/LWG/issue2595>).

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <cstddef>
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    int main()
    {
        int a[]{0, 1, 2, 3};
        std::reverse_iterator<int*> iter1{std::rbegin(a)};
        for (std::size_t i{}; i != std::size(a); ++i)
            std::cout << iter1[i] << ' '; // decltype(iter1[i]) is int&
        std::cout << '\n';
    
        std::vector v{0, 1, 2, 3};
        std::reverse_iterator<std::vector<int>::iterator> iter2{std::rbegin(v)};
        for (std::size_t i{}; i != std::size(v); ++i)
            std::cout << iter2[i] << ' '; // decltype(iter2[i]) is int&
        std::cout << '\n';
    
        // constexpr context
        constexpr static std::array<int, 4> z{0, 1, 2, 3};
        constexpr std::reverse_iterator<decltype(z)::const_iterator> iter3{std::crbegin(z)};
        static_assert(iter3[1] == 2);
    
        std::list li{0, 1, 2, 3};
        std::reverse_iterator<std::list<int>::iterator> iter4{std::rbegin(li)};
        *iter4 = 42;   // OK
    //  iter4[0] = 13; // Compilation error: the underlying iterator
                       // does not model the random access iterator
    }
```

Saída:
```
    3 2 1 0
    3 2 1 0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 386](<https://cplusplus.github.io/LWG/issue386>) | C++98 | o tipo de retorno era `reference` | tornado não especificado

### Veja também

[ operator*operator->](<#/doc/iterator/reverse_iterator/operator_star_>) | acessa o elemento apontado
(função membro pública)