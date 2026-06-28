# std::mersenne_twister_engine&lt;UIntType,w,n,m,r,a,u,d,s,b,t,c,l,f&gt;::seed

```cpp
void seed( result_type value = default_seed );  // (1) (desde C++11)
template< class SeedSeq >
void seed( SeedSeq& seq );  // (2) (desde C++11)
```

Define o [estado](<#/doc/numeric/random/mersenne_twister_engine>) do motor de números aleatórios.

1) Logo após o estado ser definido, *this == [std::mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)(value) é verdadeiro.

2) Logo após o estado ser definido, *this == [std::mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)(seq) é verdadeiro.

### Parâmetros

- **value** — valor de seed a ser usado para definir o estado
- **seq** — sequência de seed a ser usada para definir o estado

### Exceções

2) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Complexidade

1) O mesmo que [std::mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)(value).

2) O mesmo que [std::mersenne_twister_engine](<#/doc/numeric/random/mersenne_twister_engine>)(seq).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11 | sobrecarga ([2](<#/doc/numeric/random/mersenne_twister_engine/seed>)) não lançaria mesmo se a chamada `seq.generate` lançasse | propaga a exceção

### Veja também

[ (construtor)](<#/doc/numeric/random/mersenne_twister_engine/mersenne_twister_engine>) | constrói o motor
(função membro pública)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <random>
     
    int main()
    {
        std::mt19937 gen;
     
        // Seed the engine with an unsigned int
        gen.seed(1);
        std::cout << "after seed by 1: " << gen() << '\n';
     
        // Seed the engine with two unsigned ints
        std::seed_seq sseq{1, 2};
        gen.seed(sseq);
        std::cout << "after seed by {1,2}: " << gen() << '\n';
    }
```

Saída possível:
```
    after seed by 1: 1791095845
    after seed by {1,2}: 3127717181
```