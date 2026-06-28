# std::rand

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int rand();
```

Retorna um valor integral pseudoaleatório do intervalo `[`​0​`, `[RAND_MAX](<#/doc/numeric/random/RAND_MAX>)`]`.

[std::srand()](<#/doc/numeric/random/srand>) inicializa o gerador de números pseudoaleatórios usado por `rand()`. Se `rand()` for usado antes de qualquer chamada para [std::srand()](<#/doc/numeric/random/srand>), `rand()` se comporta como se tivesse sido inicializado com [std::srand](<#/doc/numeric/random/srand>)(1).

Cada vez que `rand()` é inicializado com [std::srand()](<#/doc/numeric/random/srand>), ele deve produzir a mesma sequência de valores em chamadas sucessivas.

Outras funções na standard library podem chamar `rand`. É de comportamento definido pela implementação quais funções o fazem.

É de comportamento definido pela implementação se `rand()` é thread-safe.

### Valor de retorno

Valor integral pseudoaleatório entre ​0​ e [RAND_MAX](<#/doc/numeric/random/RAND_MAX>).

### Observações

Não há garantias quanto à qualidade da sequência aleatória produzida. No passado, algumas implementações de `rand()` apresentaram sérias deficiências na aleatoriedade, distribuição e período da sequência produzida (em um exemplo bem conhecido, o bit de ordem baixa simplesmente alternava entre 1 e ​0​ entre as chamadas).

`rand()` não é recomendado para necessidades sérias de geração de números aleatórios. Recomenda-se usar as facilidades de [geração de números aleatórios](<#/doc/numeric/random>) do C++11 para substituir `rand()`. (desde C++11)

### Exemplo

A função `bounded_rand()` abaixo é uma versão adaptada de [Debiased Modulo (Once)](<https://pcg-random.org/posts/bounded-rands.html#debiased-modulo-once-javas-method>).

Execute este código
```cpp
    #include <cstdlib>
    #include <ctime>
    #include <initializer_list>
    #include <iostream>
    
    unsigned bounded_rand(unsigned range)
    {
        for (unsigned x, r;;)
            if (x = rand(), r = x % range, x - r <= -range)
                return r;
    }
    
    int main() 
    {
        std::srand(std::time({})); // use current time as seed for random generator
        const int random_value = std::rand();
        std::cout << "Random value on [0, " << RAND_MAX << "]: " << random_value << '\n';
    
        for (const unsigned sides : {2, 4, 6, 8})
        {
            std::cout << "Roll " << sides << "-sided die 8 times: ";
            for (int n = 8; n; --n)
                std::cout << 1 + bounded_rand(sides) << ' ';
    
            std::cout << '\n';
        }
    }
```

Saída possível:
```
    Random value on [0, 2147483647]: 948298199
    Roll 2-sided die 8 times: 2 2 1 2 1 1 2 2 
    Roll 4-sided die 8 times: 1 3 4 2 1 3 3 1 
    Roll 6-sided die 8 times: 3 2 1 6 6 4 4 2 
    Roll 8-sided die 8 times: 4 5 6 6 3 6 1 2
```

### Veja também

[ uniform_int_distribution](<#/doc/numeric/random/uniform_int_distribution>)(C++11) | produz valores inteiros distribuídos uniformemente em um intervalo
(modelo de classe)
[ srand](<#/doc/numeric/random/srand>) | inicializa o gerador de números pseudoaleatórios
(função)
[ RAND_MAX](<#/doc/numeric/random/RAND_MAX>) | valor máximo possível gerado por **std::rand**
(macro constante)
[ randint](<#/doc/experimental/randint>) | gera um inteiro aleatório no intervalo especificado
(modelo de função)
[Documentação C](<#/>) para rand