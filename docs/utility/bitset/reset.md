# std::bitset&lt;N&gt;::reset

bitset& reset(); | (1) | (noexcept desde C++11)
(constexpr desde C++23)
bitset& reset( [std::size_t](<#/doc/types/size_t>) pos ); | (2) | (constexpr desde C++23)

Define bits como false.

1) Define todos os bits como false
2) Define o bit na posição pos como false.

### Parâmetros

- **pos** — a posição do bit a ser definido

### Valor de retorno

*this

### Exceções

2) Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos não corresponder a uma posição de bit válida.

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
     
    int main()
    {
        std::bitset<8> b(42);
        std::cout << "Bitset is         " << b << '\n';
        b.reset(1);
        std::cout << "After b.reset(1): " << b << '\n';
        b.reset();
        std::cout << "After b.reset():  " << b << '\n';
    }
```

Saída:
```
    Bitset is         00101010
    After b.reset(1): 00101000
    After b.reset():  00000000
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98 | o comportamento era indefinido se pos não correspondesse a uma posição de bit válida | sempre lança uma exceção neste caso

### Veja também

[ set](<#/doc/utility/bitset/set>) | define bits como true ou um valor dado
(função membro pública)
[ flip](<#/doc/utility/bitset/flip>) | inverte os valores dos bits
(função membro pública)