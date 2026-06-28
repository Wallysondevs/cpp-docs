# std::partial_sum

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class InputIt, class OutputIt >
OutputIt partial_sum( InputIt first, InputIt last,
OutputIt d_first );
template< class InputIt, class OutputIt, class BinaryOp >
OutputIt partial_sum( InputIt first, InputIt last,
OutputIt d_first, BinaryOp op );
```

1) Se `[`first`, `last`)` estiver vazio, não faz nada.

Caso contrário, executa as seguintes operações em ordem:

1. Cria um acumulador acc, cujo tipo é o [tipo de valor](<#/doc/iterator>) de `InputIt`, e o inicializa com *first.
2. Atribui acc a *d_first.
3. Para cada inteiro i em `[`1`, `[std::distance](<#/doc/iterator/distance>)(first, last)`)`, executa as seguintes operações em ordem:

a) Calcula acc + *iter(até C++20)std::move(acc) + *iter(desde C++20), onde iter é o próximo i-ésimo iterator de first.

b) Atribui o resultado a acc.

c) Atribui acc[1](<#/doc/algorithm/partial_sum>) a *dest, onde dest é o próximo i-ésimo iterator de d_first.

2) O mesmo que (1), mas calcula op(acc, *iter)(até C++20)op(std::move(acc), *iter)(desde C++20) em vez disso.

Dada binary_op como a operação binária real:

* Se qualquer das seguintes condições for satisfeita, o programa é malformado:

* O tipo de valor de `InputIt` não é construtível a partir de *first.
* acc não é [gravável](<#/doc/iterator>) para d_first.
* O resultado de binary_op(acc, *iter)(até C++20)binary_op(std::move(acc), *iter)(desde C++20) não é implicitamente conversível para o tipo de valor de `InputIt`.

* Dado d_last como o iterator a ser [retornado](<#/doc/algorithm/partial_sum>), se qualquer das seguintes condições for satisfeita, o comportamento é indefinido:

* binary_op modifica qualquer elemento de `[`first`, `last`)` ou `[`d_first`, `d_last`)`.
* binary_op invalida qualquer iterator ou sub-range em `[`first`, `last`]` ou `[`d_first`, `d_last`]`.

1. [↑](<#/doc/algorithm/partial_sum>) O valor real a ser atribuído é o resultado da atribuição na etapa anterior. Assumimos que o resultado da atribuição é acc aqui.

### Parâmetros

- **first, last** — o range de elementos a somar
- **d_first** — o início do range de destino; pode ser igual a first
- **op** — objeto de função de operação binária que será aplicado.
A assinatura da função deve ser equivalente à seguinte: Ret fun(const Type1 &a, const Type2 &b); A assinatura não precisa ter const &. O tipo Type1 deve ser tal que um objeto do tipo [std::iterator_traits](<#/doc/iterator/iterator_traits>)&lt;InputIt&gt;::value_type possa ser implicitamente convertido para Type1. O tipo Type2 deve ser tal que um objeto do tipo InputIt possa ser desreferenciado e então implicitamente convertido para Type2. O tipo Ret deve ser tal que um objeto do tipo InputIt possa ser desreferenciado e receba um valor do tipo Ret. ​
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-`OutputIt` deve satisfazer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

### Valor de retorno

Iterator para o elemento após o último elemento escrito, ou d_first se `[`first`, `last`)` estiver vazio.

### Complexidade

Dada \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(first, last):

1) Exatamente \\(\scriptsize N-1\\)N-1 aplicações do operador+.

2) Exatamente \\(\scriptsize N-1\\)N-1 aplicações da função binária op.

### Implementação possível

[partial_sum (1)](<#/doc/algorithm/partial_sum>)
---
```cpp
    template<class InputIt, class OutputIt>
    constexpr // desde C++20
    OutputIt partial_sum(InputIt first, InputIt last, OutputIt d_first)
    {
        if (first == last)
            return d_first;
    
        typename std::iterator_traits<InputIt>::value_type sum = *first;
        *d_first = sum;
    
        while (++first != last)
        {
            sum = std::move(sum) + *first; // std::move desde C++20
            *++d_first = sum;
        }
    
        return ++d_first;
    
        // ou, desde C++14:
        // return std::partial_sum(first, last, d_first, std::plus<>());
    }
