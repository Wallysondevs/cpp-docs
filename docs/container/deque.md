# std::deque

Definido no cabeçalho `[<deque>](<#/doc/header/deque>)`

```c
template<
class T,
class Allocator = std::allocator<T>
> class deque;
namespace pmr {
template< class T >
using deque = std::deque<T, std::pmr::polymorphic_allocator<T>>;
}
```

`std::deque` (fila de duas pontas) é um container de sequência indexado que permite inserção e remoção rápidas tanto no seu início quanto no seu fim. Além disso, a inserção e remoção em qualquer uma das pontas de uma deque nunca invalida ponteiros ou referências para o restante dos elementos.

Ao contrário de [std::vector](<#/doc/container/vector>), os elementos de uma deque não são armazenados contiguamente: implementações típicas usam uma sequência de arrays de tamanho fixo alocados individualmente, com contabilidade adicional, o que significa que o acesso indexado a uma deque deve realizar duas desreferências de ponteiro, em comparação com o acesso indexado de um vector que realiza apenas uma.

O armazenamento de uma deque é automaticamente expandido e contraído conforme necessário. A expansão de uma deque é mais barata do que a expansão de um [std::vector](<#/doc/container/vector>) porque não envolve a cópia dos elementos existentes para um novo local de memória. Por outro lado, deques tipicamente têm um custo de memória mínimo grande; uma deque contendo apenas um elemento precisa alocar seu array interno completo (por exemplo, 8 vezes o tamanho do objeto em libstdc++ de 64 bits; 16 vezes o tamanho do objeto ou 4096 bytes, o que for maior, em libc++ de 64 bits).

A complexidade (eficiência) das operações comuns em deques é a seguinte:

*   Acesso aleatório - constante O(1).
*   Inserção ou remoção de elementos no fim ou início - constante O(1).
*   Inserção ou remoção de elementos - linear O(n).

`std::deque` atende aos requisitos de [Container](<#/doc/named_req/Container>), [AllocatorAwareContainer](<#/doc/named_req/AllocatorAwareContainer>), [SequenceContainer](<#/doc/named_req/SequenceContainer>) e [ReversibleContainer](<#/doc/named_req/ReversibleContainer>).

### Parâmetros de template

T | \- | O tipo dos elementos. | `T` deve atender aos requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>). | (até C++11)
Os requisitos impostos aos elementos dependem das operações reais realizadas no container. Geralmente, é exigido que o tipo do elemento seja um tipo completo e atenda aos requisitos de [Erasable](<#/doc/named_req/Erasable>), mas muitas funções membro impõem requisitos mais rigorosos. | (desde C++11)

Allocator | \- | Um alocador que é usado para adquirir/liberar memória e para construir/destruir os elementos nessa memória. O tipo deve atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>). O comportamento é indefinido (até C++20) O programa é malformado (desde C++20) se `Allocator::value_type` não for o mesmo que `T`.

### Invalidação de iteradores

| Esta seção está incompleta
Razão: Ainda existem algumas imprecisões nesta seção, consulte as páginas de funções membro individuais para mais detalhes
Operações | Invalidado
---|---
Todas as operações somente leitura. | Nunca.
[swap](<#/doc/container/deque/swap>), [std::swap](<#/doc/utility/swap>) | O iterador past-the-end pode ser invalidado (definido pela implementação).
[shrink_to_fit](<#/doc/container/deque/shrink_to_fit>), [clear](<#/doc/container/deque/clear>), [insert](<#/doc/container/deque/insert>), [emplace](<#/doc/container/deque/emplace>), [push_front](<#/doc/container/deque/push_front>),
[push_back](<#/doc/container/deque/push_back>), [emplace_front](<#/doc/container/deque/emplace_front>), [emplace_back](<#/doc/container/deque/emplace_back>) | Sempre.
---|---
[erase](<#/doc/container/deque/erase>) | Se apagar no início - apenas elementos apagados.
Se apagar no fim - apenas elementos apagados e o iterador past-the-end.
Caso contrário - todos os iteradores são invalidados.

É não especificado quando o iterador past-the-end é invalidado.(até C++11)

O iterador past-the-end também é invalidado, a menos que os elementos apagados
estejam no início do container e o último elemento não seja apagado.(desde C++11)
[resize](<#/doc/container/deque/resize>) | Se o novo tamanho for menor que o antigo - apenas elementos apagados e o
iterador past-the-end.
Se o novo tamanho for maior que o antigo - todos os iteradores são invalidados.
Caso contrário - nenhum iterador é invalidado.
[pop_front](<#/doc/container/deque/pop_front>), [pop_back](<#/doc/container/deque/pop_back>) | Para o elemento apagado.
O iterador past-the-end
pode ser invalidado (definido pela implementação) (até C++11)
também é invalidado.(desde C++11)

#### Notas de invalidação

*   Ao inserir em qualquer uma das pontas da deque, as referências não são invalidadas por [insert](<#/doc/container/deque/insert>) e [emplace](<#/doc/container/deque/emplace>).
*   [push_front](<#/doc/container/deque/push_front>), [push_back](<#/doc/container/deque/push_back>), [emplace_front](<#/doc/container/deque/emplace_front>) e [emplace_back](<#/doc/container/deque/emplace_back>) não invalidam nenhuma referência a elementos da deque.
*   Ao apagar em qualquer uma das pontas da deque, as referências a elementos não apagados não são invalidadas por [erase](<#/doc/container/deque/erase>), [pop_front](<#/doc/container/deque/pop_front>) e [pop_back](<#/doc/container/deque/pop_back>).
*   Uma chamada para [resize](<#/doc/container/deque/resize>) com um tamanho menor não invalida nenhuma referência a elementos não apagados.
*   Uma chamada para [resize](<#/doc/container/deque/resize>) com um tamanho maior não invalida nenhuma referência a elementos da deque.

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
`iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) para `value_type`
`const_iterator` | [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) para const value_type
`reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)&lt;iterator&gt;
`const_reverse_iterator` | [std::reverse_iterator](<#/doc/iterator/reverse_iterator>)<const_iterator>

### Funções membro

[ (construtor)](<#/doc/container/deque/deque>) | constrói a `deque`
(função membro pública)
[ (destrutor)](<#/doc/container/deque/~deque>) | destrói a `deque`
(função membro pública)
[ operator=](<#/>) | atribui valores ao container
(função membro pública)
[ assign](<#/doc/container/deque/assign>) | atribui valores ao container
(função membro pública)
[ assign_range](<#/doc/container/deque/assign_range>)(C++23) | atribui um range de valores ao container
(função membro pública)
[ get_allocator](<#/doc/container/deque/get_allocator>) | retorna o alocador associado
(função membro pública)

##### Acesso a elementos

[ at](<#/doc/container/deque/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)
[ operator[]](<#/doc/container/deque/operator_at>) | acessa o elemento especificado
(função membro pública)
[ front](<#/doc/container/deque/front>) | acessa o primeiro elemento
(função membro pública)
[ back](<#/doc/container/deque/back>) | acessa o último elemento
(função membro pública)

##### Iteradores

[ begin cbegin](<#/doc/container/deque/begin>)(C++11) | retorna um iterador para o início
(função membro pública)
[ end cend](<#/doc/container/deque/end>)(C++11) | retorna um iterador para o fim
(função membro pública)
[ rbegin crbegin](<#/doc/container/deque/rbegin>)(C++11) | retorna um iterador reverso para o início
(função membro pública)
[ rend crend](<#/doc/container/deque/rend>)(C++11) | retorna um iterador reverso para o fim
(função membro pública)

##### Capacidade

[ empty](<#/doc/container/deque/empty>) | verifica se o container está vazio
(função membro pública)
[ size](<#/doc/container/deque/size>) | retorna o número de elementos
(função membro pública)
[ max_size](<#/doc/container/deque/max_size>) | retorna o número máximo possível de elementos
(função membro pública)
[ shrink_to_fit](<#/doc/container/deque/shrink_to_fit>)(DR*) | reduz o uso de memória liberando memória não utilizada
(função membro pública)

##### Modificadores

[ clear](<#/doc/container/deque/clear>) | limpa o conteúdo
(função membro pública)
[ insert](<#/doc/container/deque/insert>) | insere elementos
(função membro pública)
[ insert_range](<#/doc/container/deque/insert_range>)(C++23) | insere um range de elementos
(função membro pública)
[ emplace](<#/doc/container/deque/emplace>)(C++11) | constrói o elemento no local
(função membro pública)
[ erase](<#/doc/container/deque/erase>) | apaga elementos
(função membro pública)
[ push_back](<#/doc/container/deque/push_back>) | adiciona um elemento ao fim
(função membro pública)
[ emplace_back](<#/doc/container/deque/emplace_back>)(C++11) | constrói um elemento no local no fim
(função membro pública)
[ append_range](<#/doc/container/deque/append_range>)(C++23) | adiciona um range de elementos ao fim
(função membro pública)
[ pop_back](<#/doc/container/deque/pop_back>) | remove o último elemento
(função membro pública)
[ push_front](<#/doc/container/deque/push_front>) | insere um elemento no início
(função membro pública)
[ emplace_front](<#/doc/container/deque/emplace_front>)(C++11) | constrói um elemento no local no início
(função membro pública)
[ prepend_range](<#/doc/container/deque/prepend_range>)(C++23) | adiciona um range de elementos ao início
(função membro pública)
[ pop_front](<#/doc/container/deque/pop_front>) | remove o primeiro elemento
(função membro pública)
[ resize](<#/doc/container/deque/resize>) | altera o número de elementos armazenados
(função membro pública)
[ swap](<#/doc/container/deque/swap>) | troca o conteúdo
(função membro pública)

### Funções não membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/deque/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `deque`s
(template de função)
[ std::swap(std::deque)](<#/doc/container/deque/swap2>) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)
[ erase(std::deque)erase_if(std::deque)](<#/doc/container/deque/erase2>)(C++20) | apaga todos os elementos que satisfazem critérios específicos
(template de função)

### [Guias de dedução](<#/doc/container/deque/deduction_guides>)

| (desde C++17)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_containers_ranges`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | Construção e inserção de ranges para containers

### Exemplo

Execute este código
```cpp
    #include <deque>
    #include <iostream>
    
    int main()
    {
        // Create a deque containing integers
        std::deque<int> d = {7, 5, 16, 8};
    
        // Add an integer to the beginning and end of the deque
        d.push_front(13);
        d.push_back(25);
    
        // Iterate and print values of deque
        for (int n : d)
            std::cout << n << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    13 7 5 16 8 25
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 230](<https://cplusplus.github.io/LWG/issue230>) | C++98 | `T` não era exigido ser [CopyConstructible](<#/doc/named_req/CopyConstructible>)
(um elemento do tipo `T` poderia não ser capaz de ser construído) | `T` também é exigido ser
[CopyConstructible](<#/doc/named_req/CopyConstructible>)

### Veja também

[ queue](<#/doc/container/queue>) | adapta um container para fornecer fila (estrutura de dados FIFO)
(template de classe)
\*\[Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com entrada para o recurso dado.
\*\[Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão