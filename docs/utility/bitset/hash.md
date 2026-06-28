# std::hash&lt;std::bitset&gt;

Definido no cabeçalho `[<bitset>](<#/doc/header/bitset>)`

```c
template< std::size_t N >
struct hash<std::bitset<N>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::bitset](<#/doc/utility/bitset>)&lt;N&gt; permite aos usuários obter hashes de objetos do tipo [std::bitset](<#/doc/utility/bitset>)&lt;N&gt;.

### Exemplo

O código a seguir mostra uma possível saída de uma função hash usada em vários bitsets:

Execute este código
```
    #include <bitset>
    #include <functional>
    #include <iostream>
     
    int main()
    {
        std::bitset<4> b1{0}, b2{42};
        std::bitset<8> b3{0}, b4{42};
     
        std::hash<std::bitset<4>> hash_fn4;
        std::hash<std::bitset<8>> hash_fn8;
        using bin64 = std::bitset<64>;
     
        std::cout << std::hex
                  << bin64{hash_fn4(b1)} << " = " << hash_fn4(b1) << '\n'
                  << bin64{hash_fn4(b2)} << " = " << hash_fn4(b2) << '\n'
                  << bin64{hash_fn8(b3)} << " = " << hash_fn8(b3) << '\n'
                  << bin64{hash_fn8(b4)} << " = " << hash_fn8(b4) << '\n';
    }
```

Saída possível:
```
    0110110100001001111011100010011011010101100001100011011000011001 = 6d09ee26d5863619
    1111111101011100010110100000111000111110100000111011100011110000 = ff5c5a0e3e83b8f0
    0110110100001001111011100010011011010101100001100011011000011001 = 6d09ee26d5863619
    0101110000011100011110011010111011100110010000110100110001001101 = 5c1c79aee6434c4d
```

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(template de classe)