```

[partial_sum (2)](<#/doc/algorithm/partial_sum>)
```cpp
    template<class InputIt, class OutputIt, class BinaryOp>
    constexpr // desde C++20
    OutputIt partial_sum(InputIt first, InputIt last, 
                         OutputIt d_first, BinaryOp op)
    {
        if (first == last)
            return d_first;
    
        typename std::iterator_traits<InputIt>::value_type acc = *first;
        *d_first = acc;
    
        while (++first != last)
        {
            acc = op(std::move(acc), *first); // std::move desde C++20
            *++d_first = acc;
        }
    
        return ++d_first;
    }
```

### Notas

acc foi introduzido devido à resolução do [LWG issue 539](<https://cplusplus.github.io/LWG/issue539>). A razão para usar acc em vez de somar os resultados diretamente (ou seja, *(d_first + 2) = (*first + *(first + 1)) + *(first + 2);) é porque a semântica deste último é confusa se os seguintes tipos não corresponderem:

* o tipo de valor de `InputIt`
* o(s) tipo(s) gravável(eis) de `OutputIt`
* os tipos dos parâmetros de operator+ ou op
* o tipo de retorno de operator+ ou op

acc serve como o objeto intermediário para armazenar e fornecer os valores para cada etapa do cálculo:

* seu tipo é o tipo de valor de `InputIt`
* é escrito para d_first
* seu valor é passado para operator+ ou op
* armazena o valor de retorno de operator+ ou op

```cpp
    enum not_int { x = 1, y = 2 };
    
    char i_array[4] = {100, 100, 100, 100};
    not_int e_array[4] = {x, x, y, y};
    int  o_array[4];
    
    // OK: usa operator+(char, char) e atribui valores char a um array int
    std::partial_sum(i_array, i_array + 4, o_array);
    
    // Erro: não pode atribuir valores not_int a um array int
    std::partial_sum(e_array, e_array + 4, o_array);
    
    // OK: realiza conversões quando necessário
    // 1. cria "acc" do tipo char (o tipo de valor)
    // 2. os argumentos char são usados para multiplicação long (char -> long)
    // 3. o produto long é atribuído a "acc" (long -> char)
    // 4. "acc" é atribuído a um elemento de "o_array" (char -> int)
    // 5. volta para a etapa 2 para processar os elementos restantes no range de entrada
    std::partial_sum(i_array, i_array + 4, o_array, std::multiplies<long>{});
```

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <iterator>
    #include <numeric>
    #include <vector>
    
    int main()
    {
        std::vector<int> v(10, 2); // v = {2, 2, 2, 2, 2, 2, 2, 2, 2, 2}
    
        std::cout << "The first " << v.size() << " even numbers are: ";
        // escreve o resultado para o stream cout
        std::partial_sum(v.cbegin(), v.cend(), 
                         std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        // escreve o resultado de volta para o vetor v
        std::partial_sum(v.cbegin(), v.cend(),
                         v.begin(), std::multiplies<int>());
    
        std::cout << "The first " << v.size() << " powers of 2 are: ";
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Output:
```
    The first 10 even numbers are: 2 4 6 8 10 12 14 16 18 20 
    The first 10 powers of 2 are: 2 4 8 16 32 64 128 256 512 1024
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 242](<https://cplusplus.github.io/LWG/issue242>) | C++98 | op não podia ter efeitos colaterais | não pode modificar os ranges envolvidos
[LWG 539](<https://cplusplus.github.io/LWG/issue539>) | C++98 | os requisitos de tipo necessários para que as avaliações e atribuições de resultado fossem válidas estavam faltando | adicionado

### Veja também

[ adjacent_difference](<#/doc/algorithm/adjacent_difference>) | calcula as diferenças entre elementos adjacentes em um range
(modelo de função)
[ accumulate](<#/doc/algorithm/accumulate>) | soma ou "dobra" um range de elementos
(modelo de função)
[ inclusive_scan](<#/doc/algorithm/inclusive_scan>)(C++17) | similar a **std::partial_sum** , inclui o i-ésimo elemento de entrada na i-ésima soma
(modelo de função)
[ exclusive_scan](<#/doc/algorithm/exclusive_scan>)(C++17) | similar a **std::partial_sum** , exclui o i-ésimo elemento de entrada da i-ésima soma
(modelo de função)