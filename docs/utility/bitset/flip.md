# std::bitset&lt;N&gt;::flip

bitset& flip(); | (1) | (noexcept desde C++11)
(constexpr desde C++23)
bitset& flip( [std::size_t](<#/doc/types/size_t>) pos ); | (2) | (constexpr desde C++23)

Inverte os bits, ou seja, muda valores verdadeiros para falso e valores falsos para verdadeiro. Equivalente a uma operação NOT lógica em parte ou em todo o bitset.

1) Inverte todos os bits (como [operator~](<#/doc/utility/bitset/operator_logic>), mas in-place).

2) Inverte o bit na posição pos.

### Parâmetros

- **pos** — a posição do bit a ser invertido

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
        std::bitset<4> flops;
     
        std::cout << flops << '\n'
                  << flops.flip(0) << '\n'
                  << flops.flip(2) << '\n'
                  << flops.flip() << '\n';
    }
```

Saída:
```
    0000
    0001
    0101
    1010
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98 | o comportamento era indefinido se pos não correspondesse a uma posição de bit válida | sempre lança uma exceção neste caso

### Veja também

[ set](<#/doc/utility/bitset/set>) | define bits como verdadeiro ou um valor dado
(função membro pública)
[ reset](<#/doc/utility/bitset/reset>) | define bits como falso
(função membro pública)
[ operator&=operator|=operator^=operator~](<#/doc/utility/bitset/operator_logic>) | executa AND, OR, XOR e NOT binários
(função membro pública)
[ flip](<#/doc/container/vector_bool/flip>) | inverte todos os bits
(função membro pública de `std::vector<bool,Allocator>`)