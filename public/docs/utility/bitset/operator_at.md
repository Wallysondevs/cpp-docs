# std::bitset&lt;N&gt;::operator[]

bool operator[]( [std::size_t](<#/doc/types/size_t>) pos ) const; | (1) | (constexpr desde C++11)
---|---|---
reference operator[]( [std::size_t](<#/doc/types/size_t>) pos ); | (2) | (constexpr desde C++23)

Acessa o bit na posição pos. A primeira versão retorna o valor do bit, a segunda versão retorna um objeto do tipo [std::bitset::reference](<#/doc/utility/bitset/reference>) que permite a modificação do valor.

Ao contrário de [test()](<#/doc/utility/bitset/test>), não lança exceções: o comportamento é indefinido se pos estiver fora dos limites.

### Parâmetros

- **pos** — posição do bit a ser retornado

### Valor de retorno

1) O valor do bit solicitado.

2) Um objeto do tipo [std::bitset::reference](<#/doc/utility/bitset/reference>), que permite a escrita no bit solicitado.

### Exceções

(nenhuma)

### Exemplo

Execute este código
```
    #include <bitset>
    #include <cstddef>
    #include <iostream>
    
    int main()
    {
        std::bitset<8> b1{0b00101010}; // binary literal for 42
    
        for (std::size_t i = 0; i < b1.size(); ++i)
            std::cout << "b1[" << i << "]: " << b1[i] << '\n';
        b1[0] = true; // modifies the first bit through bitset::reference
    
        std::cout << "After setting bit 0, b1 holds " << b1 << '\n';
    }
```

Saída:
```
    b1[0]: 0
    b1[1]: 1
    b1[2]: 0
    b1[3]: 1
    b1[4]: 0
    b1[5]: 1
    b1[6]: 0
    b1[7]: 0
    After setting bit 0, b1 holds 00101011
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 11](<https://cplusplus.github.io/LWG/issue11>) | C++98 | 1. a descrição estava faltando no padrão C++
2. havia apenas a sobrecarga não-const | 1. descrição adicionada
2. adicionada a sobrecarga const
[LWG 907](<https://cplusplus.github.io/LWG/issue907>) | C++98 | o comportamento de leitura do bit em pos era equivalente
ao de [`test(pos)`](<#/doc/utility/bitset/test>), mas `test()` pode lançar exceções | evita mencionar `test()`

### Veja também

[ test](<#/doc/utility/bitset/test>) | acessa bit específico
(função membro pública)