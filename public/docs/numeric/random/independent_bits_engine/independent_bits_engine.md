# std::independent_bits_engine&lt;Engine,W,UIntType&gt;::independent_bits_engine

```cpp
independent_bits_engine();  // (1) (desde C++11)
explicit independent_bits_engine( result_type s );  // (2) (desde C++11)
template< class SeedSeq >
explicit independent_bits_engine( SeedSeq& seq );  // (3) (desde C++11)
explicit independent_bits_engine( const Engine& e );  // (4) (desde C++11)
explicit independent_bits_engine( Engine&& e );  // (5) (desde C++11)
```

Constrói um novo adaptador de engine pseudoaleatório.

1) Construtor padrão. O engine subjacente também é construído por padrão.

2) Constrói o engine subjacente com s.

3) Constrói o engine subjacente com a seed sequence seq.

Esta sobrecarga participa da resolução de sobrecarga apenas se `Sseq` satisfizer os requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

4) Constrói o engine subjacente com uma cópia de e.

5) Constrói por move o engine subjacente com e. e mantém um estado não especificado, mas válido, depois.

### Parâmetros

- **s** — valor inteiro para construir o engine subjacente
- **seq** — seed sequence para construir o engine subjacente
- **e** — engine de números pseudoaleatórios para inicializar

### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <random>
     
    int main()
    {
        auto print = 
        {
            std::cout << rem << ": ";
            for (int i {}; i != count; ++i)
                std::cout << static_cast<unsigned>(engine()) << ' ';
            std::cout << '\n';
        };
     
        std::independent_bits_engine<std::mt19937, /*bits*/ 1, unsigned short>
            e1; // default-constructed
        print("e1", e1, 8);
     
        std::independent_bits_engine<std::mt19937, /*bits*/ 1, unsigned int>
            e2(1); // constructed with 1
        print("e2", e2, 8);
     
        std::random_device rd;
        std::independent_bits_engine<std::mt19937, /*bits*/ 3, unsigned long>
            e3(rd()); // seeded with rd()
        print("e3", e3, 8);
     
        std::seed_seq s {3, 1, 4, 1, 5};
        std::independent_bits_engine<std::mt19937, /*bits*/ 3, unsigned long long>
            e4(s); // seeded with seed-sequence s
        print("e4", e4, 8);
    }
```

Saída possível:
```
    e1: 0 0 0 1 0 1 1 1
    e2: 1 1 0 0 1 1 1 1
    e3: 3 1 5 4 3 2 3 4
    e4: 0 2 4 4 4 3 3 6
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11 | a sobrecarga ([3](<#/doc/numeric/random/independent_bits_engine/independent_bits_engine>)) não lançaria mesmo que a chamada `seq.generate` lançasse | propaga a exceção