# std::vector

Definido no header `[<vector>](<#/doc/header/vector>)`

```cpp
template<
class T,
class Allocator = std::allocator<T>
> class vector;  // (1)
namespace pmr {
template< class T >
using vector = std::vector<T, std::pmr::polymorphic_allocator<T>>;
}  // (2) (desde C++17)
```

1) `std::vector` é um container de sequência que encapsula arrays de tamanho dinâmico.

2) `std::pmr::vector` é um alias template que usa um [polymorphic allocator](<#/doc/memory/polymorphic_allocator>).

Os elementos são armazenados contiguamente, o que significa que os elementos podem ser acessados não apenas através de iterators, mas também usando offsets para ponteiros regulares para elementos. Isso significa que um ponteiro para um elemento de um vector pode ser passado para qualquer função que espera um ponteiro para um elemento de um array.

O armazenamento do vector é gerenciado automaticamente, sendo expandido conforme necessário. Vectors geralmente ocupam mais espaço do que arrays estáticos, porque mais memória é alocada para lidar com o crescimento futuro. Dessa forma, um vector não precisa realocar cada vez que um elemento é inserido, mas apenas quando a memória adicional é esgotada. A quantidade total de memória alocada pode ser consultada usando a função [capacity()](<#/doc/container/vector/capacity>). Memória extra pode ser retornada ao sistema através de uma chamada para [shrink_to_fit()](<#/doc/container/vector/shrink_to_fit>)[1](<#/doc/container/vector>).

Realocações são geralmente operações custosas em termos de desempenho. A função [reserve()](<#/doc/container/vector/reserve>) pode ser usada para eliminar realocações se o número de elementos for conhecido antecipadamente.

A complexidade (eficiência) das operações comuns em vectors é a seguinte:

*   Acesso aleatório - constante 𝓞(1).
*   Inserção ou remoção de elementos no final - constante amortizada 𝓞(1).
*   Inserção ou remoção de elementos - linear na distância até o final do vector 𝓞(n).

`std::vector` (para `T` diferente de bool) atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>)(desde C++11), [SequenceContainer](<#/doc/named_req/SequenceContainer>), [ContiguousContainer](<#/doc/named_req/ContiguousContainer>)(desde C++17) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>).

```cpp
Funções membro de `std::vector` são constexpr: é possível criar e usar objetos `std::vector` na avaliação de uma expressão constante. No entanto, objetos `std::vector` geralmente não podem ser constexpr, porque qualquer armazenamento alocado dinamicamente deve ser liberado na mesma avaliação da expressão constante.  // (desde C++20)
1.  ↑ No libstdc++, `shrink_to_fit()` não está disponível no modo C++98.
```

### Parâmetros de template

- **T** — O tipo dos elementos. | `T` deve atender aos requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>). | (até C++11)
Os requisitos impostos aos elementos dependem das operações reais realizadas no container. Geralmente, é exigido que o tipo do elemento seja um tipo completo e atenda aos requisitos de [Erasable](<#/doc/named_req/Erasable>), mas muitas funções membro impõem requisitos mais rigorosos. | (desde C++11)
(até C++17)
Os requisitos impostos aos elementos dependem das operações reais realizadas no container. Geralmente, é exigido que o tipo do elemento atenda aos requisitos de [Erasable](<#/doc/named_req/Erasable>), mas muitas funções membro impõem requisitos mais rigorosos. Este container (mas não seus membros) pode ser instanciado com um tipo de elemento incompleto se o allocator satisfizer os [requisitos de completude do allocator](<#/doc/named_req/Allocator>). | Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
[`__cpp_lib_incomplete_container_elements`](<#/doc/feature_test>) | [`201505L`](<#/>) | (C++17) | Suporte mínimo a tipos incompletos
(desde C++17)

- **Allocator** — Um allocator que é usado para adquirir/liberar memória e para construir/destruir os elementos nessa memória. O tipo deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>). O comportamento é indefinido (até C++20) O programa é malformado (desde C++20) se `Allocator::value_type` não for o mesmo que `T`.

### Especializações

A standard library fornece uma especialização de `std::vector` para o tipo bool, que pode ser otimizada para eficiência de espaço.

[ vector&lt;bool&gt;](<#/doc/container/vector_bool>) | bitset dinâmico com eficiência de espaço
(especialização de template de classe)

### Invalidação de iterators

Operações | Invalidado
---|---
Todas as operações somente leitura | Nunca.
[swap](<#/doc/container/vector/swap>), [std::swap](<#/doc/utility/swap>) | [end()](<#/doc/container/vector/end>)
[clear](<#/doc/container/vector/clear>), [operator=](<#/>), [assign](<#/doc/container/vector/assign>) | Sempre.
[reserve](<#/doc/container/vector/reserve>), [shrink_to_fit](<#/doc/container/vector/shrink_to_fit>) | Se o vector mudou de capacidade, todos eles. Caso contrário, nenhum.
[erase](<#/doc/container/vector/erase>) | Elementos apagados e todos os elementos após eles (incluindo [end()](<#/doc/container/vector/end>)).
[push_back](<#/doc/container/vector/push_back>), [emplace_back](<#/doc/container/vector/emplace_back>) | Se o vector mudou de capacidade, todos eles. Caso contrário, apenas [end()](<#/doc/container/vector/end>).
[insert](<#/doc/container/vector/insert>), [emplace](<#/doc/container/vector/emplace>) | Se o vector mudou de capacidade, todos eles.
Caso contrário, apenas aqueles no ponto de inserção ou após ele (incluindo [end()](<#/doc/container/vector/end>)).
[resize](<#/doc/container/vector/resize>) | Se o vector mudou de capacidade, todos eles. Caso contrário, apenas [end()](<#/doc/container/vector/end>) e quaisquer elementos apagados.
---|---
[pop_back](<#/doc/container/vector/pop_back>) | O elemento apagado e [end()](<#/doc/container/vector/end>).

### Tipos membro

Tipo membro | Definição
---|---
`value_type` | `T`
`allocator_type` | `Allocator`
`size_type` | Tipo inteiro sem sinal (geralmente [std::size_t](<#/doc/types/size_t>))
`difference_type` | Tipo inteiro com sinal (geralmente [std::ptrdiff_t](<#/doc/types/ptrdiff_t>))
`reference` | value_type&
`const_reference` | const value_type&
`pointer` | | `Allocator::pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::pointer | (desde C++11)
`const_pointer` | | `Allocator::const_pointer` | (até C++11)
[std::allocator_traits](<#/doc/memory/allocator_traits>)&lt;Allocator&gt;::const_pointer | (desde C++11)
`iterator` | | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) para `value_type` | (até C++20)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), e [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) para `value_type` | (desde C++20)
`const_iterator` | | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) e [LegacyContiguousIterator](<#/doc/named_req/ContiguousIterator>) para const value_type | (até C++20)
[LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>), [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), e [ConstexprIterator](<#/doc/named_req/ConstexprIterator>) para const value_type | (desde C++20)
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>

### Funções membro

[ (constructor)](<#/doc/container/vector/vector>) | constrói o `vector`
(função membro pública)
[ (destructor)](<#/doc/container/vector/~vector>) | destrói o `vector`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ assign](<#/doc/container/vector/assign>) | atribui valores ao container
(função membro pública)
[ assign_range](<#/doc/container/vector/assign_range>)(C++23) | atribui um range de valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/vector/get_allocator>) | retorna o allocator associado
(função membro pública)

##### Acesso a elementos

[ at](<#/doc/container/vector/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/vector/operator_at>) | acessa o elemento especificado
(função membro pública)
[ front](<#/doc/container/vector/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/vector/back>) | acessa o último elemento
(função membro pública)
[ data](<#/doc/container/vector/data>) | acesso direto ao armazenamento contíguo subjacente
(função membro pública)

##### Iteradores

[ begincbegin](<#/doc/container/vector/begin>)(C++11) | retorna um iterator para o início
(função membro pública)
[ endcend](<#/doc/container/vector/end>)(C++11) | retorna um iterator para o final
(função membro pública)
[ rbegincrbegin](<#/doc/container/vector/rbegin>)(C++11) | retorna um reverse iterator para o início
(função membro pública)
[ rendcrend](<#/doc/container/vector/rend>)(C++11) | retorna um reverse iterator para o final
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/vector/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/vector/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/vector/max_size>) | retorna o número máximo possível de elementos
(função membro pública)
[ reserve](<#/doc/container/vector/reserve>) | reserva armazenamento
(função membro pública)
[ capacity](<#/doc/container/vector/capacity>) | retorna o número de elementos que podem ser mantidos no armazenamento atualmente alocado
(função membro pública)
[ shrink_to_fit](<#/doc/container/vector/shrink_to_fit>)(DR*) | reduz o uso de memória liberando memória não utilizada
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/vector/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/vector/insert>) | insere elementos
(função membro pública)
[ insert_range](<#/doc/container/vector/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/vector/emplace>)(C++11) | constrói o elemento no local (in-place)
(função membro pública)
[ erase](<#/doc/container/vector/erase>) | apaga elementos
(função membro pública)
[ push_back](<#/doc/container/vector/push_back>) | adiciona um elemento ao final
(função membro pública)
[ emplace_back](<#/doc/container/vector/emplace_back>)(C++11) | constrói um elemento no local (in-place) no final
(função membro pública)
[ append_range](<#/doc/container/vector/append_range>)(C++23) | adiciona um range de elementos ao final
(função membro pública)
[ pop_back](<#/doc/container/vector/pop_back>) | remove o último elemento
(função membro pública)
[ resize](<#/doc/container/vector/resize>) | altera o número de elementos armazenados
(função membro pública)
[ swap](<#/doc/container/vector/swap>) | troca o conteúdo
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/vector/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `vector`s
(template de função)
[ std::swap(std::vector)](<#/doc/container/vector/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase(std::vector)erase_if(std::vector)](<#/doc/container/vector/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

### [Guias de dedução](<#/doc/container/vector/deduction_guides>)

| (desde C++17)

### Notas

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    int main()
    {
        // Create a vector containing integers
        std::vector<int> v = {8, 4, 5, 9};
    
        // Add two more integers to vector
        v.push_back(6);
        v.push_back(9);
    
        // Overwrite element at position 2
        v[2] = -1;
    
        // Print out the vector
        for (int n : v)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    8 4 -1 9 6 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 69](<https://cplusplus.github.io/LWG/issue69>) | C++98 | a contiguidade do armazenamento para elementos de `vector` não era exigida | exigida
[LWG 230](<https://cplusplus.github.io/LWG/issue230>) | C++98 | não era exigido que `T` fosse [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(um elemento do tipo `T` pode não ser capaz de ser construído) | também é exigido que `T` seja [CopyConstructible](<#/doc/named_req/CopyConstructible>)
[LWG 464](<https://cplusplus.github.io/LWG/issue464>) | C++98 | o acesso ao armazenamento subjacente de um `vector` vazio resultava em comportamento indefinido | função `data` fornecida

### Veja também

[ inplace_vector](<#/doc/container/inplace_vector>)(C++26) | array contíguo in-place, de capacidade fixa e redimensionável dinamicamente
(template de classe)
[ array](<#/doc/container/array>)(C++11) | array contíguo in-place de tamanho fixo
(template de classe)
[ deque](<#/doc/container/deque>) | fila de duas pontas
(template de classe)