# std::seed_seq

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
class seed_seq;
```

  
`std::seed_seq` consome uma sequência de dados com valores inteiros e produz um número solicitado de valores inteiros sem sinal de 32 bits, com base nos dados consumidos. Os valores produzidos são distribuídos por todo o intervalo de 32 bits, mesmo que os valores consumidos sejam próximos. 

Ele fornece uma maneira de semear um grande número de engines de números aleatórios ou de semear um gerador que requer muita entropia, dada uma semente pequena ou uma sequência de sementes inicial mal distribuída. 

[`std::seed_seq`](<#/doc/numeric/random/seed_seq>) atende aos requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>). 

### Tipos aninhados

Tipo  |  Definição   
---|---
`result_type` |  [std::uint_least32_t](<#/doc/types/integer>)  
  
### Membros de dados

Membro  |  Descrição   
---|---
[std::vector](<#/doc/container/vector>)<result_type> `_v_` |  a sequência de sementes subjacente  
(objeto membro apenas para exposição*)  
  
### Funções membro

[ (construtor)](<#/doc/numeric/random/seed_seq/seed_seq>) |  constrói e semeia o objeto `std::seed_seq`   
(função membro pública)  
operator=[deleted] |  `std::seed_seq` não é atribuível   
(função membro pública)  
[ generate](<#/doc/numeric/random/seed_seq/generate>) |  calcula os valores de 32 bits uniformemente distribuídos e com viés eliminado   
(função membro pública)  
[ size](<#/doc/numeric/random/seed_seq/size>) |  obtém o número de valores de 32 bits armazenados   
(função membro pública)  
[ param](<#/doc/numeric/random/seed_seq/param>) |  copia todos os valores de 32 bits armazenados   
(função membro pública)  
  
### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <iostream>
    #include <random>
     
    int main()
    {
        std::seed_seq seq{1, 2, 3, 4, 5};
        std::vector<std::uint32_t> seeds(10);
        seq.generate(seeds.begin(), seeds.end());
        for (std::uint32_t n : seeds)
            std::cout << n << '\n';
    }
```

Saída possível: 
```
    4204997637
    4246533866
    1856049002
    1129615051
    690460811
    1075771511
    46783058
    3904109078
    1534123438
    1495905678
```