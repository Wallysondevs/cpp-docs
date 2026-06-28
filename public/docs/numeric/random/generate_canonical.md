# std::generate_canonical

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template< class RealType, std::size_t Bits, class Generator >
RealType generate_canonical( Generator& g );
```

Gera um número de ponto flutuante aleatório no intervalo `[`​0​`, `1`)`.

Para gerar entropia suficiente, generate_canonical() chamará g() exatamente \\(\small k\\)k vezes, onde \\(\small k = \max(1, \lceil \frac{b}{\log_2 R} \rceil)\\)k = max(1, ⌈ b / log2 R ⌉) e

  * b = [std::min](<#/doc/algorithm/min>)(Bits, [std::size_t](<#/doc/types/size_t>) {[std::numeric_limits](<#/doc/types/numeric_limits>)&lt;RealType&gt;::digits}),
  * R = g.max() - g.min() + 1.

### Parâmetros

- **g** — gerador a ser usado para adquirir entropia

### Valor de retorno

Valor de ponto flutuante no intervalo `[`​0​`, `1`)`.

### Exceções

Nenhuma, exceto as lançadas por g.

### Notas

Algumas implementações existentes possuem um bug onde elas podem ocasionalmente retornar 1.0 se `RealType` for float [GCC #63176](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=63176>) [LLVM #18767](<https://bugs.llvm.org/show_bug.cgi?id=18767>) [MSVC STL #1074](<https://github.com/microsoft/STL/issues/1074>). Este é o [LWG issue 2524](<https://cplusplus.github.io/LWG/issue2524>).

### Exemplo

Produz números aleatórios com 10 bits de aleatoriedade: isso pode produzir apenas k * R valores distintos.

Execute este código
```cpp
    #include <iostream>
    #include <random>
    
    int main()
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        for (int n = 0; n < 10; ++n)
            std::cout << std::generate_canonical<double, 10>(gen) << ' ';
        std::cout << '\n';
    }
```

Saída possível:
```
    0.208143 0.824147 0.0278604 0.343183 0.0173263 0.864057 0.647037 0.539467 0.0583497 0.609219
```

### Veja também

[ uniform_real_distribution](<#/doc/numeric/random/uniform_real_distribution>)(C++11) | produz valores reais distribuídos uniformemente em um intervalo
(modelo de classe)