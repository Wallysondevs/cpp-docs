# std::bitset&lt;N&gt;::operator==, std::bitset&lt;N&gt;::operator!=

bool operator==( const bitset& rhs ) const; |  (1) | (noexcept desde C++11)   
(constexpr desde C++23)  
bool operator!=( const bitset& rhs ) const; |  (2) | (noexcept desde C++11)   
(ate C++20)  

  
1) Retorna true se todos os bits em *this e rhs forem iguais.

2) Retorna true se qualquer um dos bits em *this e rhs não forem iguais.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

rhs  |  \-  |  bitset para comparar   
  
### Valor de retorno

1) true se o valor de cada bit em *this for igual ao valor do bit correspondente em rhs, caso contrário false.

2) true se !(*this == rhs), caso contrário false.

### Exemplo

Compara bitsets dados para determinar se são idênticos:

Execute este código
```cpp 
    #include <bitset>
    #include <iostream>
    
    int main()
    {
        std::bitset<4> b1(0b0011);
        std::bitset<4> b2(b1);
        std::bitset<4> b3(0b0100);
    
        std::cout << std::boolalpha;
        std::cout << "b1 == b2: " << (b1 == b2) << '\n';
        std::cout << "b1 == b3: " << (b1 == b3) << '\n';
        std::cout << "b1 != b3: " << (b1 != b3) << '\n';
    
    //  b1 == std::bitset<3>{}; // compile-time error: incompatible types
    }
```

Saída: 
```
    b1 == b2: true
    b1 == b3: false
    b1 != b3: true
```