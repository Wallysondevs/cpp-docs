# std::accumulate

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt, class T >
T accumulate( InputIt first, InputIt last, T init );
template< class InputIt, class T, class BinaryOp >
T accumulate( InputIt first, InputIt last, T init, BinaryOp op );
```

Calcula a soma do valor `init` fornecido e dos elementos no range `[`first`, `last`)`.

1) Inicializa o acumulador `acc` (do tipo `T`) com o valor inicial `init` e então o modifica com `acc = acc + *i` (até C++20) `acc = std::move(acc) + *i` (desde C++20) para cada iterator `i` no range `[`first`, `last`)` em ordem.

2) Inicializa o acumulador `acc` (do tipo `T`) com o valor inicial `init` e então o modifica com `acc = op(acc, *i)` (até C++20) `acc = op(std::move(acc), *i)` (desde C++20) para cada iterator `i` no range `[`first`, `last`)` em ordem.

Se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

*   `T` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).
*   `T` não é [CopyAssignable](<#/doc/named_req/CopyAssignable>).
*   `op` modifica qualquer elemento de `[`first`, `last`)`.
*   `op` invalida qualquer iterator ou subrange em `[`first`, `last`]`.

### Parâmetros

- **first, last** — o range de elementos a somar
- **init** — valor inicial da soma
- **op** — objeto de função de operação binária que será aplicado.
A assinatura da função deve ser equivalente à seguinte: `Ret fun(const Type1 &a, const Type2 &b);` A assinatura não precisa ter `const &`. O tipo `Type1` deve ser tal que um objeto do tipo `T` possa ser implicitamente convertido para `Type1`. O tipo `Type2` deve ser tal que um objeto do tipo `InputIt` possa ser desreferenciado e então implicitamente convertido para `Type2`. O tipo `Ret` deve ser tal que um objeto do tipo `T` possa receber um valor do tipo `Ret`.
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

`acc` após todas as modificações.

### Possível implementação

[accumulate (1)](<#/doc/algorithm/accumulate>)
```cpp
    template<class InputIt, class T>
    constexpr // desde C++20
    T accumulate(InputIt first, InputIt last, T init)
    {
        for (; first != last; ++first)
            init = std::move(init) + *first; // std::move desde C++20
    
        return init;
    }
```

[accumulate (2)](<#/doc/algorithm/accumulate>)
```cpp
    template<class InputIt, class T, class BinaryOperation>
    constexpr // desde C++20
    T accumulate(InputIt first, InputIt last, T init, BinaryOperation op)
    {
        for (; first != last; ++first)
            init = op(std::move(init), *first); // std::move desde C++20
    
        return init;
    }
```

### Observações

`std::accumulate` realiza um [fold](<https://en.wikipedia.org/wiki/Fold_\(higher-order_function\)> "enwiki:Fold \(higher-order function\)") à esquerda. Para realizar um fold à direita, deve-se inverter a ordem dos argumentos para o operador binário e usar iterators reversos.

Se deixado para inferência de tipo, `op` opera em valores do mesmo tipo que `init`, o que pode resultar em um casting indesejado dos elementos do iterator. Por exemplo, `std::accumulate(v.begin(), v.end(), 0)` provavelmente não dará o resultado desejado quando `v` é do tipo [std::vector](<#/doc/container/vector>)&lt;double&gt;.

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <numeric>
    #include <string>
    #include <vector>
    
    int main()
    {
        std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
        int sum = std::accumulate(v.begin(), v.end(), 0);
        int product = std::accumulate(v.begin(), v.end(), 1, std::multiplies<int>());
    
        auto dash_fold =  a, int b)
        {
            return std::move(a) + '-' + std::to_string(b);
        };
    
        std::string s = std::accumulate(std::next(v.begin()), v.end(),
                                        std::to_string(v[0]), // começa com o primeiro elemento
                                        dash_fold);
    
        // Fold à direita usando iterators reversos
        std::string rs = std::accumulate(std::next(v.rbegin()), v.rend(),
                                         std::to_string(v.back()), // começa com o último elemento
                                         dash_fold);
    
        std::cout << "soma: " << sum << '\n'
                  << "produto: " << product << '\n'
                  << "string separada por traços: " << s << '\n'
                  << "string separada por traços (fold à direita): " << rs << '\n';
    }
```

Saída:
```
    sum: 55
    product: 3628800
    dash-separated string: 1-2-3-4-5-6-7-8-9-10
    dash-separated string (right-folded): 10-9-8-7-6-5-4-3-2-1
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 242](<https://cplusplus.github.io/LWG/issue242>) | C++98 | `op` não poderia ter efeitos colaterais | não pode modificar os ranges envolvidos

### Veja também

[ adjacent_difference](<#/doc/algorithm/adjacent_difference>) | calcula as diferenças entre elementos adjacentes em um range
(modelo de função)
[ inner_product](<#/doc/algorithm/inner_product>) | calcula o produto interno de dois ranges de elementos
(modelo de função)
[ partial_sum](<#/doc/algorithm/partial_sum>) | calcula a soma parcial de um range de elementos
(modelo de função)
[ reduce](<#/doc/algorithm/reduce>)(C++17) | similar a **std::accumulate**, exceto fora de ordem
(modelo de função)
[ ranges::fold_left](<#/doc/algorithm/ranges/fold_left>)(C++23) | realiza um fold à esquerda em um range de elementos
(objeto de função de algoritmo)