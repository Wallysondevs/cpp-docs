# operator&amp;,|,^(std::bitset)

Definido no cabeçalho `[<bitset>](<#/doc/header/bitset>)`

```c
template< std::size_t N >
std::bitset<N> operator&( const std::bitset<N>& lhs,
const std::bitset<N>& rhs );
(constexpr desde C++23)
template< std::size_t N >
std::bitset<N> operator
const std::bitset<N>& rhs );
(constexpr desde C++23)
template< std::size_t N >
std::bitset<N> operator^( const std::bitset<N>& lhs,
const std::bitset<N>& rhs );
(constexpr desde C++23)
```

Realiza as operações AND, OR e XOR binárias entre dois bitsets, lhs e rhs.

1) Retorna um [std::bitset](<#/doc/utility/bitset>)&lt;N&gt; contendo o resultado da operação AND binária nos pares de bits correspondentes de lhs e rhs.

2) Retorna um [std::bitset](<#/doc/utility/bitset>)&lt;N&gt; contendo o resultado da operação OR binária nos pares de bits correspondentes de lhs e rhs.

3) Retorna um [std::bitset](<#/doc/utility/bitset>)&lt;N&gt; contendo o resultado da operação XOR binária nos pares de bits correspondentes de lhs e rhs.

### Parâmetros

- **lhs** — o bitset no lado esquerdo do operador
- **rhs** — o bitset no lado direito do operador

### Valor de retorno

1) [std::bitset](<#/doc/utility/bitset>)&lt;N&gt;(lhs) &= rhs

2) [std::bitset](<#/doc/utility/bitset>)&lt;N&gt;(lhs) |= rhs

3) [std::bitset](<#/doc/utility/bitset>)&lt;N&gt;(lhs) ^= rhs

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
    
    int main()
    {
        std::bitset<4> b1("0110");
        std::bitset<4> b2("0011");
    
        std::cout << "b1 & b2: " << (b1 & b2) << '\n';
        std::cout << "b1 | b2: " << (b1 | b2) << '\n';
        std::cout << "b1 ^ b2: " << (b1 ^ b2) << '\n';
    }
```

Saída:
```
    b1 & b2: 0010
    b1 | b2: 0111
    b1 ^ b2: 0101
```

### Veja também

[ operator&=operator|=operator^=operator~](<#/doc/utility/bitset/operator_logic>) | realiza AND, OR, XOR e NOT binários
(função membro pública)