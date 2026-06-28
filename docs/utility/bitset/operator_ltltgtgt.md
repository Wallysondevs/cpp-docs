# std::bitset&lt;N&gt;::operator&lt;&lt;,&lt;&lt;=,&gt;&gt;,&gt;&gt;=

bitset operator<<( [std::size_t](<#/doc/types/size_t>) pos ) const; |  (1) | (noexcept desde C++11)   
(constexpr desde C++23)  
bitset& operator<<=( [std::size_t](<#/doc/types/size_t>) pos ); |  (2) | (noexcept desde C++11)   
(constexpr desde C++23)  
bitset operator>>( [std::size_t](<#/doc/types/size_t>) pos ) const; |  (3) | (noexcept desde C++11)   
(constexpr desde C++23)  
bitset& operator>>=( [std::size_t](<#/doc/types/size_t>) pos ); |  (4) | (noexcept desde C++11)   
(constexpr desde C++23)  

  
Realiza deslocamento binário à esquerda (em direção a posições de índice mais altas) e deslocamento binário à direita (em direção a posições de índice mais baixas). Zeros são deslocados para dentro, e bits que iriam para um índice fora do intervalo são descartados (ignorados).

1,2) Realiza deslocamento binário à esquerda. A versão (2) é destrutiva, ou seja, realiza o deslocamento no objeto atual.

3,4) Realiza deslocamento binário à direita. A versão (4) é destrutiva, ou seja, realiza o deslocamento no objeto atual.

### Parâmetros

pos  |  \-  |  número de posições para deslocar os bits   
  
### Valor de retorno

1,3) Novo objeto bitset contendo os bits deslocados.

2,4) *this

### Exemplo

Execute este código
```
    #include <bitset>
    #include <iostream>
     
    int main()
    {
        std::bitset<8> b{0b01110010};
        std::cout << b << " (initial value)\n";
     
        for (; b.any(); b >>= 1)
        {
            while (!b.test(0))
                b >>= 1;
            std::cout << b << '\n';
        }
     
        std::cout << b << " (final value)\n";
    }
```

Saída: 
```
    01110010 (initial value)
    00111001
    00000111
    00000011
    00000001
    00000000 (final value)
```

### Veja também

[ rotl](<#/doc/numeric/rotl>)(C++20) |  calcula o resultado da rotação bit a bit à esquerda   
(modelo de função)  
[ rotr](<#/doc/numeric/rotr>)(C++20) |  calcula o resultado da rotação bit a bit à direita   
(modelo de função)  
[ operator&=operator|=operator^=operator~](<#/doc/utility/bitset/operator_logic>) |  realiza AND, OR, XOR e NOT binários   
(função membro pública)