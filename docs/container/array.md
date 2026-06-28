# std::array

Definido no cabeçalho `[<array>](<#/doc/header/array>)`

```c
template<
class T,
std::size_t N
> struct array;
```

`std::array` é um container que encapsula arrays de tamanho fixo.

Este container é um tipo agregado com a mesma semântica de uma struct que contém um [array estilo C](<#/doc/language/array>) T[N] como seu único membro de dados não estático. Ao contrário de um array estilo C, ele não decai para T* automaticamente. Como um tipo agregado, ele pode ser inicializado com [inicialização agregada](<#/doc/language/aggregate_initialization>) dado no máximo `N` inicializadores que são conversíveis para `T`: std::array<int, 3> a = {1, 2, 3};.

A struct combina o desempenho e a acessibilidade de um array estilo C com os benefícios de um container padrão, como saber seu próprio tamanho, suportar atribuição, iterators de acesso aleatório, etc.

`std::array` satisfaz os requisitos de [Container](<#/doc/named_req/Container>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>), exceto que um array construído por padrão não é vazio e que a complexidade de troca é linear, satisfaz os requisitos de [ContiguousContainer](<#/doc/named_req/ContiguousContainer>),(desde C++17) e satisfaz parcialmente os requisitos de [SequenceContainer](<#/doc/named_req/SequenceContainer>).

Existe um caso especial para um array de comprimento zero (`N == 0`). Nesse caso, array.begin() == array.end(), que é algum valor único. O efeito de chamar front() ou back() em um array de tamanho zero é indefinido.

Um array também pode ser usado como uma tupla de `N` elementos do mesmo tipo.

### Invalidação de Iterator

Como regra, iterators para um array nunca são invalidados durante a vida útil do array. Deve-se notar, no entanto, que durante [swap](<#/doc/container/array/swap>), o iterator continuará a apontar para o mesmo elemento do array, e assim mudará seu valor.

### Parâmetros de template

- **T** — tipo do elemento Deve ser [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>).
- **N** — o número de elementos no array ou ​0​.
| Esta seção está incompleta
Razão: Completar as descrições dos parâmetros de template.

### Tipos de membros

Tipo de membro | Definição
---|---
`value_type` | `T`
`size_type` | [std::size_t](<#/doc/types/size_t>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | value_type*
`const_pointer` | const value_type*
`iterator` | | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) para `value_type` | (até C++17)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) que é um [LiteralType](<#/doc/named_req/LiteralType>) para `value_type` | (desde C++17)
(até C++20)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), e [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) para `value_type` | (desde C++20)
---|---
`const_iterator` | | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) para const value_type | (até C++17)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) que é um [LiteralType](<#/doc/named_req/LiteralType>) para const value_type | (desde C++17)
(até C++20)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), e [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) para const value_type | (desde C++20)
---|---
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>

### Funções membro

##### Funções membro implicitamente definidas

---
(construtor)(implicitamente declarado) | inicializa o array seguindo as regras de [inicialização agregada](<#/doc/language/aggregate_initialization>) (note que a inicialização padrão pode resultar em valores indeterminados para T não-classe)
(função membro pública)
(destrutor)(implicitamente declarado) | destrói cada elemento do array
(função membro pública)
operator=(implicitamente declarado) | sobrescreve cada elemento do array com o elemento correspondente de outro array
(função membro pública)

##### Acesso a elementos

[ at](<#/doc/container/array/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/array/operator_at>) | acessa o elemento especificado
(função membro pública)
[ front](<#/doc/container/array/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/array/back>) | acessa o último elemento
(função membro pública)
[ data](<#/doc/container/array/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)

##### Iterators

[ begincbegin](<#/doc/container/array/begin>) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/container/array/end>) | retorna um iterator para o fim
(função membro pública)
[ rbegincrbegin](<#/doc/container/array/rbegin>) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/container/array/rend>) | retorna um reverse iterator para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/array/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/array/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/array/max_size>) | retorna o número máximo possível de elementos
(função membro pública)

##### Operações

[ fill](<#/doc/container/array/fill>) | preenche o container com o valor especificado
(função membro pública)
[ swap](<#/doc/container/array/swap>) | troca os conteúdos
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/array/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `array`s
(modelo de função)
[ get(std::array)](<#/doc/container/array/get>)(C++11) | acessa um elemento de um `array`
(modelo de função)
[ std::swap(std::array)](<#/doc/container/array/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(modelo de função)
[ to_array](<#/doc/container/array/to_array>)(C++20) | cria um objeto `std::array` a partir de um array embutido
(modelo de função)

### Classes auxiliares

[ std::tuple_size<std::array>](<#/doc/container/array/tuple_size>)(C++11) | obtém o tamanho de um `array`
(especialização de modelo de classe)
[ std::tuple_element<std::array>](<#/doc/container/array/tuple_element>)(C++11) | obtém o tipo dos elementos de `array`
(especialização de modelo de classe)

### [Guias de dedução](<#/doc/container/array/deduction_guides>)

| (desde C++17)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <array>
    #include <iostream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        // Construction uses aggregate initialization
        std::array<int, 3> a1{{1, 2, 3}}; // Double-braces required in C++11 prior to
                                          // the CWG 1270 revision (not needed in C++11
                                          // after the revision and in C++14 and beyond)
    
        std::array<int, 3> a2 = {1, 2, 3}; // Double braces never required after =
    
        // Container operations are supported
        std::sort(a1.begin(), a1.end());
        std::ranges::reverse_copy(a2, std::ostream_iterator<int>(std::cout, " "));
        std::cout << '\n';
    
        // Ranged for loop is supported
        std::array<std::string, 2> a3{"E", "\u018E"};
        for (const auto& s : a3)
            std::cout << s << ' ';
        std::cout << '\n';
    
        // Deduction guide for array creation (since C++17)
        [[maybe_unused]] std::array a4{3.0, 1.0, 4.0}; // std::array<double, 3>
    
        // Behavior of unspecified elements is the same as with built-in arrays
        [[maybe_unused]] std::array<int, 2> a5; // No list init, a5[0] and a5[1]
                                                // are default initialized
        [[maybe_unused]] std::array<int, 2> a6{}; // List init, both elements are value
                                                  // initialized, a6[0] = a6[1] = 0
        [[maybe_unused]] std::array<int, 2> a7{1}; // List init, unspecified element is value
                                                   // initialized, a7[0] = 1, a7[1] = 0
    }
```

Saída:
```
    3 2 1
    E Ǝ
```

### Veja também

[ inplace_vector](<#/doc/container/inplace_vector>)(C++26) | array contíguo in-place, de capacidade fixa e redimensionável dinamicamente
(modelo de classe)
[ vector](<#/doc/container/vector>) | array contíguo dinâmico
(modelo de classe)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(modelo de classe)
[ make_array](<#/doc/experimental/make_array>)(library fundamentals TS v2) | cria um objeto **std::array** cujo tamanho e, opcionalmente, tipo de elemento são deduzidos dos argumentos
(modelo de função)