# std::experimental::sample

Definido no cabeçalho `[<experimental/algorithm>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/algorithm&action=edit&redlink=1> "cpp/header/experimental/algorithm \(page does not exist\)")`

```c
template< class PopulationIterator, class SampleIterator,
class Distance, class URBG >
SampleIterator sample( PopulationIterator first, PopulationIterator last,
SampleIterator out, Distance n,
URBG&& g );
template< class PopulationIterator, class SampleIterator, class Distance >
SampleIterator sample( PopulationIterator first, PopulationIterator last,
SampleIterator out, Distance n );
```

Seleciona `n` elementos da sequência `[`first`, `last`)` de forma que cada amostra possível tenha igual probabilidade de aparecer, e escreve esses elementos selecionados no iterator de saída `out`.

Se `n` for maior que o número de elementos na sequência, seleciona `last - first` elementos.

O algoritmo é estável apenas se `PopulationIterator` atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

1) Números aleatórios são gerados usando o gerador de números aleatórios `g`.

2) Números aleatórios são gerados usando o [motor por thread](<#/doc/experimental/lib_extensions_2>).

### Parâmetros

- **first, last** — par de iterators que formam o range do qual a amostragem será feita (a população)
- **out** — o iterator de saída onde as amostras são escritas. Não deve estar no range `[`first`, `last`)`
- **n** — número de amostras a serem feitas
- **g** — o gerador de números aleatórios usado como fonte de aleatoriedade
-`PopulationIterator` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`SampleIterator` deve atender aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).
-`SampleIterator` também deve atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) se `PopulationIterator` não atender a [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).
-O tipo de valor de `PopulationIterator` deve ser gravável em `out`.
-`Distance` deve ser um tipo inteiro.
-`URBG` deve atender aos requisitos de [UniformRandomBitGenerator](<#/doc/named_req/UniformRandomBitGenerator>) e seu tipo de retorno deve ser conversível para `Distance`.

### Valor de retorno

Retorna uma cópia de `out` após a última amostra que foi gerada, ou seja, o fim do range da amostra.

### Complexidade

Linear em [std::distance](<#/doc/iterator/distance>)(first, last).

### Notas

Esta função pode implementar amostragem por seleção ou amostragem por reservatório.

### Exemplo

Execute este código
```cpp
    #include <experimental/algorithm>
    #include <iostream>
    #include <iterator>
    #include <random>
    #include <string>
     
    int main()
    {
        std::string in = "abcdefgh", out;
        std::experimental::sample(in.begin(), in.end(), std::back_inserter(out),
                                  5, std::mt19937{std::random_device{}()});
        std::cout << "five random letters out of " << in << " : " << out << '\n';
    }
```

Saída possível:
```
    five random letters out of abcdefgh : cdefg
```

### Ver também

[ random_shuffleshuffle](<#/doc/algorithm/random_shuffle>)(até C++17)(C++11) | reordena aleatoriamente elementos em um range
(modelo de função)