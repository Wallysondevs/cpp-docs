# std::random_device

Definido no header `[<random>](<#/doc/header/random>)`

```cpp
class random_device;  // (desde C++11)
```

`std::random_device` é um gerador de números aleatórios inteiros com distribuição uniforme que produz números aleatórios não determinísticos.

`std::random_device` pode ser implementado em termos de um motor de números pseudoaleatórios definido pela implementação se uma fonte não determinística (por exemplo, um dispositivo de hardware) não estiver disponível para a implementação. Neste caso, cada objeto [`std::random_device`](<#/doc/numeric/random/random_device>) pode gerar a mesma sequência de números.

### Tipos Membro

Tipo Membro | Definição
---|---
`result_type` (C++11) | unsigned int

### Funções Membro

##### Construção

---
[ (construtor)](<#/doc/numeric/random/random_device/random_device>) | constrói o motor
(função membro pública)
operator=(deleted) (C++11) | o operador de atribuição é deletado
(função membro pública)

##### Geração

[ operator()](<#/>) | avança o estado do motor e retorna o valor gerado
(função membro pública)

##### Características

[ entropy](<#/doc/numeric/random/random_device/entropy>)(C++11) | obtém a estimativa de entropia para o gerador de números aleatórios não determinístico
(função membro pública)
[ min](<#/doc/numeric/random/random_device/min>)[static] | obtém o menor valor possível no range de saída
(função membro estática pública)
[ max](<#/doc/numeric/random/random_device/max>)[static] | obtém o maior valor possível no range de saída
(função membro estática pública)

### Notas

Uma implementação notável onde [`std::random_device`](<#/doc/numeric/random/random_device>) é determinístico em versões antigas do MinGW-w64 ([bug 338](<https://sourceforge.net/p/mingw-w64/bugs/338/>), corrigido desde o GCC 9.2). As versões mais recentes do MinGW-w64 podem ser baixadas de [GCC com o modelo de thread MCF](<https://gcc-mcf.lhmouse.com/>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <map>
    #include <random>
    #include <string>
    
    int main()
    {
        std::random_device rd;
        std::map<int, int> hist;
        std::uniform_int_distribution<int> dist(0, 9);
    
        for (int n = 0; n != 20000; ++n)
            ++hist[dist(rd)]; // nota: apenas para demonstração: o desempenho de muitas
                              // implementações de random_device degrada acentuadamente
                              // uma vez que o pool de entropia se esgota. Para uso prático,
                              // random_device é geralmente usado apenas para semear
                              // um PRNG como mt19937
    
        for (auto [x, y] : hist)
            std::cout << x << " : " << std::string(y / 100, '*') << '\n';
    }
```

Saída possível:
```
    0 : ********************
    1 : *******************
    2 : ********************
    3 : ********************
    4 : ********************
    5 : *******************
    6 : ********************
    7 : ********************
    8 : *******************
    9 : ********************
```