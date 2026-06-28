# std::bitset&lt;N&gt;::all, std::bitset&lt;N&gt;::any, std::bitset&lt;N&gt;::none

bool all() const; | (1) | (noexcept desde C++11)
(constexpr desde C++23)
bool any() const; | (2) | (noexcept desde C++11)
(constexpr desde C++23)
bool none() const; | (3) | (noexcept desde C++11)
(constexpr desde C++23)

1) Verifica se todos os bits estão definidos como true.

2) Verifica se algum bit está definido como true.

3) Verifica se nenhum dos bits está definido como true.

### Parâmetros

(nenhum)

### Valor de retorno

1) true se todos os bits estiverem definidos como true, caso contrário false.

2) true se algum dos bits estiver definido como true, caso contrário false.

3) true se nenhum dos bits estiver definido como true, caso contrário false.

### Exemplo

Execute este código
```
    #include <bitset>
    #include <iostream>
     
    int main()
    {
        std::bitset<4> b1("0000");
        std::bitset<4> b2("0101");
        std::bitset<4> b3("1111");
     
        std::cout
            << "bitset\t" << "all\t" << "any\t" << "none\n"
            << b1 << '\t' << b1.all() << '\t' << b1.any() << '\t' << b1.none() << '\n'
            << b2 << '\t' << b2.all() << '\t' << b2.any() << '\t' << b2.none() << '\n'
            << b3 << '\t' << b3.all() << '\t' << b3.any() << '\t' << b3.none() << '\n';
    }
```

Output:
```
    bitset  all any none
    0000    0   0   1
    0101    0   1   0
    1111    1   1   0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 693](<https://cplusplus.github.io/LWG/issue693>) | C++98 | a função membro `all()` não era fornecida | fornecida

### Veja também

[ count](<#/doc/utility/bitset/count>) | retorna o número de bits definidos como true
(função membro pública)
[ popcount](<#/doc/numeric/popcount>)(C++20) | conta o número de bits 1 em um inteiro sem sinal
(template de função)