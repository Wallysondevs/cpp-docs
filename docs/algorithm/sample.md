# std::sample

Definido no cabeçalho `[<algorithm>](<#/doc/header/algorithm>)`

```c
template< class PopulationIt, class SampleIt, class Distance, class URBG >
SampleIterator sample( PopulationIt first, PopulationIt last,
SampleIt out, Distance n, URBG&& g );
```

Seleciona n elementos da sequência `[`first`, `last`)` (sem reposição) de forma que cada amostra possível tenha igual probabilidade de aparecer, e escreve esses elementos selecionados no iterator de saída out. Números aleatórios são gerados usando o gerador de números aleatórios g.

Se n for maior que o número de elementos na sequência, seleciona todos os elementos na sequência.

O algoritmo é estável (preserva a ordem relativa dos elementos selecionados) somente se `PopulationIt` atender aos requisitos de `[`LegacyForwardIterator`](<#/doc/named_req/ForwardIterator>)`.

Se o tipo de valor de first(até C++20)*first(desde C++20) não for `[`gravável`](<#/doc/iterator>)` em out, o programa é malformado.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

*   out está em `[`first`, `last`)`.
*   `PopulationIt` não atende aos requisitos de `[`LegacyInputIterator`](<#/doc/named_req/InputIterator>)`.
*   `SampleIt` não atende aos requisitos de `[`LegacyOutputIterator`](<#/doc/named_req/OutputIterator>)`.
*   Todas as seguintes condições são satisfeitas:

    *   `PopulationIt` não atende aos requisitos de `[`LegacyForwardIterator`](<#/doc/named_req/ForwardIterator>)`.

| (até C++23)

    *   `PopulationIt` não modela `[`forward_iterator`](<#/doc/iterator/forward_iterator>)`.

| (desde C++23)

    *   `SampleIt` não atende aos requisitos de `[`LegacyRandomAccessIterator`](<#/doc/named_req/RandomAccessIterator>)`.

*   Dado o tipo `T` como `[`std::remove_reference_t`](<#/doc/types/remove_reference>)`&lt;URBG&gt;, qualquer das seguintes condições é satisfeita:

    *   `T` não atende aos requisitos de `[`UniformRandomBitGenerator`](<#/doc/named_req/UniformRandomBitGenerator>)`.

    *   O tipo de retorno de `T` não é conversível para `Distance`.

| (até C++20)

### Parâmetros

- **first, last** — par de iterators formando o range do qual fazer a amostragem (a população)
- **out** — o iterator de saída onde as amostras são escritas
- **n** — número de amostras a serem feitas
- **g** — o gerador de números aleatórios usado como fonte de aleatoriedade
Requisitos de tipo
-`Distance` deve ser um tipo inteiro.

### Valor de retorno

Retorna uma cópia de out após a última amostra que foi produzida, ou seja, o fim do range da amostra.

### Complexidade

Linear em `[`std::distance`](<#/doc/iterator/distance>)(first, last).

### Implementação possível

Veja as implementações em `[`libstdc++`](<https://github.com/gcc-mirror/gcc/blob/14d8a5ae472ca5743016f37da2dd4770d83dea21/libstdc%2B%2B-v3/include/bits/stl_algo.h#L5743-L5869>)`, `[`libc++`](<https://github.com/llvm/llvm-project/blob/f221d905b131158cbe3cbc4320d1ecd1376c3f22/libcxx/include/__algorithm/sample.h>)` e `[`MSVC STL`](<https://github.com/microsoft/STL/blob/472161105d596192194d4715ccad307c6c163b4a/stl/inc/algorithm#L4518-L4600>)`.

### Notas

Esta função pode implementar amostragem por seleção ou `[`amostragem por reservatório`](<https://en.wikipedia.org/wiki/reservoir_sampling> "enwiki:reservoir sampling")`.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
`[`__cpp_lib_sample`](<#/doc/feature_test>) | `[`201603L`](<#/>) | (C++17) | `std::sample`

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <iterator>
    #include <random>
    #include <string>
    
    int main()
    {
        std::string in {"ABCDEFGHIJK"}, out;
        std::sample(in.begin(), in.end(), std::back_inserter(out), 4,
                    std::mt19937 {std::random_device{}()});
        std::cout << "Four random letters out of " << in << " : " << out << '\n';
    }
```

Saída possível:
```
    Four random letters out of ABCDEFGHIJK: EFGK
```

### Veja também

`[`random_shuffleshuffle`](<#/doc/algorithm/random_shuffle>)(até C++17)(C++11) | reordena aleatoriamente elementos em um range
(modelo de função)
`[`ranges::sample`](<#/doc/algorithm/ranges/sample>)(C++20) | seleciona N elementos aleatórios de uma sequência
(objeto de função de algoritmo)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
\*\[Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão