# C++ named requirements: ReversibleContainer

Um **ReversibleContainer** é um [Container](<#/doc/named_req/Container>) que possui iterators que atendem aos requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) ou [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>). Tais iterators permitem que um ReversibleContainer seja iterado em ordem inversa.

### Requisitos

Um tipo satisfaz ReversibleContainer se ele satisfaz [Container](<#/doc/named_req/Container>), seu tipo de iterator pertence às [categorias de iterator](<#/doc/iterator>) bidirecionais ou de acesso aleatório e, dados os seguintes tipos e valores, os requisitos semânticos e de complexidade nas tabelas abaixo são satisfeitos:

Tipo | Definição
---|---
`X` | um tipo ReversibleContainer
`T` | o `value_type` de `X`
Valor | Definição
a | um valor do tipo `X`

#### Tipos

Nome | Tipo | Requisitos
---|---|---
typename X::reverse_iterator | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<X::iterator> | um tipo de iterator cujo [tipo de valor](<#/doc/iterator>) é `T`
typename X::const_reverse_iterator | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<X::const_iterator> | um tipo de iterator constante cujo [tipo de valor](<#/doc/iterator>) é `T`

#### Expressões

Os tipos `reverse_iterator` e `const_reverse_iterator` na tabela a seguir denotam typename X::reverse_iterator e typename X::const_reverse_iterator, respectivamente.

Expressão | Tipo | Semântica | Complexidade
a.rbegin() | `reverse_iterator`
`const_reverse_iterator` para `a` constante | reverse_iterator(a.end()) | Constante
a.rend() | `reverse_iterator`
`const_reverse_iterator` para `a` constante | reverse_iterator(a.begin()) | Constante
a.crbegin() | `const_reverse_iterator` | const_cast&lt;const X&&gt;(a).rbegin() | Constante
a.crend() | `const_reverse_iterator` | const_cast&lt;const X&&gt;(a).rend() | Constante

### Tipos da biblioteca

Os seguintes tipos da standard library satisfazem os requisitos de ReversibleContainer:

[ array](<#/doc/container/array>)(desde C++11) | array contíguo in-place de tamanho fixo
(modelo de classe)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(modelo de classe)
[ list](<#/doc/container/list>) | lista duplamente encadeada
(modelo de classe)
[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(modelo de classe)
[ inplace_vector](<#/doc/container/inplace_vector>)(C++26) | array contíguo in-place de capacidade fixa, redimensionável dinamicamente
(modelo de classe)
[ map](<#/doc/container/map>) | coleção de pares chave-valor, ordenados por chaves, chaves são únicas
(modelo de classe)
[ multimap](<#/doc/container/multimap>) | coleção de pares chave-valor, ordenados por chaves
(modelo de classe)
[ set](<#/doc/container/set>) | coleção de chaves únicas, ordenadas por chaves
(modelo de classe)
[ multiset](<#/doc/container/multiset>) | coleção de chaves, ordenadas por chaves
(modelo de classe)

### Exemplo

O exemplo a seguir itera sobre um [vector](<#/doc/container/vector>) (que possui [legacy random-access iterators](<#/doc/container/vector>)) em ordem inversa.

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::vector<int> v = {3, 1, 4, 1, 5, 9};
    
        for (std::vector<int>::const_reverse_iterator i{v.crbegin()}; i != v.crend(); ++i)
            std::cout << *i << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    9 5 1 4 1 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2105](<https://cplusplus.github.io/LWG/issue2105>) | C++98 | typename X::const_reverse_iterator era exigido como um tipo de iterator com tipo de valor `const T` | exigido como um tipo de iterator constante com tipo de valor `T`
*[_(as is)_]: A::pointer