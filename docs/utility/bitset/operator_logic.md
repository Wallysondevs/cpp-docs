# std::bitset&lt;N&gt;::operator&amp;=,|=,^=,~

bitset& operator&=( const bitset& other ); |  (1) | (noexcept (desde C++11))   
(constexpr (desde C++23))  
bitset& operator|=( const bitset& other ); |  (2) | (noexcept (desde C++11))   
(constexpr (desde C++23))  
bitset& operator^=( const bitset& other ); |  (3) | (noexcept (desde C++11))   
(constexpr (desde C++23))  
bitset operator~() const; |  (4) | (noexcept (desde C++11))   
(constexpr (desde C++23))  

  
Realiza as operações binárias AND, OR, XOR e NOT.

1) Define os bits para o resultado da operação binária AND nos pares de bits correspondentes de *this e other.

2) Define os bits para o resultado da operação binária OR nos pares de bits correspondentes de *this e other.

3) Define os bits para o resultado da operação binária XOR nos pares de bits correspondentes de *this e other.

4) Retorna uma cópia temporária de *this com todos os bits invertidos (NOT binário).

Note que `&=`, `|=` e `^=` são definidos apenas para bitsets do mesmo tamanho `N`.

### Parâmetros

other  |  \-  |  outro bitset   
  
### Valor de retorno

1-3) *this

4) [std::bitset](<#/doc/utility/bitset>)&lt;N&gt;(*this).flip()

### Exemplo

Run this code
```cpp
    #include <bitset>
    #include <cstddef>
    #include <iostream>
    #include <string>
     
    int main()
    {
        const std::string pattern_str{"1001"};
        std::bitset<16> pattern{pattern_str}, dest;
     
        for (std::size_t i = dest.size() / pattern_str.size(); i != 0; --i)
        {
            dest <<= pattern_str.size();
            dest |= pattern;
            std::cout << dest << " (i = " << i << ")\n";
        }
     
        std::cout << ~dest << " (~dest)\n";
    }
```

Saída:
```
    0000000000001001 (i = 4)
    0000000010011001 (i = 3)
    0000100110011001 (i = 2)
    1001100110011001 (i = 1)
    0110011001100110 (~dest)
```

### Ver também

[ operator<<=operator>>=operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt>) |  realiza deslocamento binário para a esquerda e para a direita   
(função membro pública)  