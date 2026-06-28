# std::inner_product

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt1, class InputIt2, class T >
T inner_product( InputIt1 first1, InputIt1 last1,
InputIt2 first2, T init );
template< class InputIt1, class InputIt2, class T,
class BinaryOp1, class BinaryOp2 >
T inner_product( InputIt1 first1, InputIt1 last1,
InputIt2 first2, T init,
BinaryOp1 op1, BinaryOp2 op2 );
```

Calcula o produto interno (isto é, soma de produtos) ou executa uma operação ordenada de map/reduce no range `[`first1`, `last1`)` e no range de [std::distance](<#/doc/iterator/distance>)(first1, last1) elementos começando em first2.

1) Inicializa o acumulador acc (do tipo `T`) com o valor inicial init e então o modifica com a expressão acc = acc + (*i1) * (*i2)(até C++20)acc = std::move(acc) + (*i1) * (*i2)(desde C++20) para cada iterator i1 no range `[`first1`, `last1`)` em ordem e seu iterator i2 correspondente no range começando em first2. Para o significado embutido de + e *, isso calcula o produto interno dos dois ranges.

2) Inicializa o acumulador acc (do tipo `T`) com o valor inicial init e então o modifica com a expressão acc = op1(acc, op2(*i1, *i2))(até C++20)acc = op1(std::move(acc), op2(*i1, *i2))(desde C++20) para cada iterator i1 no range `[`first1`, `last1`)` em ordem e seu iterator i2 correspondente no range começando em first2.

Dado last2 como o [std::distance](<#/doc/iterator/distance>)(first1, last1)-ésimo próximo iterator de first2, se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

*   `T` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).
*   `T` não é [CopyAssignable](<#/doc/named_req/CopyAssignable>).
*   op1 ou op2 modifica qualquer elemento de `[`first1`, `last1`)` ou `[`first2`, `last2`)`.
*   op1 ou op2 invalida qualquer iterator ou subrange em `[`first1`, `last1`]` ou `[`first2`, `last2`]`.

### Parâmetros

- **first1, last1** — o primeiro range de elementos
- **first2** — o início do segundo range de elementos
- **init** — valor inicial da soma dos produtos
- **op1** — objeto de função de operação binária que será aplicado. Esta função de "soma" recebe um valor retornado por op2 e o valor atual do acumulador e produz um novo valor a ser armazenado no acumulador.
A assinatura da função deve ser equivalente à seguinte: Ret fun(const Type1 &a, const Type2 &b); A assinatura não precisa ter const &.
Os tipos Type1 e Type2 devem ser tais que objetos dos tipos T e Type3 possam ser implicitamente convertidos para Type1 e Type2, respectivamente. O tipo Ret deve ser tal que um objeto do tipo T possa receber um valor do tipo Ret. ​
- **op2** — objeto de função de operação binária que será aplicado. Esta função de "produto" recebe um valor de cada range e produz um novo valor.
A assinatura da função deve ser equivalente à seguinte: Ret fun(const Type1 &a, const Type2 &b); A assinatura não precisa ter const &.
Os tipos Type1 e Type2 devem ser tais que objetos dos tipos InputIt1 e InputIt2 possam ser desreferenciados e então implicitamente convertidos para Type1 e Type2, respectivamente. O tipo Ret deve ser tal que um objeto do tipo Type3 possa receber um valor do tipo Ret. ​
Requisitos de tipo
-`InputIt1, InputIt2` devem satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

acc após todas as modificações.

### Possível implementação

[inner_product (1)](<#/doc/algorithm/inner_product>)
---
```cpp
    template<class InputIt1, class InputIt2, class T>
    constexpr // since C++20
    T inner_product(InputIt1 first1, InputIt1 last1, InputIt2 first2, T init)
    {
        while (first1 != last1)
        {
            init = std::move(init) + (*first1) * (*first2); // std::move since C++20
            ++first1;
            ++first2;
        }
    
        return init;
    }
```

[inner_product (2)](<#/doc/algorithm/inner_product>)
```cpp
    template<class InputIt1, class InputIt2, class T,
             class BinaryOp1, class BinaryOp2>
    constexpr // since C++20
    T inner_product(InputIt1 first1, InputIt1 last1, InputIt2 first2, T init,
                    BinaryOp1 op1, BinaryOp2 op2)
    {
        while (first1 != last1)
        {
            init = op1(std::move(init), op2(*first1, *first2)); // std::move since C++20
            ++first1;
            ++first2;
        }
    
        return init;
    }
```

### Observações

A versão paralelizada deste algoritmo, [std::transform_reduce](<#/doc/algorithm/transform_reduce>), exige que op1 e op2 sejam comutativas e associativas, mas `std::inner_product` não faz tal exigência e sempre executa as operações na ordem dada.

### Exemplo

Run this code
```cpp
    #include <functional>
    #include <iostream>
    #include <numeric>
    #include <vector>
    
    int main()
    {
        std::vector<int> a{0, 1, 2, 3, 4};
        std::vector<int> b{5, 4, 2, 3, 1};
    
        int r1 = std::inner_product(a.begin(), a.end(), b.begin(), 0);
        std::cout << "Inner product of a and b: " << r1 << '\n';
    
        int r2 = std::inner_product(a.begin(), a.end(), b.begin(), 0,
                                    std::plus<>(), std::equal_to<>());
        std::cout << "Number of pairwise matches between a and b: " <<  r2 << '\n';
    }
```

Saída:
```
    Inner product of a and b: 21
    Number of pairwise matches between a and b: 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 242](<https://cplusplus.github.io/LWG/issue242>) | C++98 | op1 e op2 não podiam ter efeitos colaterais | eles não podem modificar os ranges envolvidos

### Veja também

[ transform_reduce](<#/doc/algorithm/transform_reduce>)(C++17) | aplica um invocável, então reduz fora de ordem
(modelo de função)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou "dobra" (folds) um range de elementos
(modelo de função)
[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)