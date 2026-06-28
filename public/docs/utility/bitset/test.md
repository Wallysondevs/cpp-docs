# std::bitset&lt;N&gt;::test

bool test( [std::size_t](<#/doc/types/size_t>) pos ) const; |  | (constexpr desde C++23)  

  
Retorna o valor do bit na posição pos (contando a partir de 0). 

Ao contrário de [operator[]](<#/doc/utility/bitset/operator_at>), ele realiza uma verificação de limites. 

### Parâmetros

pos  |  \-  |  posição do bit a ser retornado (contando a partir de 0)   
  
### Valor de retorno

true se o bit solicitado estiver definido, false caso contrário. 

### Exceções

Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos não corresponder a uma posição de bit válida. 

### Exemplo

Execute este código
```
    #include <bit>
    #include <bitset>
    #include <cassert>
    #include <iostream>
    #include <stdexcept>
     
    int main()
    {
        std::bitset<10> b1("1111010000");
     
        std::size_t idx = 0;
        while (idx < b1.size() && !b1.test(idx))
            ++idx;
     
        assert(static_cast<int>(idx) == std::countr_zero(b1.to_ulong()));
     
        if (idx < b1.size())
            std::cout << "The first set bit is at index " << idx << '\n';
        else
            std::cout << "no set bits\n";
     
        try
        {
            std::bitset<0B10'1001'1010> bad;
            if (bad.test(bad.size()))
                std::cout << "Expect unexpected!\n";
        }
        catch (std::out_of_range const& ex)
        {
            std::cout << "Exception: " << ex.what() << '\n';
        }
    }
```

Saída possível: 
```
    The first set bit is at index 4
    Exception: bitset::test: __position (which is 666) >= _Nb (which is 666)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2250](<https://cplusplus.github.io/LWG/issue2250>) | C++98  | o comportamento era indefinido se pos não correspondesse a uma posição de bit válida  | sempre lança uma exceção neste caso   
  
### Veja também

[ operator[]](<#/doc/utility/bitset/operator_at>) |  acessa um bit específico   
(função membro pública)  
[ popcount](<#/doc/numeric/popcount>)(C++20) |  conta o número de bits 1 em um inteiro sem sinal   
(modelo de função)  
[ has_single_bit](<#/doc/numeric/has_single_bit>)(C++20) |  verifica se um número é uma potência integral de 2   
(modelo de função)