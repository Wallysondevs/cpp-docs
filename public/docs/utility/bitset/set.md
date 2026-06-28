# std::bitset&lt;N&gt;::set

bitset& set(); | (1) | (noexcept desde C++11)
(constexpr desde C++23)
bitset& set( [std::size_t](<#/doc/types/size_t>) pos, bool value = true ); | (2) | (constexpr desde C++23)

Define todos os bits como true ou define um bit para o valor especificado.

1) Define todos os bits como true.

2) Define o bit na posição pos para o valor value.

### Parâmetros

- **pos** — a posição (contando a partir de 0, ou seja, do menos significativo para o mais significativo) do bit a ser definido
- **value** — o valor para o qual o bit será definido

### Valor de retorno

*this

### Exceções

2) Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos não corresponder a uma posição de bit válida.

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <cstddef>
    #include <iostream>
    
    int main()
    {
        std::bitset<8> b;
        std::cout << b << '\n';
        std::cout << b.set() << '\n';
        std::cout << b.reset() << '\n';
    
        for (std::size_t i = 1; i < b.size(); i += 2)
            b.set(i);
    
        std::cout << b << '\n';
    }
```

Saída:
```
    00000000
    11111111
    00000000
    10101010
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 186](<https://cplusplus.github.io/LWG/issue186>) | C++98 | o tipo de value era int | corrigido para bool
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98 | o comportamento era indefinido se pos não correspondesse a uma posição de bit válida | sempre lança uma exceção neste caso

### Veja também

[ reset](<#/doc/utility/bitset/reset>) | define bits como false
(função membro pública)
[ flip](<#/doc/utility/bitset/flip>) | inverte os valores dos bits
(função membro pública)